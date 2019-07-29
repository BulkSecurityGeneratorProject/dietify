import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HouseholdMeasure } from './household-measure.model';
import { HouseholdMeasureService } from './household-measure.service';
import { Product, ProductService } from '../product';

@Component({
    selector: 'page-household-measure-update',
    templateUrl: 'household-measure-update.html'
})
export class HouseholdMeasureUpdatePage implements OnInit {

    householdMeasure: HouseholdMeasure;
    products: Product[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        description: [null, [Validators.required]],
        gramsWeight: [null, [Validators.required]],
        isVisible: ['false', [Validators.required]],
        product: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private productService: ProductService,
        private householdMeasureService: HouseholdMeasureService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.productService.query()
            .subscribe(data => { this.products = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.householdMeasure = response.data;
            this.isNew = this.householdMeasure.id === null || this.householdMeasure.id === undefined;
        });
    }

    updateForm(householdMeasure: HouseholdMeasure) {
        this.form.patchValue({
            id: householdMeasure.id,
            description: householdMeasure.description,
            gramsWeight: householdMeasure.gramsWeight,
            isVisible: householdMeasure.isVisible,
            product: householdMeasure.product,
        });
    }

    save() {
        this.isSaving = true;
        const householdMeasure = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.householdMeasureService.update(householdMeasure));
        } else {
            this.subscribeToSaveResponse(this.householdMeasureService.create(householdMeasure));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<HouseholdMeasure>>) {
        result.subscribe((res: HttpResponse<HouseholdMeasure>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `HouseholdMeasure ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/household-measure');
    }

    previousState() {
        window.history.back();
    }

    async onError(error) {
        this.isSaving = false;
        console.error(error);
        const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    private createFromForm(): HouseholdMeasure {
        return {
            ...new HouseholdMeasure(),
            id: this.form.get(['id']).value,
            description: this.form.get(['description']).value,
            gramsWeight: this.form.get(['gramsWeight']).value,
            isVisible: this.form.get(['isVisible']).value,
            product: this.form.get(['product']).value,
        };
    }

    compareProduct(first: Product, second: Product): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }
}
