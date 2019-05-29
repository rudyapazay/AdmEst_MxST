import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { EstudianteListComponent } from './estudiante-list/estudiante-list.component';
import { EstudianteDetailComponent } from './estudiante-detail/estudiante-detail.component';
import { EstudianteReferenciaComponent } from './estudiante-referencia/estudiante-referencia.component';

@NgModule({
  declarations: [EstudianteListComponent, EstudianteDetailComponent, EstudianteReferenciaComponent],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    FormsModule,
    AngularFontAwesomeModule
  ]
})

export class EstudianteModule { }
