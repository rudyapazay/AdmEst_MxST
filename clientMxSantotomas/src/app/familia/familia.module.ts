import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliaRoutingModule } from './familia-routing.module';
import { FamiliaListComponent } from './familia-list/familia-list.component';


@NgModule({
  declarations: [ FamiliaListComponent],
  imports: [
    CommonModule,
    FamiliaRoutingModule
  ]
})
export class FamiliaModule { }
