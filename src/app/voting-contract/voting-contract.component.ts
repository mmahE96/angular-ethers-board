import { Component} from '@angular/core';
import {ethers} from "ethers";
import Ballot from "../contract/contracts/Ballot.json";
import { NgForm } from '@angular/forms';

declare let window:any;
const contractAddress  = "0xBd7B5a0f7D7A374A2F1a77D564aB76f37B013386"

@Component({
  selector: 'app-voting-contract',
  templateUrl: './voting-contract.component.html',
  styleUrls: ['./voting-contract.component.css']
})
export class VotingContractComponent {
  public provider;
  public signer;
  public candidates = {one:"No data", two:"No data"};
  public candidatePrice = "No data";
  public userInfo = {
    vote:"No data",
    weight:"No data",
    delegate:"No data",
    voted:"No data"
}
public userInfoPrice= "No data"
public winningProposalPrice = "No data"
public winningProposal = "No data"
public rightsPrice = "No data"
public rightsTo="No data"
public voteErorr= "No data"
public delegatePrice="No data"
public delegateTo="No data"
public delegateError="No data"
public votePrice="No data"
public voteTo ="No data"
public voteError = "No data"
public winnerPrice="No data"
public winner="No data"
public winnerError="No data"
public charipersonPrice="No data"
public chairperson="No data"
public chairpersonError="No data"

  constructor() { 
    this.provider = new ethers.providers.Web3Provider(window.ethereum)    
    this.signer = this.provider.getSigner()
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

  async getUserInfo(){
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

async fetchWinningProposal() {
  const contract = await new ethers.Contract(contractAddress, Ballot.abi, this.provider) 
 
  
  const rightPrice = await contract.estimateGas.winningProposal()
  const hexStr = await rightPrice.toString()
 
  this.winningProposalPrice = hexStr
  
  try {
      const winP = await contract.winningProposal()
      const winPh = winP._hex
      //console.log(winPh)
    this.winningProposal = winPh
    
  } catch (error) {
    console.log("Error: ", error)
    
  }
}

async onSubmit(form: NgForm) {
  console.log(form.form.value.addressTo);
  await this.requestAccount()
  this.giveRightToVote(form.form.value.addressTo)
  
 
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
    this.voteErorr=error.message
   console.log(error.message)

    
  }
}

async requestAccount(){
  await window.ethereum.request({method: 'eth_requestAccounts'});
}

async onDelegate(nForm: NgForm) {
  console.log(nForm);
  await this.requestAccount()
  this.delegateRights(nForm.form.value.addressDelegate)
  
 
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


async onVote(nForm: NgForm) {
  console.log(nForm);
  await this.requestAccount()
  this.vote(nForm.form.value.addressVote) 
 
}



async vote(address) {
  const contract = await new ethers.Contract(contractAddress, Ballot.abi, this.signer)    
  
  const votePrice = await contract.estimateGas.vote(address)            
      const str = votePrice.toString()
      console.log("Price", str)
      this.votePrice= str
  
  try {
      const vFor = await contract.vote(address)
      this.voteTo = vFor    
    
  } catch (error) {
    console.log("Error: ", error)
    this.voteErorr =error.message    
  }
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

async checkChairperson() {
  const contract = await new ethers.Contract(contractAddress, Ballot.abi, this.provider) 

  const chairPrice = await contract.estimateGas.chairperson()           
  const str = chairPrice.toString()
  console.log("Price", str)
  this.charipersonPrice = str
  console.log(contract)
  
  try {
   const cPerson = await contract.chairperson()
   
   this.chairperson =cPerson
    
  } catch (error) {
    this.chairpersonError = error.message
    console.log("Error: ", error)
    
  }
}


  

  

}
