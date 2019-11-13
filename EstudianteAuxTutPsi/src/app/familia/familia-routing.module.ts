import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamiliaListComponent } from './familia-list/familia-list.component';
import { FamiliaDetailComponent } from './familia-detail/familia-detail.component';

const routes: Routes = [
  {path:'familias', component:FamiliaListComponent},
  {path:'familia/:id',component:FamiliaDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliaRoutingModule { }
