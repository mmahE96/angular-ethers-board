import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import Ballot from "../../contract/contracts/Ballot.json";
import { NgForm } from '@angular/forms';


declare let window:any;
const contractAddress  = "0xBd7B5a0f7D7A374A2F1a77D564aB76f37B013386"

@Component({
  selector: 'app-rights',
  templateUrl: './rights.component.html',
  styleUrls: ['./rights.component.css']
})
export class RightsComponent implements OnInit {

  public provider;
  public signer;

  public rightsPrice;
  public rightsTo;
  public rightsError;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum)    
    this.signer = this.provider.getSigner()
    
   }

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm) {  
    console.log(form.form.value.addressToVote) 
    this.giveRightToVote(form.form.value.addressToVote) 
   
   
  }

  async giveRightToVote(address) {
    const contract = await new ethers.Contract(contractAddress, Ballot.abi, this.signer)     
    
    
    
    try {
  
      const rightPrice = await contract.estimateGas.giveRightToVote(address)            
        const str = rightPrice.toString()
        console.log("Price", str)
        this.rightsPrice = str
        const gvrt = await contract.giveRightToVote(address)
        this.rightsTo = gvrt
        console.log(gvrt)
        console.log("Price", str)     
        
      
    } catch (error) {
      console.log("Error: ", error)
      this.rightsError=error.message
     console.log(error.message)
  
      
    }
  }

}
