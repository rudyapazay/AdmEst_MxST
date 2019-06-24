import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudianteListComponent } from './estudiante-list/estudiante-list.component';
import { EstudianteDetailComponent } from './estudiante-detail/estudiante-detail.component';
import { EstudianteSeccionComponent } from './estudiante-seccion/estudiante-seccion.component';

const routes: Routes = [
  {path:'estudiantes', component:EstudianteListComponent},
  {path:'estudiante/:id', component:EstudianteDetailComponent},
  {path:'estudiantes/:grado/:seccion', component:EstudianteSeccionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }
