import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditStudentService } from 'src/app/services/edit-student.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private editStudentService: EditStudentService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  // variable declarations
  id: number = 0;
  student!: any;
  hasData: boolean = false;
  hasError: boolean = false;

  @ViewChild('studentForm') studentForm?: NgForm;

  // Declaring a subscription variable
  subscription: Subscription = new Subscription();

  loadData() {
    this.id = +this.route.snapshot.params['id']; // Convert id to number
    this.subscription = this.editStudentService.getStudentById(this.id).subscribe({
      next: (res: any) => {
        console.log('Response received:', res); // Log the response received
        if (res && res['id'] && res['first_name'] && res['last_name'] && res['phone']) {
          this.student = res;
          this.studentForm?.setValue({
            first_name: res['first_name'],
            last_name: res['last_name'],
            phone: res['phone']
          });
          this.hasData = true;
          console.log('Student data:', this.student); // Log the student data
        } else {
          console.error('Invalid student data received:', res);
          this.hasData = false;
        }
      },
      error: (error) => {
        console.error('HTTP error:', error);
        this.hasData = false;
      }
    });
  }

  updateStudent(oForm: NgForm) {
    // Log the current student data
    console.log('Current student data:', this.student);
  
    // Check if the form is valid
    if (oForm && oForm.valid) {
      // Extract updated data from the form
      const updatedData = oForm.value;
  
      // Call the service method to update the student data
      const updateSubscription = this.editStudentService.updateStudentById(this.id, updatedData).subscribe({
        next: (res) => {
          // Check if the response contains valid student data
          if (res && res['id'] && res['first_name'] && res['last_name'] && res['phone']) {
            // Log success message
            console.log('Student updated successfully:', res);
            // Redirect to a success page
            this.router.navigate(['/']);
          } else {
            // Log error message
            console.error('Invalid student data received:', res);
            // Set error flag
            this.hasError = true;
            // Redirect to an error page
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          // Log HTTP error
          console.error('HTTP error:', error);
          // Set error flag
          this.hasError = true;
          // Redirect to an error page
          this.router.navigate(['/']);
        }
      });
    }
  }
  
  

  ngOnDestroy(): void {
    // Unsubscribe from any subscriptions to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
