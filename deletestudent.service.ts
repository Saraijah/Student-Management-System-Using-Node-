import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeletestudentService {

  private API_URL = 'http://localhost:8000/api/v1/students';

  constructor(private http: HttpClient) { }

  deleteStudent(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<any>(url);
  };
};

