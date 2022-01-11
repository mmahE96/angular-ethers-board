import { Component} from '@angular/core';
import {ethers} from "ethers";
import { NgForm } from '@angular/forms';

declare let window:any;

@Component({
  selector: 'app-send-ether',
  templateUrl: './send-ether.component.html',
  styleUrls: ['./send-ether.component.css']
})
export class SendEtherComponent{
  public provider;
  public signer;
  public transactionPrice = "No data";
  public transactionError = "No data";
  public transactionSuccess = "No data";
  public from= "no data"
  public hash = "no data"
  public value = "no data"
  public nonce= "no data"

  constructor() { 
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    this.signer = this.provider.getSigner()
  }

  onSubmit(form: NgForm){
   this.sendEther(form.form.value.address, form.form.value.amount)
   }

  async sendEther (address, amount){
try {
  const tx = await this.signer.sendTransaction({
    to: address,
    value: ethers.utils.parseEther(amount)    

});

this.transactionSuccess = tx
this.from=tx.from
this.hash=tx.hash
this.nonce=tx.nonce

this.value=tx.value.toString()
console.log(tx)
  
} catch (error) {
  this.transactionError = error.message
  
}
   

  } 

  

}
