import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import Ballot from "../../contract/contracts/Ballot.json";

declare let window:any;
const contractAddress  = "0xBd7B5a0f7D7A374A2F1a77D564aB76f37B013386"
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public provider;
  public signer;

  public accountAddress = "No data"

  public userInfo = {
    vote:"No data",
    weight:"No data",
    delegate:"No data",
    voted:"No data"
}
public userInfoPrice= "No data"
 

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum)    
    this.signer = this.provider.getSigner()
   }

  ngOnInit(): void {
  }

    async getUser() {
      
      const address = window.ethereum.selectedAddress
      this.accountAddress = address

      const contract = await new ethers.Contract(contractAddress, Ballot.abi, this.provider) 
  
      const vInfoP = await contract.estimateGas.voters(window.ethereum.selectedAddress);
      const hexStr = await vInfoP.toString();      
      this.userInfoPrice = hexStr;
     
      const votersInfo = await contract.voters(window.ethereum.selectedAddress)
      
      const userInformation = await {
          vote:votersInfo.vote._hex,
          weight:votersInfo.weight._hex,
          delegate:votersInfo.delegate,
          voted:votersInfo.voted
      }
  
      this.userInfo = userInformation;

    }

   


  
}
