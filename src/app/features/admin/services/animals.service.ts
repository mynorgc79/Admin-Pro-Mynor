import { Injectable, inject } from '@angular/core';
import { MyResponse } from '@core/models';
import { ApiService } from '@core/services';
import { Observable, catchError, throwError } from 'rxjs';
import { AnimalForm, Animals } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  private apiService = inject(ApiService);

  getAnimal(animal_id: string): Observable<MyResponse<Animals>> {
    return this.apiService.getById<Animals>('animals', animal_id);
  }

  getAnimals(): Observable<MyResponse<Animals[]>> {
    return this.apiService.getAll<Animals[]>('animals');
  }

  updateAnimal(
    animal_id: string,
    animalForm: AnimalForm
  ): Observable<MyResponse<Animals>> {
    return this.apiService
      .update<Animals>('animals', animalForm, animal_id)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  deleteAnimal(
    animal_id: string
  ): Observable<MyResponse<Record<string, never>>> {
    return this.apiService
      .delete<Record<string, never>>('animals', animal_id)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
