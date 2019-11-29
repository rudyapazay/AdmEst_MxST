import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildingComponent } from './building/building.component';
import { ErrorServidorComponent } from './error-servidor/error-servidor.component';

const routes: Routes = [
  {path:'',component:BuildingComponent},
  {path:'error/servidor', component:ErrorServidorComponent}
  //{path:'**',component:BuildingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
