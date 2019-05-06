import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudianteListComponent } from './estudiante-list/estudiante-list.component';

const routes: Routes = [
  {path:'estudiantes', component:EstudianteListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }
