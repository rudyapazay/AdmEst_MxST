import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliaRoutingModule } from './familia-routing.module';
import { FamiliaListComponent } from './familia-list/familia-list.component';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { FamiliaDetailComponent } from './familia-detail/familia-detail.component';
import { EstudianteByFamiliaComponent } from './estudiante-by-familia/estudiante-by-familia.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [ 
    FamiliaListComponent,
    FamiliaDetailComponent, 
    EstudianteByFamiliaComponent

  ],
  imports: [
    CommonModule,
    FamiliaRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
    FontAwesomeModule
  ]
})
export class FamiliaModule { }
