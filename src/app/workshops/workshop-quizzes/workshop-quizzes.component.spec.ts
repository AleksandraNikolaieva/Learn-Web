import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopQuizzesComponent } from './workshop-quizzes.component';

describe('WorkshopQuizzesComponent', () => {
  let component: WorkshopQuizzesComponent;
  let fixture: ComponentFixture<WorkshopQuizzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopQuizzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
