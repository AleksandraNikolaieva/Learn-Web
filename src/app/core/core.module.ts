import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopPaneComponent } from './top-pane/top-pane.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
    declarations: [
        SideMenuComponent,
        TopPaneComponent,
        NotFoundComponent,
        PopUpComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        OverlayModule,
        PortalModule
    ],
    exports: [
        TopPaneComponent,
        SideMenuComponent,
        NotFoundComponent
    ],
    entryComponents: [PopUpComponent]
})
export class CoreModule { }
