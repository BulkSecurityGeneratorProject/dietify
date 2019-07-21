import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IRecipe, Recipe } from 'app/shared/model/recipes/recipe.model';
import { RecipeService } from './recipe.service';
import { IKitchenAppliance } from 'app/shared/model/recipes/kitchen-appliance.model';
import { KitchenApplianceService } from 'app/entities/recipes/kitchen-appliance';
import { IDishType } from 'app/shared/model/recipes/dish-type.model';
import { DishTypeService } from 'app/entities/recipes/dish-type';
import { IMealType } from 'app/shared/model/recipes/meal-type.model';
import { MealTypeService } from 'app/entities/recipes/meal-type';
import { IRecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';
import { RecipeBasicNutritionDataService } from 'app/entities/recipes/recipe-basic-nutrition-data';

@Component({
  selector: 'jhi-recipe-update',
  templateUrl: './recipe-update.component.html'
})
export class RecipeUpdateComponent implements OnInit {
  isSaving: boolean;

  recipes: IRecipe[];

  kitchenappliances: IKitchenAppliance[];

  dishtypes: IDishType[];

  mealtypes: IMealType[];

  recipebasicnutritiondata: IRecipeBasicNutritionData[];
  creationDateDp: any;
  lastEditDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    preparationTimeMinutes: [null, [Validators.required, Validators.min(0)]],
    numberOfPortions: [null, [Validators.required, Validators.min(0)]],
    image: [null, []],
    imageContentType: [],
    authorId: [null, [Validators.required]],
    creationDate: [null, [Validators.required]],
    lastEditDate: [null, [Validators.required]],
    isVisible: [null, [Validators.required]],
    language: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    totalGramsWeight: [null, [Validators.required, Validators.min(0)]],
    sourceRecipeId: [],
    kitchenAppliances: [],
    dishTypes: [],
    mealTypes: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected recipeService: RecipeService,
    protected kitchenApplianceService: KitchenApplianceService,
    protected dishTypeService: DishTypeService,
    protected mealTypeService: MealTypeService,
    protected recipeBasicNutritionDataService: RecipeBasicNutritionDataService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ recipe }) => {
      this.updateForm(recipe);
    });
    this.recipeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRecipe[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRecipe[]>) => response.body)
      )
      .subscribe((res: IRecipe[]) => (this.recipes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.kitchenApplianceService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IKitchenAppliance[]>) => mayBeOk.ok),
        map((response: HttpResponse<IKitchenAppliance[]>) => response.body)
      )
      .subscribe((res: IKitchenAppliance[]) => (this.kitchenappliances = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.dishTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDishType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDishType[]>) => response.body)
      )
      .subscribe((res: IDishType[]) => (this.dishtypes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.mealTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMealType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMealType[]>) => response.body)
      )
      .subscribe((res: IMealType[]) => (this.mealtypes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.recipeBasicNutritionDataService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRecipeBasicNutritionData[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRecipeBasicNutritionData[]>) => response.body)
      )
      .subscribe(
        (res: IRecipeBasicNutritionData[]) => (this.recipebasicnutritiondata = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(recipe: IRecipe) {
    this.editForm.patchValue({
      id: recipe.id,
      name: recipe.name,
      preparationTimeMinutes: recipe.preparationTimeMinutes,
      numberOfPortions: recipe.numberOfPortions,
      image: recipe.image,
      imageContentType: recipe.imageContentType,
      authorId: recipe.authorId,
      creationDate: recipe.creationDate,
      lastEditDate: recipe.lastEditDate,
      isVisible: recipe.isVisible,
      language: recipe.language,
      totalGramsWeight: recipe.totalGramsWeight,
      sourceRecipeId: recipe.sourceRecipeId,
      kitchenAppliances: recipe.kitchenAppliances,
      dishTypes: recipe.dishTypes,
      mealTypes: recipe.mealTypes
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const recipe = this.createFromForm();
    if (recipe.id !== undefined) {
      this.subscribeToSaveResponse(this.recipeService.update(recipe));
    } else {
      this.subscribeToSaveResponse(this.recipeService.create(recipe));
    }
  }

  private createFromForm(): IRecipe {
    return {
      ...new Recipe(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      preparationTimeMinutes: this.editForm.get(['preparationTimeMinutes']).value,
      numberOfPortions: this.editForm.get(['numberOfPortions']).value,
      imageContentType: this.editForm.get(['imageContentType']).value,
      image: this.editForm.get(['image']).value,
      authorId: this.editForm.get(['authorId']).value,
      creationDate: this.editForm.get(['creationDate']).value,
      lastEditDate: this.editForm.get(['lastEditDate']).value,
      isVisible: this.editForm.get(['isVisible']).value,
      language: this.editForm.get(['language']).value,
      totalGramsWeight: this.editForm.get(['totalGramsWeight']).value,
      sourceRecipeId: this.editForm.get(['sourceRecipeId']).value,
      kitchenAppliances: this.editForm.get(['kitchenAppliances']).value,
      dishTypes: this.editForm.get(['dishTypes']).value,
      mealTypes: this.editForm.get(['mealTypes']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipe>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRecipeById(index: number, item: IRecipe) {
    return item.id;
  }

  trackKitchenApplianceById(index: number, item: IKitchenAppliance) {
    return item.id;
  }

  trackDishTypeById(index: number, item: IDishType) {
    return item.id;
  }

  trackMealTypeById(index: number, item: IMealType) {
    return item.id;
  }

  trackRecipeBasicNutritionDataById(index: number, item: IRecipeBasicNutritionData) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
