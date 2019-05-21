import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../models';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.pug',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
    @Input() isNavMenuOpen: boolean;
    @Output() closeMenu  = new EventEmitter<boolean>();

    menuItems: Array<MenuItem> = [
        {
            title: 'Dashboard',
            icon: 'icon-stats-dots',
            link: 'dashboard'
        },
        {
            title: 'Workshops',
            icon: 'icon-graduation-cap',
            link: '/workshops'
        },
        {
            title: 'Quizzes',
            icon: 'icon-question_answer',
            link: '/quizzes'
        }
    ];
    constructor() { }

    ngOnInit() {
    }

    private closeNavMenu() {
        this.isNavMenuOpen = false;
        this.closeMenu.emit(false);
    }
}
