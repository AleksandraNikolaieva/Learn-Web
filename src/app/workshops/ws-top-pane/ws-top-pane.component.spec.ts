import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsTopPaneComponent } from './ws-top-pane.component';

describe('WsTopPaneComponent', () => {
    let component: WsTopPaneComponent;
    let fixture: ComponentFixture<WsTopPaneComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WsTopPaneComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WsTopPaneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
