import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisclasePageRoutingModule } from './misclase-routing.module';

import { MisclasePage } from './misclase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisclasePageRoutingModule
  ],
  declarations: [MisclasePage]
})
export class MisclasePageModule {}
