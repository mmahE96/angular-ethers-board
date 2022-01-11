import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingContractComponent } from './voting-contract.component';

describe('VotingContractComponent', () => {
  let component: VotingContractComponent;
  let fixture: ComponentFixture<VotingContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
