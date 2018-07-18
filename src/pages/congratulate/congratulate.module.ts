import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CongratulatePage } from './congratulate';

@NgModule({
  declarations: [
    CongratulatePage,
  ],
  imports: [
    IonicPageModule.forChild(CongratulatePage),
  ],
})
export class CongratulatePageModule {}
