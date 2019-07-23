/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { RecipeUnsuitableForDietDeleteDialogComponent } from 'app/entities/recipes/recipe-unsuitable-for-diet/recipe-unsuitable-for-diet-delete-dialog.component';
import { RecipeUnsuitableForDietService } from 'app/entities/recipes/recipe-unsuitable-for-diet/recipe-unsuitable-for-diet.service';

describe('Component Tests', () => {
  describe('RecipeUnsuitableForDiet Management Delete Component', () => {
    let comp: RecipeUnsuitableForDietDeleteDialogComponent;
    let fixture: ComponentFixture<RecipeUnsuitableForDietDeleteDialogComponent>;
    let service: RecipeUnsuitableForDietService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RecipeUnsuitableForDietDeleteDialogComponent]
      })
        .overrideTemplate(RecipeUnsuitableForDietDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RecipeUnsuitableForDietDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecipeUnsuitableForDietService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
