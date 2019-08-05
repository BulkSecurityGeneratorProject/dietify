import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  MealComponent,
  MealDetailComponent,
  MealUpdateComponent,
  MealDeletePopupComponent,
  MealDeleteDialogComponent,
  mealRoute,
  mealPopupRoute
} from './';
import {ProductsProductListModule} from 'app/entities/products/product/product-list.module';

const ENTITY_STATES = [...mealRoute, ...mealPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule, ProductsProductListModule],
  declarations: [MealComponent, MealDetailComponent, MealUpdateComponent, MealDeleteDialogComponent, MealDeletePopupComponent],
  entryComponents: [MealComponent, MealUpdateComponent, MealDeleteDialogComponent, MealDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  exports: [MealUpdateComponent, MealDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealplansMealModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
