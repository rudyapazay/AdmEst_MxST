import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudianteUpdateComponent } from './estudiante-update/estudiante-update.component';
import { EstudianteDocumentosComponent } from './estudiante-documentos/estudiante-documentos.component';
import { PrintCarneComponent } from './print-carne/print-carne.component';

const routes: Routes = [
  {path:"estudiante/editar/:id", component:EstudianteUpdateComponent,outlet:"popup"},
  {path:"estudiante/documentos/:id", component:EstudianteDocumentosComponent,outlet:"popup"},
  {path:"estudiante/carne/:id", component:PrintCarneComponent, outlet:"popup"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteActualizarRoutingModule { }
