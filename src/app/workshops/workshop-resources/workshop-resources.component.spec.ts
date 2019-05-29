import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopResourcesComponent } from './workshop-resources.component';

describe('WorkshopResourcesComponent', () => {
  let component: WorkshopResourcesComponent;
  let fixture: ComponentFixture<WorkshopResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
