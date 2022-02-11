import { Component, OnInit } from '@angular/core';
import axios from 'axios'

import { ethers } from 'ethers'

import NFT from "../contracts/NFT.sol/NFT.json"
import marketplace from "../contracts/NFTMarketplace.sol/NFTMarket.json"

const nftaddress = "0x607739B75eDfd19f6EB6cC488B085087A71E7bfc"
const marketplaceAddress = "0xdb938dF8Dd242a73181a8788733ea291962919ED"
declare let window: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public item = {
    price: "",
    tokenId: "",
    seller: "",
    owner: "",
    image: "",
    sold:"",
}

public items = []

public soldItems = []

  constructor() { 
    this.loadNFTs()

  }

  async loadNFTs() {
    const web3Modal = ({
      network: "rinkeby",
      cacheProvider: true,
    })
    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(marketplaceAddress, marketplace.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      this.item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
      }
      this.items.push(this.item)
      return 
    }))
    /* create a filtered array of items that have been sold */
    this.soldItems.push(this.items.filter(i => i.sold))
    console.log(this.items.filter(i => i.sold))
   
  }
}
