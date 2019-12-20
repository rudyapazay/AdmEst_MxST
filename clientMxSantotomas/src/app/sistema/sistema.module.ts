import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { AdministracionComponent } from './administracion/administracion.component';
import { MatriculasComponent } from './matriculas/matriculas.component';

@NgModule({
  declarations: [AdministracionComponent, MatriculasComponent],
  imports: [
    CommonModule,
    SistemaRoutingModule
  ]
})
export class SistemaModule { }
