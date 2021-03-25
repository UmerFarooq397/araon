import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Web3 from 'web3';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SuccessComponent,
    FailureComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ProductComponent
      },
      {
        path: 'success',
        component: SuccessComponent
      },
      {
        path: 'failure',
        component: FailureComponent
      },
      {
        path: '**',
        component: ProductComponent
      }
    ], { useHash: true })
  ],
  providers: [Web3],
  bootstrap: [AppComponent]
})
export class AppModule { }
