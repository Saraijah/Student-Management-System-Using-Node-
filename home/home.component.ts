
import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentServiceService } from 'src/app/services/student-service.service';
import { DeletestudentService } from 'src/app/services/deletestudent.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AlertsService } from 'src/app/services/alerts.service';

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
}

interface ApiResponse {
  data: {
    students: Student[];
  };
  totalItems: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'phone', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  studentData: MatTableDataSource<Student>;
  paginatorLength: number = 0;
  successAlertVisible: boolean = false; // Define successAlertVisible property

  constructor(
    private studentService: StudentServiceService,
    private deleteStudentService: DeletestudentService,
    private alertService: AlertsService
  ) {
    this.studentData = new MatTableDataSource<Student>();
  }

  ngOnInit(): void {
    this.fetchStudents();
    this.alertService.successAlert$.subscribe(() => {
      this.showSuccessAlert(); // Call function to show success alert
    });
  }

  fetchStudents(pageIndex: number = 0, pageSize: number = 5): void {
    this.studentService.getAllStudents(pageIndex, pageSize).subscribe((res: ApiResponse) => {
      console.log(res.totalItems);
      this.studentData.data = res.data.students;
      this.paginatorLength = res.totalItems;
      this.paginator.length = this.paginatorLength;
    });
  }

  deleteStudent(id: number): void {
    this.deleteStudentService.deleteStudent(id).subscribe(() => {
      this.fetchStudents();
    });
  }

  onPageChange(event: PageEvent): void {
    const { pageIndex, pageSize } = event;
    this.fetchStudents(pageIndex, pageSize);
  }


  // Function to show success alert and hide it after 5 seconds
  showSuccessAlert(): void {
    this.successAlertVisible = true;
    setTimeout(() => {
      this.successAlertVisible = false;
    }, 5000); // Hide the alert after 5 seconds
  }

  // Method to dismiss the success alert
  dismissAlert(): void {
    this.successAlertVisible = false;
  }
}
