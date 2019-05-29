import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliaRoutingModule } from './familia-routing.module';
import { FamiliaListComponent } from './familia-list/familia-list.component';
import { FormsModule } from '@angular/forms';
import { FamiliaUpdateComponent } from './familia-update/familia-update.component';
import { FamiliaDetailComponent } from './familia-detail/familia-detail.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { EstudianteByFamiliaComponent } from './estudiante-by-familia/estudiante-by-familia.component';


@NgModule({
  declarations: [ 
    FamiliaListComponent, FamiliaUpdateComponent, FamiliaDetailComponent, EstudianteByFamiliaComponent
  ],
  imports: [
    CommonModule,
    FamiliaRoutingModule,
    FormsModule,
    AngularFontAwesomeModule
  ]
})
export class FamiliaModule { }
