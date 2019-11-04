import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReciboRoutingModule } from './recibo-routing.module';
import { RegistrarReciboComponent } from './registrar-recibo/registrar-recibo.component';

@NgModule({
  declarations: [RegistrarReciboComponent],
  imports: [
    CommonModule,
    ReciboRoutingModule
  ]
})
export class ReciboModule { }
