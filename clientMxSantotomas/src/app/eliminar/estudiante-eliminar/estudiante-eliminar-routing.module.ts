import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudianteDeleteComponent } from './estudiante-delete/estudiante-delete.component';

const routes: Routes = [
  {path:'estudiante/eliminar/:id/:nombre', component:EstudianteDeleteComponent,outlet:"popup"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteEliminarRoutingModule { }
