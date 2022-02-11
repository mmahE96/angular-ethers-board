// @ts-nocheck
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import Web3Modal from "web3modal";

import NFT from "../contracts/NFT.sol/NFT.json"
import marketplace from "../contracts/NFTMarketplace.sol/NFTMarket.json"

const nftaddress = "0x607739B75eDfd19f6EB6cC488B085087A71E7bfc"
const marketplaceAddress = "0xdb938dF8Dd242a73181a8788733ea291962919ED"
declare let window: any;
 


const client = create('https://ipfs.infura.io:5001/api/v0')

console.log(client)

@Component({
  selector: 'app-sell-digital',
  templateUrl: './sell-digital.component.html',
  styleUrls: ['./sell-digital.component.css']
})
export class SellDigitalComponent {
  public fileUrl = ""
  public obj = {
    name:""
  }
  public anotherUrl=""
  public formInput = {
    name:"",
    description:"",
    price:"",
    image:"",
  }
  

  @Input('') userName: string;
  constructor() { }

  populate (){
    this.obj.name = this.userName
  }
  

 async onImage(event:any){
   
    let file = event.target.files[0]
    try {
      console.log("Uploading...")
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }      
      )     
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log("settamo", url)
      this.anotherUrl=url
      this.formInput.image=url
      console.log("AnotherUrl", this.anotherUrl)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }    

  }

  async onSubmit(form: NgForm){

    this.formInput.name=form.form.value.nftname
    this.formInput.description=form.form.value.description
    this.formInput.price=form.form.value.price
    this.createMarket(this.formInput)

  }
  

  async createMarket(formInput) {
    const { name, description, price, image } = formInput
    if (!name || !description || !price | !image) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      this.createSale(url, this.formInput)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async createSale(url, formInput) {
    console.log("Activated create Sale")
    const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)    
      const signer = provider.getSigner()
    
    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(marketplaceAddress, marketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()
    console.log("Listing price", listingPrice)
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    
  }

  









}
