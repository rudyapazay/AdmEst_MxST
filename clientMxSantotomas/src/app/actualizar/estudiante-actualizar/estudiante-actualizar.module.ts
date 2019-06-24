import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteActualizarRoutingModule } from './estudiante-actualizar-routing.module';
import { EstudianteUpdateComponent } from './estudiante-update/estudiante-update.component';
import {  FormsModule } from '@angular/forms';
import { EstudianteDocumentosComponent } from './estudiante-documentos/estudiante-documentos.component';

@NgModule({
  declarations: [EstudianteUpdateComponent, EstudianteDocumentosComponent],
  imports: [
    CommonModule,
    FormsModule,
    EstudianteActualizarRoutingModule
  ]
})
export class EstudianteActualizarModule { }
