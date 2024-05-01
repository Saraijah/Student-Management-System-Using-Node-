import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  private successAlertSubject = new Subject<void>();

  // Observable for success alert
  successAlert$ = this.successAlertSubject.asObservable();

  // Method to trigger success alert
  triggerSuccessAlert() {
    this.successAlertSubject.next();
  }
}
