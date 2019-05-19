export interface User {
    id: number;
    name: string;
    imgSrc: string;
}

export interface MenuItem {
    title: string;
    icon: string;
    link: string;
}

export interface Article {
    id: number;
    title: string;
    author: string;
    date: string;
    description: string;
    img: string;
}
