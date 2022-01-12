import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import Ballot from "../../contract/contracts/Ballot.json";

declare let window:any;
const contractAddress  = "0xBd7B5a0f7D7A374A2F1a77D564aB76f37B013386"

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  public provider;
  public signer;
  public candidates = {one:"No data", two:"No data"};
  public candidatePrice = "No data";
  

  constructor() { 
    this.provider = new ethers.providers.Web3Provider(window.ethereum)    
    this.signer = this.provider.getSigner()
  }

  ngOnInit(): void {
  }

  async fetchCandidates(){
    const contract = await new ethers.Contract(contractAddress, Ballot.abi, this.provider); 

    const candidatePrice = await contract.estimateGas.proposals(1);
    const hexStr = await candidatePrice.toString();      
    this.candidatePrice = hexStr;
    try {
    const candidateOne = await contract.proposals(0);
    const candidateTwo = await contract.proposals(1);

    this.candidates = {one:candidateOne.name, two:candidateTwo.name};
        
    } catch (error) {
        console.log(error);
        
    }
  }

}
