import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudianteDeleteComponent } from './estudiante-delete/estudiante-delete.component';
import { EstudianteDocumentosDeleteComponent } from './estudiante-documentos-delete/estudiante-documentos-delete.component';
import { DocumentosTrasladoDeleteComponent } from './documentos-traslado-delete/documentos-traslado-delete.component';

const routes: Routes = [
  {path:'estudiante/eliminar/:id/:nombre', component:EstudianteDeleteComponent,outlet:"popup"},
  {path:'estudiante/delete/documentos/:id',component:EstudianteDocumentosDeleteComponent, outlet:"popup"},
  {path:'estudiante/delete/documentosTraslado/:id',component:DocumentosTrasladoDeleteComponent, outlet:"popup"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteEliminarRoutingModule { }
