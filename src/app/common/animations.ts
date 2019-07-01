import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

export const enterLeaveHeight = [
    trigger('enterLeaveHeight', [
        transition(':enter', [
            style({
                height: 0,
                opacity: 0,
                margin: 0
            }),
            animate(
                '600ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({
                    height: '*',
                    opacity: 1,
                    margin: '*'
                })
            )
        ]),
        transition(':leave', [
            style({
                height: '*',
                opacity: 1,
                margin: '*'
            }),
            animate(
                '600ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({
                    height: 0,
                    opacity: 0,
                    margin: 0
                })
            )
        ])
    ]),
];

export const enterLeaveWidth = [
    trigger('enterLeaveWidth', [
        transition(':leave', [
            style({
                width: '*'
            }),
            animate(300,
                style({
                    width: 0
                })
            )
        ]),
        transition(':enter', [
            style({
                width: 0
            }),
            animate('300ms',
                style({
                    width: '*'
                }))
        ])
    ])
];

export const enterRightPosition = [
    trigger('enterRightPosition', [
        transition(':enter', [
        style({
            right: '10px'
        }),
        animate('300ms',
            style({
                right: '*'
            }))
        ])
    ])
];
