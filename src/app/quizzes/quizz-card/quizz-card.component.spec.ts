import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzCardComponent } from './quizz-card.component';

describe('QuizzCardComponent', () => {
    let component: QuizzCardComponent;
    let fixture: ComponentFixture<QuizzCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuizzCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuizzCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
