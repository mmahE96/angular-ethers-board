import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import Ballot from "../../contract/contracts/Ballot.json";
import { NgForm } from '@angular/forms';

declare let window:any;
const contractAddress  = "0xBd7B5a0f7D7A374A2F1a77D564aB76f37B013386"

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  public provider;
  public signer;

  public votePrice="No data"
  public voteTo ="No data"
  public voteError = "No data"

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum)    
    this.signer = this.provider.getSigner()
   }

  ngOnInit(): void {
  }

  async requestAccount(){
    await window.ethereum.request({method: 'eth_requestAccounts'});
  }


async onSubmit(form: NgForm) {  
  console.log(form.form.value.addressVote)
  await this.requestAccount()
  this.vote(form.form.value.addressVote)  
 
}

  async vote(address) {
    
    const contract = await new ethers.Contract(contractAddress, Ballot.abi, this.signer)    
    
    
    
    try {
      const votePrice = await contract.estimateGas.vote(address)            
      const str = votePrice.toString()        
      this.votePrice= str

        const vFor = await contract.vote(address)
        this.voteTo = vFor 
        console.log(vFor)   
      
    } catch (error) {
      console.log("Error: ", error)
      this.voteError = error.message    
    }
  }

}
