import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaPrincipalComponent } from './asistencia-principal/asistencia-principal.component';

const routes: Routes = [
  { path:"asistencia", component:AsistenciaPrincipalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsistenciaRoutingModule { }
