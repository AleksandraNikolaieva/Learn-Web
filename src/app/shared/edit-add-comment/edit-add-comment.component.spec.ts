import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddCommentComponent } from './edit-add-comment.component';

describe('EditAddCommentComponent', () => {
    let component: EditAddCommentComponent;
    let fixture: ComponentFixture<EditAddCommentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditAddCommentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditAddCommentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
