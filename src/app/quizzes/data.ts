import { Quizz } from './models';

export let quizzes: Array<Quizz> = [
    {
        name: 'Final exam',
        questions: [
            {
                question: 'What is the best framework in 2019&',
                questionType: 'input',
                correctAnswer: 'Angular',
            },
            {
                question: 'What is the best CRM system for software',
                questionType: 'select',
                answerVariants: [
                    {
                        answer: 'Jira',
                        isCorrect: false
                    },
                    {
                        answer: 'Z-Stream',
                        isCorrect: true
                    },
                    {
                        answer: 'Gitlab',
                        isCorrect: false
                    }
                ]
            }
        ]
    }
];
