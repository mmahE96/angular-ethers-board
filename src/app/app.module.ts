import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BlockComponent } from './block/block.component';
import { ContractComponent } from './contract/contract.component';
import { SendEtherComponent } from './send-ether/send-ether.component';
import { VotingContractComponent } from './voting-contract/voting-contract.component';
import { CandidatesComponent } from './voting-contract/candidates/candidates.component';
import { ChairpersonComponent } from './voting-contract/chairperson/chairperson.component';
import { WinnerComponent } from './voting-contract/winner/winner.component';
import { VoteComponent } from './voting-contract/vote/vote.component';
import { RightsComponent } from './voting-contract/rights/rights.component';
import { DelegateComponent } from './voting-contract/delegate/delegate.component';
import { UserComponent } from './voting-contract/user/user.component';
import { NftComponent } from './nft/nft/nft.component';
import { NftHomeComponent } from './nft/nft-home/nft-home.component';
import { SellDigitalComponent } from './nft/sell-digital/sell-digital.component';
import { MyAssetsComponent } from './nft/my-assets/my-assets.component';
import { DashboardComponent } from './nft/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'block', component:BlockComponent},
  {path: 'contract', component:ContractComponent},
  {path: 'sendEther', component:SendEtherComponent},
  {path: 'votingContract', component:VotingContractComponent}, 
  {path: 'nft', component:NftComponent},
  {path: 'nft/home', component:NftHomeComponent},
  {path: 'nft/sellDigital', component:SellDigitalComponent},
  {path: 'nft/myAssets', component:MyAssetsComponent},
  {path: 'nft/dashboard', component:DashboardComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BlockComponent,
    ContractComponent,
    SendEtherComponent,
    VotingContractComponent,
    CandidatesComponent,
    ChairpersonComponent,
    WinnerComponent,
    VoteComponent,
    RightsComponent,
    DelegateComponent,
    UserComponent,
    NftComponent,
    NftHomeComponent,
    SellDigitalComponent,
    MyAssetsComponent,
    DashboardComponent,    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
