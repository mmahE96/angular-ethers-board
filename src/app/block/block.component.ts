import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ethers} from "ethers"

declare let window:any;

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent {
    public provider;
    public block;
    public difficulty = "No data"
    public hash = "No data" 
    public miner = "No data"
    public nonce = "No data"
    public number = "No data"
    public parentHash = "No data"
    public timestamp = "No data"
    public balance;
    public address;
    public transactionCount;
    public blockNumber = "No data"
 
  constructor(){
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
  }  

 async getBlock(){
     const blockOne = await this.provider.getBlock();

     this.block = blockOne;
     this.difficulty= blockOne.difficulty;
     this.hash= blockOne.hash;
     this.miner= blockOne.miner;
     this.nonce= blockOne.nonce;
     this.number= blockOne.number;
     this.parentHash= blockOne.parentHash;
     this.timestamp= blockOne.timestamp;
     console.log(this.block);
     return     
  }

  
  onSubmit(form: NgForm) {
    console.log(form.form.value.addressName)
   this.address = form.form.value.addressName
   this.getBalance(this.address)
   this.getCount(this.address)
  }

  async getBalance(address){
    const bal = await (await this.provider.getBalance(address))._hex;
    this.balance = bal
  }

  async getCount(address) {
    const count = await this.provider.getTransactionCount(address);
    this.transactionCount = count
  }

  async getBlockNumber(){
    const blockNumber = await this.provider.getBlockNumber()
    this.blockNumber = blockNumber;
    return

  }
  


}
