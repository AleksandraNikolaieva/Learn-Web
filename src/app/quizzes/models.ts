export interface Quizz {
    name: string;
    questions: Array<Question>;
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
