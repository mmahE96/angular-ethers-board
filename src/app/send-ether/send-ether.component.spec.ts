import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEtherComponent } from './send-ether.component';

describe('SendEtherComponent', () => {
  let component: SendEtherComponent;
  let fixture: ComponentFixture<SendEtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEtherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
