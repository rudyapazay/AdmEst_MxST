import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudianteUpdateComponent } from './estudiante-update/estudiante-update.component';
import { EstudianteDocumentosComponent } from './estudiante-documentos/estudiante-documentos.component';
import { PrintCarneComponent } from './print-carne/print-carne.component';
import { CambiarGradoSeccionComponent } from './cambiar-grado-seccion/cambiar-grado-seccion.component';
import { EstudianteDocumentosTrasladoComponent } from './estudiante-documentos-traslado/estudiante-documentos-traslado.component';
import { EstudianteCambiarFamiliaComponent } from './estudiante-cambiar-familia/estudiante-cambiar-familia.component';
import { EstudianteCambiarEstadoComponent } from './estudiante-cambiar-estado/estudiante-cambiar-estado.component';

const routes: Routes = [
  {path:"estudiante/editar/:id", component:EstudianteUpdateComponent,outlet:"popup"},
  {path:"estudiante/documentos/:id", component:EstudianteDocumentosComponent,outlet:"popup"},
  {path:"estudiante/documentos/traslado/:id", component:EstudianteDocumentosTrasladoComponent, outlet:"popup"},
  {path:"estudiante/carne/:id", component:PrintCarneComponent, outlet:"popup"},
  {path:"estudiante/:id/:nombre", component:CambiarGradoSeccionComponent, outlet:"popup"},
  {path:"estudiante/cambiar/familia/:id", component:EstudianteCambiarFamiliaComponent, outlet:"popup"},
  {path:"estudiante/cambiar/estado/:id", component:EstudianteCambiarEstadoComponent, outlet:"popup" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteActualizarRoutingModule { }
