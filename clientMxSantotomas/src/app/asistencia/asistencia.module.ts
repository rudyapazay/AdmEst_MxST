import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciaRoutingModule } from './asistencia-routing.module';

import { AsistenciaPrincipalComponent } from './asistencia-principal/asistencia-principal.component';

@NgModule({
  declarations: [ AsistenciaPrincipalComponent],
  imports: [
    CommonModule,
    AsistenciaRoutingModule
  ]
})
export class AsistenciaModule { }
