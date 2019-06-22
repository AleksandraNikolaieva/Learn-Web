import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { quizzes } from '../data';
import { FieldConfig } from 'src/app/dynamic-forms/models';
import { Quizz } from '../models';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.pug',
    styleUrls: ['./feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit, OnDestroy {
    quizzes: Array<Quizz> = quizzes;
    loggedUser: User;
    subscription: Subscription;

    constructor(
        private authService: AuthService,
        private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.subscription = this.authService.getLoggedUserObs().subscribe(res => {
            this.loggedUser = res;
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    deleteQuizz(id: number) {
        console.log('index', id);
        this.quizzes.splice(id, 1);
    }
}
