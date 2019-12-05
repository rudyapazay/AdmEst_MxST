import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaPrincipalComponent } from './asistencia-principal/asistencia-principal.component';
import { AsistenciaSeccionComponent } from './asistencia-seccion/asistencia-seccion.component';
import { AsistenciaEstudianteComponent } from './asistencia-estudiante/asistencia-estudiante.component';
import { AsistenciaReporteSeccionComponent } from './asistencia-reporte-seccion/asistencia-reporte-seccion.component';

const routes: Routes = [
  { path:"asistencia", component:AsistenciaPrincipalComponent},
  { path:"asistencia/seccion/:grado/:seccion", component:AsistenciaSeccionComponent},
  { path:"asistencia/reporte/seccion", component:AsistenciaReporteSeccionComponent},
  { path:"asistencia/estudiante/:id", component:AsistenciaEstudianteComponent,outlet:"popup" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsistenciaRoutingModule { }
