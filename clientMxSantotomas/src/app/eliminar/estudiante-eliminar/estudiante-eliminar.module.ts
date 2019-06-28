import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteEliminarRoutingModule } from './estudiante-eliminar-routing.module';
import { EstudianteDeleteComponent } from './estudiante-delete/estudiante-delete.component';

@NgModule({
  declarations: [EstudianteDeleteComponent],
  imports: [
    CommonModule,
    EstudianteEliminarRoutingModule
  ]
})
export class EstudianteEliminarModule { }
