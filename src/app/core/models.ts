export interface MenuItem {
    title: string;
    icon: string;
    link: string;
}

export interface User {
    _id: string;
    username: string;
    role: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
    posts: Array<string>;
}

export interface UserParams {
    firstName: string;
    lastName: string;
    picture: string;
    password: string;
}

export type Role = 'admin' | 'student' | 'guest';
