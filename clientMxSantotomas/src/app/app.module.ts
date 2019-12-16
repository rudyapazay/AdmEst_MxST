import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildingComponent } from './building/building.component';
import { FamiliaModule } from './familia/familia.module';
import { RegistrarModule } from './registrar/registrar.module';
import { EstudianteModule } from './estudiante/estudiante.module';

import { FamiliaActualizarModule } from './actualizar/familia-actualizar/familia-actualizar.module';
import { EstudianteActualizarModule } from './actualizar/estudiante-actualizar/estudiante-actualizar.module';
import { EstudianteEliminarModule } from './eliminar/estudiante-eliminar/estudiante-eliminar.module';
import { FamiliaEliminarModule } from './eliminar/familia-eliminar/familia-eliminar.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { ReciboModule } from './recibo/recibo.module';
import { ErrorServidorComponent } from './error-servidor/error-servidor.component';
import { InterceptorService } from './services/interceptor.service';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    BuildingComponent,
    ErrorServidorComponent
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
    EstudianteActualizarModule,

    EstudianteEliminarModule,
    FamiliaEliminarModule,

    AsistenciaModule,
    
    ReciboModule
    
  ],
  providers: [{
    provide:{HTTP_INTERCEPTORS, LOCALE_ID, useValue: 'es-*'},
    useClass:InterceptorService,
    multi:true,
    
  }],
  bootstrap: [AppComponent],

})
export class AppModule { 
  
}
