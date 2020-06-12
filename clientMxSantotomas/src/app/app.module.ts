import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

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

import { SistemaModule } from './sistema/sistema.module';
import { faUsersCog, faUser, faUserEdit, faUsers, faBirthdayCake, faEdit, faTrash, faPrint, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { ReportesModule } from './reportes/reportes.module';

//registerLocaleData(localeEs, 'es');


@NgModule({
  declarations: [
    AppComponent,
    BuildingComponent,
    ErrorServidorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
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
    
    ReciboModule,
    SistemaModule,

    ReportesModule
    
  ],
  providers: [ ],
  bootstrap: [AppComponent],

})
export class AppModule { 
  constructor(library:FaIconLibrary){
    //agregando librerias
    library.addIcons(
        faUsersCog, faUser, faUserEdit, faUser, 
        faUsers, faBirthdayCake, faEdit, faTrash, 
        faPrint, faUserCheck );
  }
}
