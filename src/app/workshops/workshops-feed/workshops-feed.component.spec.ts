import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsFeedComponent } from './workshops-feed.component';

describe('WorkshopsFeedComponent', () => {
    let component: WorkshopsFeedComponent;
    let fixture: ComponentFixture<WorkshopsFeedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WorkshopsFeedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkshopsFeedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
