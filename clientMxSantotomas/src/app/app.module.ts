import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildingComponent } from './building/building.component';
import { FamiliaModule } from './familia/familia.module';
import { RegistrarModule } from './registrar/registrar.module';

@NgModule({
  declarations: [
    AppComponent,
    BuildingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // modulos propios 
    AppRoutingModule,
    RegistrarModule,
    FamiliaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
