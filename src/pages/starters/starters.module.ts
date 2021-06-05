import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StarterPage } from './starters';
@NgModule({
  declarations: [
    StarterPage,
  ],
  imports: [
    IonicPageModule.forChild(StarterPage),
  ],
})
export class StarterPageModule {}
