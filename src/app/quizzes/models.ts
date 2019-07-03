import { Observable } from 'rxjs';
import { User } from '../core/models';

export interface Quizz {
    id: string;
    name: string;
    questions: Array<Question>;
    _author: string;
    authorName?: Observable<string>;
    status: 'draft' | 'published';
    posts: Array<string>;
    createdAt: string;
    updatedAt?: string;
}

export interface QuizzData {
    name: string;
    questions: Array<Question>;
    posts: Array<string>;
    status: 'draft' | 'published';
}

export interface QuizzesParams {
    page: number;
    name: string;
    authorId: string;
    postId: string;
    status: 'published' | 'draft';
}

export interface Question {
    correctAnswer?: string;
    answerVariants?: Array<QuestionVariant>;
    question: string;
    questionType: 'select' | 'input';
}

export interface QuestionVariant {
    answer: string;
    isCorrect: boolean;
}
