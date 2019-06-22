import { Quizz } from './models';

export let quizzes: Array<Quizz> = [
    {
        name: 'Final exam',
        author: '5d02b67d1169ca285e4aa13a',
        date: new Date(),
        questions: [
            {
                question: 'What is the best framework in 2019?',
                questionType: 'input',
                correctAnswer: 'Angular',
            },
            {
                question: 'What is the best CRM system for software?',
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
    },
    {
        name: 'Final exam1',
        author: '5d02b67d1169ca285e4aa13a',
        date: new Date(),
        questions: [
            {
                question: 'What is the best framework in 2019?',
                questionType: 'input',
                correctAnswer: 'Angular',
            },
            {
                question: 'What is the best CRM system for software?',
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
    },
    {
        name: 'Final exam2',
        author: '5d02b67d1169ca285e4aa13a',
        date: new Date(),
        questions: [
            {
                question: 'What is the best framework in 2019?',
                questionType: 'input',
                correctAnswer: 'Angular',
            },
            {
                question: 'What is the best CRM system for software?',
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
    },
    {
        name: 'Final',
        author: '5d02b67d1169ca285e4aa13a',
        date: new Date(),
        questions: [
            {
                question: 'What is the best framework in 2019?',
                questionType: 'input',
                correctAnswer: 'Angular',
            },
            {
                question: 'What is the best CRM system for software?',
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
