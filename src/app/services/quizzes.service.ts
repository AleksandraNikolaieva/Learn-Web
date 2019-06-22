import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Question, Quizz } from '../quizzes/models';
import { Observable } from 'rxjs';
import { Article } from '../workshops/models';
import { quizzes } from '../quizzes/data';

@Injectable({
    providedIn: 'root'
})
export class QuizzesService {
    quizzes = quizzes;

    constructor(private api: ApiService) { }

    createQuizz(
        name: string,
        posts: Array<string>,
        questions: Array<Question>,
        status = 'draft'
    ): Observable<Quizz> {
        const body = {
            name,
            posts,
            questions
        };
        return this.api.postRequest('quizzes', body);
    }

    getQuizzesWithParams(
        page: number,
        name: string,
        authorId: string,
        postId: string,
        status: 'published' | 'draft'
    ): Observable<Array<Quizz>> {
        let params: object;

        if (postId) {
            params = {
                postId
            };
        } else {
            params = {
                page,
                name,
                authorId,
                status
            };
        }
        return this.api.getRequest('quizzes', params);
    }

    getQuizzById(id: string): Observable<Quizz> {
        return this.api.getRequest(`quizzes/${id}`);
    }

    getAllMyQuizzes(): Observable<Array<Quizz>> {
        return this.api.getRequest('quizzes/my');
    }

    getAllQuizzes(): Observable<Array<Quizz>> {
        return this.api.getRequest('quizzes/all');
    }

    getLinkedPost(id: string): Observable<Article> {
        return this.api.getRequest(`quizzes/posts/${id}`);
    }

    updeteQuizz(
        id: string,
        status: 'published' | 'draft',
        posts: Array<string>,
        name: string,
        questions: Array<Question>
    ): Observable<Quizz> {
        const body = {
            name,
            status,
            posts,
            questions
        };
        return this.api.putRequest(`quizzes/${id}`, body);
    }

    deleteQuizz(id: string): Observable<any> {
        return this.api.deleteRequest(`quizzes/${id}`);
    }

    validateQuizz(id: string, testAnswers: {formData: Array<string>}): Observable<{message: string, result: Array<boolean>}> {
        return this.api.postRequest(`quizzes/validate/${id}`, testAnswers);
    }

    addMockQuizz(data) {
        this.quizzes.push(data);
    }

    getMockQuizzes() {
        return this.quizzes;
    }
}
