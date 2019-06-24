import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamiliaUpdateComponent } from './familia-update/familia-update.component';

const routes: Routes = [
  {path:"familia/editar/:id", component:FamiliaUpdateComponent, outlet:"popup"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliaActualizarRoutingModule { }
