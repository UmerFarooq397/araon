import { Component, NgZone, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import Web3 from 'web3';
import { AppSettings } from '../AppSettings';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  {

  title = 'angular-stripe';
  priceId = 'price_1IXWjmKIi9cViIYizqzYff35';
  product = {
    title: 'ElonCoin',
    subTitle: 'Buy 50 Elon coin',
    description: 'you can get 50 Eloncoins for 50$',
    price: 50.00
  };
  quantity = 1;
  stripePromise = loadStripe(environment.stripe_key);
  name: string;
  HDWalletProvider = require("@truffle/hdwallet-provider");
  constructor(private zone: NgZone, private Web3: Web3,public sharedServive: SharedService) { }
  model: any = {};
  public static ELONCOIN: any;
  public static ELONICO: any;
 
  async checkout() {
    // Call your backend to create the Checkout session.
    localStorage.setItem('publicAddress', JSON.stringify(this.model.publicaddrees));
   
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await this.stripePromise;
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{ price: this.priceId, quantity: this.quantity }],
      successUrl: `${window.location.href}/success`,
      cancelUrl: `${window.location.href}/failure`,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      console.log(error);
    }

  }
}