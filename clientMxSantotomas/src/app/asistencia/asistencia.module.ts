import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciaRoutingModule } from './asistencia-routing.module';

import { AsistenciaPrincipalComponent } from './asistencia-principal/asistencia-principal.component';
import { AsistenciaReporteEntradaComponent } from './asistencia-reporte-entrada/asistencia-reporte-entrada.component';
import { AsistenciaSeccionComponent } from './asistencia-seccion/asistencia-seccion.component';
import { AsistenciaEstudianteComponent } from './asistencia-estudiante/asistencia-estudiante.component';
import { AsistenciaReporteSeccionComponent } from './asistencia-reporte-seccion/asistencia-reporte-seccion.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ 
    AsistenciaPrincipalComponent, 
    AsistenciaReporteEntradaComponent, 
    AsistenciaSeccionComponent, 
    AsistenciaEstudianteComponent, 
    AsistenciaReporteSeccionComponent],
  imports: [
    CommonModule,
    AsistenciaRoutingModule,
    FormsModule
  ]
})
export class AsistenciaModule { }
