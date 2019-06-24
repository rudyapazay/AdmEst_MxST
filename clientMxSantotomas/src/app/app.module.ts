import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildingComponent } from './building/building.component';
import { FamiliaModule } from './familia/familia.module';
import { RegistrarModule } from './registrar/registrar.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { FamiliaService } from './services/familia.service';
import { EstudianteService } from './services/estudiante.service';

import { FamiliaActualizarModule } from './actualizar/familia-actualizar/familia-actualizar.module';
import { EstudianteActualizarModule } from './actualizar/estudiante-actualizar/estudiante-actualizar.module';


@NgModule({
  declarations: [
    AppComponent,
    BuildingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    // modulos propios 
    AppRoutingModule,
    RegistrarModule,
    FamiliaModule,
    EstudianteModule,
    FamiliaActualizarModule,
    EstudianteActualizarModule
    
  ],
  providers: [FamiliaService, EstudianteService],
  bootstrap: [AppComponent],

})
export class AppModule { }
