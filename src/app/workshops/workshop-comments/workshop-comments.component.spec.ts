import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopCommentsComponent } from './workshop-comments.component';

describe('WorkshopCommentsComponent', () => {
  let component: WorkshopCommentsComponent;
  let fixture: ComponentFixture<WorkshopCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
