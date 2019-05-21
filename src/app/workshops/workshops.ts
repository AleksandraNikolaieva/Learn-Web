import { Article } from './models';

export let articles: Array<Article> = [
    {
        id: 1,
        title: 'Learn CSS Grid in 5 Minutes',
        author: 'Harald Borgen',
        date: new Date(2017, 10, 26),
        description: 'Grid layouts are fundamental to the design of websites, and the CSS Grid module is the most powerful and easiest tool for creating it.',
        img: '../assets/images/css1.jpg',
        tags: ['css', 'design'],
        likes: 10,
        comments: [
            {
                author: {
                    id: 2,
                    name: 'Sasha Nikolaieva',
                    imgSrc: ''
                },
                text: 'nice article!',
                date: new Date(2019, 4, 20)
            },
            {
                author: {
                    id: 3,
                    name: 'Dima Brody',
                    imgSrc: ''
                },
                text: 'tanks',
                date: new Date(2019, 4, 21)
            }
        ]
    },
    {
        id: 2,
        title: 'Understanding Node.js Event-Driven Architecture',
        author: 'Samer Buna',
        date: new Date(2017, 4, 8),
        description: 'The simplest form of the event-driven nature is the callback style of some of the popular Node.js functions — for example, fs.readFile. In this analogy, the event will be fired once (when Node is ready to call the callback) and the callback acts as the event handler. Let’s explore this basic form first.',
        img: '../assets/images/node1.jpg',
        tags: ['node', 'java script'],
        likes: 15
    },
    {
        id: 3,
        title: '15 HTML element methods you’ve potentially never heard of',
        author: 'David Gilbertson',
        date: new Date(2018, 5, 20),
        description: 'Most elements don’t have any interesting methods, so unless you actually sift through the spec for things you’ll almost never use, it’s easy to miss the little nuggets that are scattered throughout.',
        img: '../assets/images/html1.jpg',
        tags: ['html'],
        likes: 20
    },
    {
        id: 4,
        title: 'Getting started with Pug template engine',
        author: 'Antonio Regadas',
        date: new Date(2016, 11, 22),
        description: 'Clean and organize HTML, that’s what we as Front-end Developers always aim for. Well with Pug, formerly known as “Jade” (a registered trademark, and as a result a rename was needed) it’s a high performance and feature-rich templating engine that’s easy to achieve. Simply put, Pug is a clean, white space/indentation sensitive syntax for writing html.',
        img: '../assets/images/pug1.png',
        tags: ['pug'],
        likes: 30
    },
    {
        id: 5,
        title: 'The Complete Guide to SCSS/SASS',
        author: 'Fatos Morina',
        date: new Date(2019, 0, 17),
        description: 'In this tutorial Sassy, Sass and SCSS will refer to roughly the same thing. Conceptually, there isn’t much difference. You will learn the difference as you learn more, but basically SCSS is the one most people use now. It’s just a more recent (and according to some, superior) version of the original Sass syntax.',
        img: '../assets/images/scss1.png',
        tags: ['sass', 'design'],
        likes: 35
    },
    {
        id: 6,
        title: '10 Interview Questions Every JavaScript Developer Should Know',
        author: 'Eric Elliott',
        date: new Date(2019, 4, 8),
        description: `At most companies, management must trust the developers to give technical interviews in order to assess candidate skills. If you do well as a candidate, you’ll eventually need to interview. Here’s how.`,
        img: '../assets/images/js1.png',
        tags: ['java script', 'oop', 'algorithms'],
        likes: 40
    }
];
