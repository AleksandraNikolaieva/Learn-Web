import { Observable } from 'rxjs';
import { User } from '../core/models';

export interface Quizz {
    id?: string;
    name: string;
    questions: Array<Question>;
    author: string;
    authorName?: Observable<string>;
    date?: Date;
    createdAt?: string;
    posts?: Array<string>;
    status: string;
    updatedAt?: string;
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
