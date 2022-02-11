import { Component } from '@angular/core';
import {ethers} from "ethers";
import axios from "axios"

import NFT from "../contracts/NFT.sol/NFT.json"
import marketplace from "../contracts/NFTMarketplace.sol/NFTMarket.json"

const nftaddress = "0x607739B75eDfd19f6EB6cC488B085087A71E7bfc"
const marketplaceAddress = "0xdb938dF8Dd242a73181a8788733ea291962919ED"
declare let window: any;


@Component({
  selector: 'app-nft-home',
  templateUrl: './nft-home.component.html',
  styleUrls: ['./nft-home.component.css']
})
export class NftHomeComponent {
  public items = [];


  constructor() {
    this.loadNFTs()
   }

 async loadNFTs() {
   
    try {
    const provider = new ethers.providers.StaticJsonRpcProvider("https://rinkeby.infura.io/v3/e3131bbb80dd494ca44a62bc7fd461e3")
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)   
    const marketContract = new ethers.Contract(marketplaceAddress, marketplace.abi, provider)      
       
    const data = await marketContract.fetchMarketItems()  
    
    const items = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.itemId) 
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), "ether")
        let item = {
            price,
            itemId: i.itemId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            sold: i.sold,
            image: meta.data.image,
            name:meta.data.name,
            description: meta.data.description,

          }
          this.items.push(item)
          console.log(this.items)
          return item
    })) 
  }catch(error) {
    console.log(error)
  }
  
  }

  async buyNft(nft) {    
    console.log(nft.price) 
        
        
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(marketplaceAddress, marketplace.abi, signer)
        console.log("2")
    
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
        console.log("3")

    
       console.log(price)
       console.log(nft.itemId)
  
        const transaction = await contract.createMarketSale(nftaddress, nft.itemId ,{ value: price})
        
        await transaction.wait()
        this.loadNFTs()
      }

  

}
