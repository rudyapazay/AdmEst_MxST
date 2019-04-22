import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegFamiliaComponent } from './reg-familia/reg-familia.component';
import { RegPadreComponent } from './reg-padre/reg-padre.component';
import { RegMadreComponent } from './reg-madre/reg-madre.component';
import { RegApoderadoComponent } from './reg-apoderado/reg-apoderado.component';
import { RegEstudianteComponent } from './reg-estudiante/reg-estudiante.component';

const routes: Routes = [
  {path:'registrar/familia',component:RegFamiliaComponent},
  {path:'registrar/padre/:id',component:RegPadreComponent},
  {path:'registrar/madre/:id',component:RegMadreComponent},
  {path:'registrar/apoderado/:id',component:RegApoderadoComponent},
  {path:'registrar/estudiante/:id',component:RegEstudianteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarRoutingModule { }
