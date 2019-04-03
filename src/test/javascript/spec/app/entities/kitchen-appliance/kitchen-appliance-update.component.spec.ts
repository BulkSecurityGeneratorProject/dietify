/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { KitchenApplianceUpdateComponent } from 'app/entities/kitchen-appliance/kitchen-appliance-update.component';
import { KitchenApplianceService } from 'app/entities/kitchen-appliance/kitchen-appliance.service';
import { KitchenAppliance } from 'app/shared/model/kitchen-appliance.model';

describe('Component Tests', () => {
    describe('KitchenAppliance Management Update Component', () => {
        let comp: KitchenApplianceUpdateComponent;
        let fixture: ComponentFixture<KitchenApplianceUpdateComponent>;
        let service: KitchenApplianceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [KitchenApplianceUpdateComponent]
            })
                .overrideTemplate(KitchenApplianceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KitchenApplianceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KitchenApplianceService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new KitchenAppliance(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.kitchenAppliance = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new KitchenAppliance();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.kitchenAppliance = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
