import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import Ballot from "../../contract/contracts/Ballot.json";
import { NgForm } from '@angular/forms';

declare let window:any;
const contractAddress  = "0xBd7B5a0f7D7A374A2F1a77D564aB76f37B013386"

@Component({
  selector: 'app-delegate',
  templateUrl: './delegate.component.html',
  styleUrls: ['./delegate.component.css']
})
export class DelegateComponent implements OnInit {
  public provider;
  public signer;

  public delegateTo;
  public delegatePrice;
  public delegateError;



  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum)    
    this.signer = this.provider.getSigner()
   }

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm) {  
       
    this.delegateRights(form.form.value.addressDelegate)  
   
  }

  async delegateRights(address) {
    const contract = await new ethers.Contract(contractAddress, Ballot.abi, this.signer) 
  
    
    //solve angula forms, research with angular inputs and data binding
    
    try {
      const delegatePrice = await contract.estimateGas.delegate(address)  
      console.log(address)          
        const str = delegatePrice.toString()
        console.log("Price", str)
        this.delegatePrice = str
  
     const delRigths = await contract.delegate(address)
     this.delegateTo = delRigths
      
    } catch (error) {
      console.log("Error: ", error)
      this.delegateError = error
      
    }
  }

}
