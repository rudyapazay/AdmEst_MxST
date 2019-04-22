import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildingComponent } from './building/building.component';
import { FamiliaModule } from './familia/familia.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BuildingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // modulos propios 
    AppRoutingModule,
    FamiliaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
