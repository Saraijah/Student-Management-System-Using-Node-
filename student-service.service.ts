import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private API_URL = 'http://localhost:8000/api/v1/students';

  constructor(private http: HttpClient) { }

  getAllStudents(pageIndex: number = 0, pageSize: number = 5): Observable<any> {
    // Set pagination parameters using HttpParams
    const params = new HttpParams()
      .set('page', (pageIndex + 1).toString()) // Adjust pageIndex to start from 1 instead of 0
      .set('limit', pageSize.toString());

    // Pass params to the HTTP request
    return this.http.get<any>(this.API_URL, { params });
  }

  searchStudents(searchTerm: string): Observable<any> {
    const apiUrl = `${this.API_URL}/search`; // Define the search endpoint URL
    const params = new HttpParams().set('searchTerm', searchTerm); // Set searchTerm as a query parameter
    return this.http.get<any>(apiUrl, { params });
  }
}
