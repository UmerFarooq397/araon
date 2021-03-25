import { Component, Inject, NgZone, OnInit } from '@angular/core';
import Web3 from 'web3';
import { AppSettings } from '../AppSettings';
import { SharedService } from '../shared.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Router } from '@angular/router';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  loading: boolean;
  name: string;
  HDWalletProvider = require("@truffle/hdwallet-provider");
  token: any;
  walletAddress: any;
  showdiv=false;
  constructor(private zone: NgZone, private Web3: Web3, public sharedServive: SharedService, private spinner: SpinnerVisibilityService, private route: Router) { }

  //load single private key as string
  provider = new this.HDWalletProvider(AppSettings.private_key, "https://ropsten.infura.io/v3/f655b88124184d209b6066f2b1b9d2d1");

  model: any = {};
  public static ELONCOIN: any;
  public static ELONICO: any;
  ngOnInit(): void {
    this.loading = true;
    this.spinner.show();
    this.walletAddress = JSON.parse(localStorage.getItem('publicAddress'));

    this.onSubmit();
  }
  async onSubmit() {
    this.name = 'ETHEREUM';
    var w3js: any = new Web3(this.provider);
    var mythis = this;
    try {
      w3js.eth.getAccounts(async function (err, res) {

        if (res) {
          var tokenInst = await new w3js.eth.Contract(AppSettings.ELONCOIN_ABI, AppSettings.ELONCOIN_CONTRACT);
          var balance = await tokenInst.methods.balanceOf(res[0]).call();
       var amount= JSON.parse(localStorage.getItem('publicAddress'));
          const tx = {
            from: res[0],
            to: AppSettings.ELONCOIN_CONTRACT,
            gas: '210000',
            data: tokenInst.methods.transfer(amount, w3js.utils.toWei('50', 'ether')).encodeABI()
          };
          //localStorage.clear();
          let signed = await w3js.eth.accounts.signTransaction(tx, AppSettings.private_key);
          const sentTx = w3js.eth.sendSignedTransaction(signed.raw || signed.rawTransaction);

          sentTx.on("receipt", receipt => {
            console.log('receipt:::', receipt);
            mythis.showdiv=true;
            console.log("fff", mythis.showdiv);
            
            setTimeout(() => {
              mythis.loading = false;
              
              mythis.zone.run(() => {
                mythis.spinner.hide();
                
              }, 1000);
            });

          });
          sentTx.on("error", err => {
            console.log('errr:::', err);
            setTimeout(() => {
              mythis.loading = false;
              mythis.showdiv=true;
              mythis.zone.run(() => {
                mythis.spinner.hide();
                mythis.route.navigateByUrl("/failure")
              }, 1000);
            }, 1000);


          });
        } else {
          mythis.zone.run(() => {
            let obj = {

              address: 'Please authorise you account to view',

              balance: 'Please authorise you account to view'

            };
            setTimeout(() => {
              this.loading = false;
              mythis.showdiv=true;
              this.spinner.hide();
              this.route.navigateByUrl("/failure")
            }, 1000);

          });
        }
      });
    } catch (ex) {
      setTimeout(() => {
        this.spinner.hide();
        this.route.navigateByUrl("/failure")
      }, 1000);
    }


  }


}


