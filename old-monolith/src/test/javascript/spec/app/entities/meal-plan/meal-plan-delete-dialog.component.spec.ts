/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DietifyTestModule } from '../../../test.module';
import { MealPlanDeleteDialogComponent } from 'app/entities/meal-plan/meal-plan-delete-dialog.component';
import { MealPlanService } from 'app/entities/meal-plan/meal-plan.service';

describe('Component Tests', () => {
    describe('MealPlan Management Delete Component', () => {
        let comp: MealPlanDeleteDialogComponent;
        let fixture: ComponentFixture<MealPlanDeleteDialogComponent>;
        let service: MealPlanService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealPlanDeleteDialogComponent]
            })
                .overrideTemplate(MealPlanDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealPlanDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealPlanService);
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
