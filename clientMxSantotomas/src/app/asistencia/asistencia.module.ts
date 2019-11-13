import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciaRoutingModule } from './asistencia-routing.module';

import { AsistenciaPrincipalComponent } from './asistencia-principal/asistencia-principal.component';
import { AsistenciaReporteEntradaComponent } from './asistencia-reporte-entrada/asistencia-reporte-entrada.component';
import { AsistenciaSeccionComponent } from './asistencia-seccion/asistencia-seccion.component';
import { AsistenciaEstudianteComponent } from './asistencia-estudiante/asistencia-estudiante.component';

@NgModule({
  declarations: [ AsistenciaPrincipalComponent, AsistenciaReporteEntradaComponent, AsistenciaSeccionComponent, AsistenciaEstudianteComponent],
  imports: [
    CommonModule,
    AsistenciaRoutingModule
  ]
})
export class AsistenciaModule { }
