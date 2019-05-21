import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliaryContentComponent } from './auxiliary-content.component';

describe('AuxiliaryContentComponent', () => {
  let component: AuxiliaryContentComponent;
  let fixture: ComponentFixture<AuxiliaryContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuxiliaryContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliaryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
