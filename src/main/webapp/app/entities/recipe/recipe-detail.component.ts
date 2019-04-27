import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JhiDataUtils} from 'ng-jhipster';

import {IRecipe} from 'app/shared/model/recipe.model';
import {IProduct} from "app/shared/model/product.model";
import {ProductService} from "app/entities/product";
import {HttpResponse} from "@angular/common/http";
import {IHouseholdMeasure} from "app/shared/model/household-measure.model";

@Component({
    selector: 'jhi-recipe-detail',
    templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
    recipe: IRecipe;

    products: IProduct[] = [];
    productCount = 0;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute, protected productService: ProductService) {
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({recipe}) => {
            this.recipe = recipe;

            for (const section of this.recipe.recipeSections) {
                this.productCount += section.productPortions.length;
                for (const portion of section.productPortions) {
                    this.productService.find(portion.productId).subscribe((res: HttpResponse<IProduct>) => this.products.push(res.body));
                }
            }
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    previousState() {
        window.history.back();
    }

    getProductById(productId: number): IProduct {
        return this.products.find(product => product.id == productId);
    }

    getMeasureById(productId: number, householdMeasureId: number): IHouseholdMeasure {
        return this.getProductById(productId).householdMeasures.find(measure => measure.id == householdMeasureId);
    }

    calcNutrition(nutritionTagname: string) {
        let result = 0;
        for (const section of this.recipe.recipeSections) {
            for (const portion of section.productPortions) {
                const product = this.getProductById(portion.productId);
                const measure = this.getMeasureById(portion.productId, portion.householdMeasureId);

                result += product.nutritionData.find(data => data.nutritionDefinition.tagname == nutritionTagname).nutritionValue * measure.gramsWeight;
            }
        }
        return result;
    }
}
