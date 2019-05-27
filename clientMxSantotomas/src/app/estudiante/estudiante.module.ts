import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { EstudianteListComponent } from './estudiante-list/estudiante-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EstudianteListComponent],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    FormsModule
  ]
})
export class EstudianteModule { }
