import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReciboRoutingModule } from './recibo-routing.module';
import { RegistrarReciboComponent } from './registrar-recibo/registrar-recibo.component';
import { FormsModule } from '@angular/forms';

import { ReciboFamiliaFaltasComponent } from './recibo-familia-faltas/recibo-familia-faltas.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReciboFamiliaEstudianteComponent } from './recibo-familia-estudiante/recibo-familia-estudiante.component';
import { ReciboReporteComponent } from './recibo-reporte/recibo-reporte.component';

@NgModule({
  declarations: [RegistrarReciboComponent, ReciboFamiliaFaltasComponent, ReciboFamiliaEstudianteComponent, ReciboReporteComponent],
  imports: [
    CommonModule,
    ReciboRoutingModule,
    FormsModule,
    AngularFontAwesomeModule
  ]
})
export class ReciboModule { }
