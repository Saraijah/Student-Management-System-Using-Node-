import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewStudentService {

  private API_URL = 'http://localhost:8000/api/v1/students';

  constructor(private http: HttpClient) { }

  addNewStudent(data: any): Observable<any> {
    return this.http.post<any>(this.API_URL + '/', data).pipe(
      map((res) => {
        return res;
      })
    );
  }
}