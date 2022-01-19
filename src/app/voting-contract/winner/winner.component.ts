import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import Ballot from "../../contract/contracts/Ballot.json";
import { NgForm } from '@angular/forms';

declare let window:any;
const contractAddress  = "0xBd7B5a0f7D7A374A2F1a77D564aB76f37B013386"

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {
  public provider;
  public signer;

  public winnerPrice;
  public winner;
  public winnerError;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum)    
    this.signer = this.provider.getSigner()
   }

  ngOnInit(): void {
  }

  async getWinnerName() {
    const contract = await new ethers.Contract(contractAddress, Ballot.abi, this.provider) 
  
    const winnerPrice = await contract.estimateGas.winnerName()            
    const str = winnerPrice.toString()
    console.log("Price", str)
    this.winnerPrice= str
    console.log(contract)
    
    try {
     const wName = await contract.winnerName()
     this.winner= wName
      
    } catch (error) {
      console.log("Error: ", error)
      this.winnerError = error.message    
    }
  }

}
