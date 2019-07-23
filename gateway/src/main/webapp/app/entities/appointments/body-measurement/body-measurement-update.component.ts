import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IBodyMeasurement, BodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';
import { BodyMeasurementService } from './body-measurement.service';
import { IAppointment } from 'app/shared/model/appointments/appointment.model';
import { AppointmentService } from 'app/entities/appointments/appointment';

@Component({
  selector: 'jhi-body-measurement-update',
  templateUrl: './body-measurement-update.component.html'
})
export class BodyMeasurementUpdateComponent implements OnInit {
  isSaving: boolean;

  appointments: IAppointment[];
  completionDateDp: any;

  editForm = this.fb.group({
    id: [],
    completionDate: [null, [Validators.required]],
    height: [null, [Validators.required]],
    weight: [null, [Validators.required]],
    waist: [null, [Validators.required]],
    percentOfFatTissue: [null, [Validators.min(0), Validators.max(100)]],
    percentOfWater: [null, [Validators.min(0), Validators.max(100)]],
    muscleMass: [],
    physicalMark: [],
    calciumInBones: [],
    basicMetabolism: [],
    metabolicAge: [],
    visceralFatLevel: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected bodyMeasurementService: BodyMeasurementService,
    protected appointmentService: AppointmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ bodyMeasurement }) => {
      this.updateForm(bodyMeasurement);
    });
    this.appointmentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAppointment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAppointment[]>) => response.body)
      )
      .subscribe((res: IAppointment[]) => (this.appointments = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(bodyMeasurement: IBodyMeasurement) {
    this.editForm.patchValue({
      id: bodyMeasurement.id,
      completionDate: bodyMeasurement.completionDate,
      height: bodyMeasurement.height,
      weight: bodyMeasurement.weight,
      waist: bodyMeasurement.waist,
      percentOfFatTissue: bodyMeasurement.percentOfFatTissue,
      percentOfWater: bodyMeasurement.percentOfWater,
      muscleMass: bodyMeasurement.muscleMass,
      physicalMark: bodyMeasurement.physicalMark,
      calciumInBones: bodyMeasurement.calciumInBones,
      basicMetabolism: bodyMeasurement.basicMetabolism,
      metabolicAge: bodyMeasurement.metabolicAge,
      visceralFatLevel: bodyMeasurement.visceralFatLevel
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const bodyMeasurement = this.createFromForm();
    if (bodyMeasurement.id !== undefined) {
      this.subscribeToSaveResponse(this.bodyMeasurementService.update(bodyMeasurement));
    } else {
      this.subscribeToSaveResponse(this.bodyMeasurementService.create(bodyMeasurement));
    }
  }

  private createFromForm(): IBodyMeasurement {
    return {
      ...new BodyMeasurement(),
      id: this.editForm.get(['id']).value,
      completionDate: this.editForm.get(['completionDate']).value,
      height: this.editForm.get(['height']).value,
      weight: this.editForm.get(['weight']).value,
      waist: this.editForm.get(['waist']).value,
      percentOfFatTissue: this.editForm.get(['percentOfFatTissue']).value,
      percentOfWater: this.editForm.get(['percentOfWater']).value,
      muscleMass: this.editForm.get(['muscleMass']).value,
      physicalMark: this.editForm.get(['physicalMark']).value,
      calciumInBones: this.editForm.get(['calciumInBones']).value,
      basicMetabolism: this.editForm.get(['basicMetabolism']).value,
      metabolicAge: this.editForm.get(['metabolicAge']).value,
      visceralFatLevel: this.editForm.get(['visceralFatLevel']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBodyMeasurement>>) {
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

  trackAppointmentById(index: number, item: IAppointment) {
    return item.id;
  }
}
