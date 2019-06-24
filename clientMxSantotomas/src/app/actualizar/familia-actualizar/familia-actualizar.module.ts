import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliaActualizarRoutingModule } from './familia-actualizar-routing.module';
import { FamiliaUpdateComponent } from './familia-update/familia-update.component';
import { FormsModule } from '@angular/forms';
import { PadreUpdateComponent } from './padre-update/padre-update.component';
import { MadreUpdateComponent } from './madre-update/madre-update.component';
import { ApoderadoUpdateComponent } from './apoderado-update/apoderado-update.component';

@NgModule({
  declarations: [FamiliaUpdateComponent, PadreUpdateComponent, MadreUpdateComponent, ApoderadoUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    FamiliaActualizarRoutingModule
  ]
})
export class FamiliaActualizarModule { }
