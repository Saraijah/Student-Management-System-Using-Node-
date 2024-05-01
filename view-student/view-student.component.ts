import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetStudentService } from 'src/app/services/get-student.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit, OnDestroy {
  id: number = 0;
  student: any;
  hasData: boolean = false;
  subscription: Subscription = new Subscription(); // Initialize subscription

  constructor(
    private getStudentService: GetStudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.id = +this.route.snapshot.params['id']; // Convert id to number
    this.subscription = this.getStudentService.getStudentById(this.id).subscribe({
      next: (res: any) => {
        console.log('Response received:', res); // Log the response received
        if (res && res['id'] && res['first_name'] && res['last_name'] && res['phone']) {
          // If the response contains all necessary fields, display the information
          this.student = res;
          this.hasData = true;
          console.log('Student data:', this.student); // Log the student data
        } 
      },
      error: (error) => {
        console.error('HTTP error:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe from the subscription
  }
}
