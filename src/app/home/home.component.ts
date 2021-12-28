import { Component, OnInit } from '@angular/core';
import { ethers } from "ethers";

declare let window: any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public provider;
  public networkResolved;
  constructor(){
      this.provider = new ethers.providers.Web3Provider(window.ethereum)
  }

  getProvider(){
      console.log(this.provider)
  }

  getNetwork(){
     return this.provider.connection.url
  }

 async getNetworkName(){
     const objOne = await this.provider._networkPromise
     this.networkResolved = objOne.name
     console.log("Connected")
     return 
    
  }

  getResolved(){
      //console.log(this.networkResolved)
      return this.networkResolved
  }

}
