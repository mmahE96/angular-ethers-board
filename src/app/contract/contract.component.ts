import { Component} from '@angular/core';
import {ethers} from "ethers";
import Greeter from "../contract/contracts/Greeter.json";
import { NgForm } from '@angular/forms';


declare let window:any;
const contractAddress = "0x5039a82817d481df8C4042089016fFb6F72b2F22"


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent {
  public provider;
  public signer;
  public greeting = "No data";
  public newGreeting;
  public transactionRes;
  public data = "No data";
  public from = "No data";
  public hash = "No data";
  public nonce = "No data";
  public confirmations = "No data";
 
     


  constructor() { 
    this.provider = new ethers.providers.Web3Provider(window.ethereum)    
    this.signer = this.provider.getSigner()
  }


 async fetchGreeting() {
  const contract = await new ethers.Contract(contractAddress, Greeter.abi, this.provider) 

  try {
    const data = await contract.greet() 
    console.log(data)
    this.greeting = data;
    
    return;
    
  } catch (error) {
    console.log(error)
    
  }
  }

  async onSubmit(form: NgForm) {
    console.log(form.form.value.setGreeting);
    await this.requestAccount()
    this.newGreeting = form.form.value.setGreeting;
    this.changeGreeting(form.form.value.setGreeting);
   
  }

 async changeGreeting(newGreeting) {
  const contract = await new ethers.Contract(contractAddress, Greeter.abi, this.signer)

  try {
    const transaction = await contract.setGreeting(newGreeting)
    console.log(transaction)
    this.transactionRes = transaction
    this.data = this.transactionRes.data.substring(0, 30)
    this.nonce = this.transactionRes.nonce
    this.from = this.transactionRes.from
    this.confirmations = this.transactionRes.confirmations
    this.hash = this.transactionRes.hash.substring(0, 30)
    
  } catch (error) {
    
  }

   
 }

 async requestAccount(){
  await window.ethereum.request({method: 'eth_requestAccounts'});
}

  

}
