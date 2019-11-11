import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReciboRoutingModule } from './recibo-routing.module';
import { RegistrarReciboComponent } from './registrar-recibo/registrar-recibo.component';
import { FormsModule } from '@angular/forms';

import { ReciboFamiliaFaltasComponent } from './recibo-familia-faltas/recibo-familia-faltas.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [RegistrarReciboComponent, ReciboFamiliaFaltasComponent],
  imports: [
    CommonModule,
    ReciboRoutingModule,
    FormsModule,
    AngularFontAwesomeModule
  ]
})
export class ReciboModule { }
