import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamiliaListComponent } from './familia-list/familia-list.component';

const routes: Routes = [
  {path:'familias', component:FamiliaListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliaRoutingModule { }
