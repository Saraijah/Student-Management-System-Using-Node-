import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentServiceService } from 'src/app/services/student-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
}

@Component({
  selector: 'app-search-students',
  templateUrl: './search-students.component.html',
  styleUrls: ['./search-students.component.css']
})
export class SearchStudentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'phone', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  studentData: MatTableDataSource<Student>;
  paginatorLength: number = 0;
  searchTerm: string = '';
  dataNotFound: boolean = false; // Flag to indicate if search results were not found

  constructor(
    private studentService: StudentServiceService,
    private route: ActivatedRoute
  ) {
    this.studentData = new MatTableDataSource<Student>();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'] || '';
      this.fetchStudents(); // Call fetchStudents when the component initializes
    });
  }

  fetchStudents(): void {
    this.studentService.searchStudents(this.searchTerm)
      .subscribe({
        next: (students: Student[]) => {
          if (Array.isArray(students)) {
            // Filter students based on searchTerm
            if (this.searchTerm.trim() !== '') {
              this.studentData.data = students.filter(student =>
                student.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                student.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                student.phone.includes(this.searchTerm)
              );
              this.dataNotFound = this.studentData.data.length === 0; // Set dataNotFound flag
            } else {
              this.studentData.data = students; // If no search term, display all students
              this.dataNotFound = false; // Reset dataNotFound flag
            }
            this.paginatorLength = this.studentData.data.length;
            if (this.paginator) {
              this.paginator.length = this.paginatorLength;
            }
          } else {
            console.error('Invalid response format:', students);
          }
        },
        error: (error) => {
          console.error('Error fetching students:', error);
        }
      });
  }

  onPageChange(event: PageEvent): void {
    // Update the paginator
    const { pageIndex, pageSize } = event;
    this.paginator.pageIndex = pageIndex;
    this.paginator.pageSize = pageSize;

    // Fetch students based on the updated paginator
    this.fetchStudents();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm.trim();
    // Perform search with the entered search term
    this.fetchStudents();
  }
  


}
