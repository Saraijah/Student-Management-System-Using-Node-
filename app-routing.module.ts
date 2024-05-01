import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component'
import { NewStudentComponent } from './pages/new-student/new-student.component';
import { ViewStudentComponent } from './pages/view-student/view-student.component';
import { EditStudentComponent } from './pages/edit-student/edit-student.component';
import { SearchStudentsComponent } from './pages/search-students/search-students.component';

const routes: Routes = [
{path:'', title:'Home Page' ,component:HomeComponent, pathMatch:'full'},
{path:'about', title:'About Page'  ,component:AboutComponent},
{path:'create', title:'Add Student'  ,component:NewStudentComponent},
{ path: 'studentDetail/:id', title: 'Student Detail', component: ViewStudentComponent },
{ path: 'changestudentDetail/:id', title: 'Update Student Detail', component: EditStudentComponent },
{ path: 'search', title: 'Search Student Detail', component: SearchStudentsComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
