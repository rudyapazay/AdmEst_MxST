import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteEliminarRoutingModule } from './estudiante-eliminar-routing.module';
import { EstudianteDeleteComponent } from './estudiante-delete/estudiante-delete.component';

import { DocumentosTrasladoDeleteComponent } from './documentos-traslado-delete/documentos-traslado-delete.component';
import { EstudianteDocumentosDeleteComponent } from './estudiante-documentos-delete/estudiante-documentos-delete.component';

@NgModule({
  declarations: [EstudianteDeleteComponent, DocumentosTrasladoDeleteComponent, EstudianteDocumentosDeleteComponent],
  imports: [
    CommonModule,
    EstudianteEliminarRoutingModule
  ]
})
export class EstudianteEliminarModule { }
