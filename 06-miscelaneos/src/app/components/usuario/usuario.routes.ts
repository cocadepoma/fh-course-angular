import { Routes} from '@angular/router';

import { UsuarioDetalleComponent } from './usuario-detalle.component';
import { UsuarioEditarIsComponent } from './usuario-editar-is.component';
import { UsuarioNuevoComponent } from './usuario-nuevo.component';



export const USUARIO_ROUTES: Routes = [
    { path: 'nuevo', component: UsuarioNuevoComponent},
    { path: 'editar', component: UsuarioEditarIsComponent },
    { path: 'detalle', component: UsuarioDetalleComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'nuevo' },


];

