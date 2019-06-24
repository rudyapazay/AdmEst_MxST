import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliaActualizarRoutingModule } from './familia-actualizar-routing.module';
import { FamiliaUpdateComponent } from './familia-update/familia-update.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FamiliaUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    FamiliaActualizarRoutingModule
  ]
})
export class FamiliaActualizarModule { }
