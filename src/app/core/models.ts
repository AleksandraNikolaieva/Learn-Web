export interface MenuItem {
    title: string;
    icon: string;
    link: string;
}

export interface User {
    _id: string;
    username: string;
    hash: string;
    role: string;
    firstName: string;
    lastName: string;
    picture: string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
    posts: Array<number>;
}

export type Role = 'admin' | 'student' | 'guest';
