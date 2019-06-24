import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamiliaUpdateComponent } from './familia-update/familia-update.component';
import { PadreUpdateComponent } from './padre-update/padre-update.component';
import { MadreUpdateComponent } from './madre-update/madre-update.component';
import { ApoderadoUpdateComponent } from './apoderado-update/apoderado-update.component';

const routes: Routes = [
  {path:"familia/editar/:id", component:FamiliaUpdateComponent, outlet:"popup"},
  {path:"padre/editar/:id",component:PadreUpdateComponent, outlet:"popup"},
  {path:"madre/editar/:id",component:MadreUpdateComponent, outlet:"popup"},
  {path:"apoderado/editar/:id", component:ApoderadoUpdateComponent,outlet:"popup"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliaActualizarRoutingModule { }
