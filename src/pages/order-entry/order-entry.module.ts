import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderEntryPage } from './order-entry';

@NgModule({
  declarations: [
    OrderEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderEntryPage),
  ],
})
export class OrderEntryPageModule {}
