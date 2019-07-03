import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Question, Quizz, QuizzData, QuizzesParams } from '../quizzes/models';
import { Observable } from 'rxjs';
import { Article } from '../workshops/models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class QuizzesService {

    constructor(private api: ApiService) { }

    createQuizz(quizzData: QuizzData): Observable<Quizz> {
        return this.api.postRequest('quizzes', quizzData)
        .pipe(
            map(res => res.quiz[0])
        );
    }

    getQuizzesWithParams(params: QuizzesParams): Observable<Array<Quizz>> {
        return this.api.getRequest('quizzes', params);
    }

    getQuizzById(id: string): Observable<Quizz> {
        return this.api.getRequest(`quizzes/${id}`)
        .pipe(
            map(res => res[0])
        );
    }

    getAllMyQuizzes(): Observable<Array<Quizz>> {
        return this.api.getRequest('quizzes/my');
    }

    getAllQuizzes(): Observable<Array<Quizz>> {
        return this.api.getRequest('quizzes/all')
        .pipe(
            map(res => res.quizzes)
        );
    }

    getLinkedPost(id: string): Observable<Article> {
        return this.api.getRequest(`quizzes/posts/${id}`);
    }

    updeteQuizz(id: string, quizzData: QuizzData): Observable<Quizz> {
        return this.api.putRequest(`quizzes/${id}`, quizzData);
    }

    deleteQuizz(id: string): Observable<any> {
        return this.api.deleteRequest(`quizzes/${id}`);
    }

    validateQuizz(id: string, testAnswers: {formData: Array<string>}): Observable<{message: string, results: Array<boolean>}> {
        return this.api.postRequest(`quizzes/validate/${id}`, testAnswers);
    }
}
