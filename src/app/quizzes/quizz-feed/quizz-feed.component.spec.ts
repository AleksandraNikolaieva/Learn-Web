import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzFeedComponent } from './quizz-feed.component';

describe('FeedComponent', () => {
    let component: QuizzFeedComponent;
    let fixture: ComponentFixture<QuizzFeedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuizzFeedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuizzFeedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
