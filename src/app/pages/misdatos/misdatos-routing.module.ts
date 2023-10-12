import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';


import { MisdatosPage } from './misdatos.page';

const routes: Routes = [
  {
    path: '',
    component: MisdatosPage,
    children: [
      {
        path: 'qr', 
        component: QrComponent
      },
      {
        path: 'miclase',
        component: MiclaseComponent
      },
      {
        path: 'foro',
        component: ForoComponent
      },
      {
        path: 'misdatos',
        component: MisdatosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisdatosPageRoutingModule {}
