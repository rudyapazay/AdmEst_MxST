import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliaRoutingModule } from './familia-routing.module';
import { FamiliaListComponent } from './familia-list/familia-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ 
    FamiliaListComponent
  ],
  imports: [
    CommonModule,
    FamiliaRoutingModule,
    FormsModule
  ]
})
export class FamiliaModule { }
