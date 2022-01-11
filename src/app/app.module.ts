import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BlockComponent } from './block/block.component';
import { ContractComponent } from './contract/contract.component';
import { SendEtherComponent } from './send-ether/send-ether.component';
import { VotingContractComponent } from './voting-contract/voting-contract.component';

const appRoutes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'block', component:BlockComponent},
  {path: 'contract', component:ContractComponent},
  {path: 'sendEther', component:SendEtherComponent},
  {path: 'votingContract', component:VotingContractComponent}, 

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
