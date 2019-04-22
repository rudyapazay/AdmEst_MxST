import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarRoutingModule } from './registrar-routing.module';
import { RegFamiliaComponent } from './reg-familia/reg-familia.component';
import { RegMadreComponent } from './reg-madre/reg-madre.component';
import { RegPadreComponent } from './reg-padre/reg-padre.component';
import { RegApoderadoComponent } from './reg-apoderado/reg-apoderado.component';
import { RegEstudianteComponent } from './reg-estudiante/reg-estudiante.component';
import { FormsModule } from '@angular/forms';
import { ResumenComponent } from './resumen/resumen.component';
import { FinalizarComponent } from './finalizar/finalizar.component';

@NgModule({
  declarations: [
    RegFamiliaComponent, 
    RegMadreComponent, 
    RegPadreComponent, 
    RegApoderadoComponent, 
    RegEstudianteComponent, ResumenComponent, FinalizarComponent],
  
  imports: [
    CommonModule,
    //registrar formsModule en cada submodulo para su produccion
    FormsModule,
    RegistrarRoutingModule
  ]
})
export class RegistrarModule { }
