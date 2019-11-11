import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaPrincipalComponent } from './asistencia-principal/asistencia-principal.component';
import { AsistenciaSeccionComponent } from './asistencia-seccion/asistencia-seccion.component';

const routes: Routes = [
  { path:"asistencia", component:AsistenciaPrincipalComponent},
  { path:"asistencia/seccion/:grado/:seccion", component:AsistenciaSeccionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsistenciaRoutingModule { }
