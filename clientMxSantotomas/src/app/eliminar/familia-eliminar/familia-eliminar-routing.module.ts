import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamiliaDeleteComponent } from './familia-delete/familia-delete.component';
import { PadreDeleteComponent } from './padre-delete/padre-delete.component';
import { MadreDeleteComponent } from './madre-delete/madre-delete.component';
import { DocumentosDeleteComponent } from './documentos-delete/documentos-delete.component';
import { ApoderadoDeleteComponent } from './apoderado-delete/apoderado-delete.component';

const routes: Routes = [
  {path:'familia/eliminar/:id/:carpeta', component:FamiliaDeleteComponent, outlet:"popup"},
  {path:'familia/delete/padre/:id', component:PadreDeleteComponent, outlet:"popup"},
  {path:'familia/delete/madre/:id', component:MadreDeleteComponent, outlet:"popup"},
  {path:'familia/delete/apoderado/:id', component:ApoderadoDeleteComponent, outlet:"popup"},
  {path:'familia/delete/documentos/:id', component:DocumentosDeleteComponent, outlet:"popup"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliaEliminarRoutingModule { }
