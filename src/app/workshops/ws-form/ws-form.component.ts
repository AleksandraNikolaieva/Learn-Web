import { Component, OnInit, createPlatformFactory, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/shared/models';
import { AppState } from 'src/app/store/reducers';
import { Store, select } from '@ngrx/store';
import { TagsRequested, TagAddRequested } from 'src/app/store/tags/tags.actions';
import { selectAllTags } from 'src/app/store/tags/tags.selectors';
import { WorkshopAddRequested, WorkshopPageRequested, WorkshopEditRequested } from '../store/workshops.actions';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models';
import { WorkshopsService } from 'src/app/services/workshops.service';

@Component({
    selector: 'app-ws-form',
    templateUrl: './ws-form.component.pug',
    styleUrls: ['./ws-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WsFormComponent implements OnInit {
    title = '';
    workshopForm: FormGroup;
    tags$: Observable<Array<Tag>>;
    workshop: Article;
    action: 'edit' | 'add';

    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private workshopService: WorkshopsService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.tags$ = this.store.select(selectAllTags);

        this.workshopForm = this.fb.group({
            title: [null, [Validators.required, Validators.minLength(10)]],
            image: [null, Validators.required],
            description: [null, [Validators.required]],
            text: [null, [Validators.required]],
            tags: [null, Validators.required]
        });

        this.title = this.route.snapshot.data.title;
        this.store.dispatch(new TagsRequested());

        this.action = this.route.snapshot.data.action;

        if (this.action === 'edit') {
            this.workshopService.getPostById(this.route.snapshot.params.id)
            .subscribe((workshop: Article) => {
                this.workshop = workshop;
                this.workshopForm.patchValue(this.workshop);
                this.cdr.detectChanges();
            });
        }
    }

    onSubmit() {
        if (this.workshopForm.invalid) {
            Object.values(this.workshopForm.controls).forEach(control => {
                control.markAsTouched();
            });
        } else {
            if (this.action === 'add') {
                this.store.dispatch(new WorkshopAddRequested({workshopData: this.workshopForm.value}));
            } else {
                this.store.dispatch(new WorkshopEditRequested(
                    {
                        id: this.workshop.id,
                        workshopData: this.workshopForm.value
                    }
                ));
            }
        }
    }

    addNewTag(tagName: string): void {
        this.store.dispatch(new TagAddRequested({tagName}));
    }
}
