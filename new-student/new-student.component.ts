import { Component, OnInit } from '@angular/core';
import { NewStudentService } from 'src/app/services/new-student.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { Router } from '@angular/router';

// Define an interface for the student object
interface NewStudent {
  first_name: string;
  last_name: string;
  phone: string;
}

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {

  newStudent: NewStudent = { first_name: '', last_name: '', phone: '' };

  constructor(
    private newStudentService: NewStudentService,
    private route: Router,
    private alertService: AlertsService
  ) {}

  successAlertVisible: boolean = false;

  ngOnInit(): void {}

  addNewStudent(): void {
    this.newStudentService.addNewStudent(this.newStudent).subscribe(response => {
      console.log(response); 
      // Reset the form after successful submission
      this.newStudent = { first_name: '', last_name: '', phone: '' };
      this.alertService.triggerSuccessAlert(); // Trigger success alert
      this.successAlertVisible = true;

      // Hide the alert after 3 seconds
      setTimeout(() => {
        this.dismissAlert();
      }, 3000); // Adjust the time as needed
    });
  }

  dismissAlert(): void {
    this.successAlertVisible = false;
  }
}
