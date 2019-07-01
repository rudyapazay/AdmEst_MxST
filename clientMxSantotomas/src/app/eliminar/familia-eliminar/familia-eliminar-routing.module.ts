import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamiliaDeleteComponent } from './familia-delete/familia-delete.component';

const routes: Routes = [
  {path:'familia/eliminar/:id/:carpeta', component:FamiliaDeleteComponent, outlet:"popup"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliaEliminarRoutingModule { }
