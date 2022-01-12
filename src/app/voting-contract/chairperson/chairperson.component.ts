import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import Ballot from "../../contract/contracts/Ballot.json";

declare let window:any;
const contractAddress  = "0xBd7B5a0f7D7A374A2F1a77D564aB76f37B013386"
@Component({
  selector: 'app-chairperson',
  templateUrl: './chairperson.component.html',
  styleUrls: ['./chairperson.component.css']
})
export class ChairpersonComponent implements OnInit {
  public provider;
  public signer;
  public charipersonPrice="No data"
  public chairperson="No data"
  public chairpersonError="No data"

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum)    
    this.signer = this.provider.getSigner()
   }

  ngOnInit(): void {
  }

  async checkChairperson() {    
    const contract = await new ethers.Contract(contractAddress, Ballot.abi, this.provider) 
  
    const chairPrice = await contract.estimateGas.chairperson()           
    const str = chairPrice.toString()   
    this.charipersonPrice = str    
    
    try {
     const cPerson = await contract.chairperson()     
     this.chairperson =cPerson
      
    } catch (error) {
      this.chairpersonError = error.message
      console.log("Error: ", error)
      
    }
  }

}
