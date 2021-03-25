import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class SharedService {

 
tokenValue: string;
  constructor(){}

  get ProductToken(){
    return this.tokenValue;
  }
  set ProductToken(val){
    this.tokenValue = val;
  }
}