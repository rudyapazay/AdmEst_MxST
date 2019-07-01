import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliaEliminarRoutingModule } from './familia-eliminar-routing.module';
import { FamiliaDeleteComponent } from './familia-delete/familia-delete.component';
import { PadreDeleteComponent } from './padre-delete/padre-delete.component';
import { MadreDeleteComponent } from './madre-delete/madre-delete.component';
import { ApoderadoDeleteComponent } from './apoderado-delete/apoderado-delete.component';
import { DocumentosDeleteComponent } from './documentos-delete/documentos-delete.component';

@NgModule({
  declarations: [FamiliaDeleteComponent, PadreDeleteComponent, MadreDeleteComponent, ApoderadoDeleteComponent, DocumentosDeleteComponent],
  imports: [
    CommonModule,
    FamiliaEliminarRoutingModule
  ]
})
export class FamiliaEliminarModule { }
