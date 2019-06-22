import { Observable } from 'rxjs';

export interface Quizz {
    name: string;
    questions: Array<Question>;
    author: string;
    authorName?: Observable<string>;
    date: Date;
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
