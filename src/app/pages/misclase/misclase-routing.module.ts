import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisclasePage } from './misclase.page';

const routes: Routes = [
  {
    path: '',
    component: MisclasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisclasePageRoutingModule {}
