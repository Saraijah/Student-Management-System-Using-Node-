import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetStudentService {

  private API_URL = 'http://localhost:8000/api/v1/students';

  constructor(private http: HttpClient) { }

  getStudentById(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response && response.data && response.data.result) {
          return response.data.result;
        } else {
          throw new Error('Invalid API response');
        }
      }),
    );
  }
}
