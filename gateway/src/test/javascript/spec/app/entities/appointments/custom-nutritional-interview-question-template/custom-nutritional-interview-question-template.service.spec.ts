/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { CustomNutritionalInterviewQuestionTemplateService } from 'app/entities/appointments/custom-nutritional-interview-question-template/custom-nutritional-interview-question-template.service';
import {
  ICustomNutritionalInterviewQuestionTemplate,
  CustomNutritionalInterviewQuestionTemplate
} from 'app/shared/model/appointments/custom-nutritional-interview-question-template.model';

describe('Service Tests', () => {
  describe('CustomNutritionalInterviewQuestionTemplate Service', () => {
    let injector: TestBed;
    let service: CustomNutritionalInterviewQuestionTemplateService;
    let httpMock: HttpTestingController;
    let elemDefault: ICustomNutritionalInterviewQuestionTemplate;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(CustomNutritionalInterviewQuestionTemplateService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new CustomNutritionalInterviewQuestionTemplate(0, 0, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a CustomNutritionalInterviewQuestionTemplate', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new CustomNutritionalInterviewQuestionTemplate(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a CustomNutritionalInterviewQuestionTemplate', async () => {
        const returnedFromService = Object.assign(
          {
            ownerId: 1,
            question: 'BBBBBB',
            language: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of CustomNutritionalInterviewQuestionTemplate', async () => {
        const returnedFromService = Object.assign(
          {
            ownerId: 1,
            question: 'BBBBBB',
            language: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CustomNutritionalInterviewQuestionTemplate', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});