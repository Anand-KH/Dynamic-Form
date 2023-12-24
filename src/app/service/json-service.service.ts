import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import jsonData from '../../assets/form.json';

@Injectable({
  providedIn: 'root',
})
export class JsonServiceService {
  constructor() {}

  getFormData(): Observable<any> {
    // Simulated data retrieval (replace this with your actual data fetching logic)
    const formData = jsonData;
    return of(formData);
  }
}
