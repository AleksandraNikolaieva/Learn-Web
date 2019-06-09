import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

export const enterHeight = [
    trigger('enterHeight', [
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

export const leaveWidth = [
    trigger('leaveWidth', [
        transition(':leave', [
            style({
                width: '*'
            }),
            animate(300,
                style({
                    width: 0
                })
            )
        ])
    ]
    )
];

