export interface Credentials {
    username: string;
    password: string;
}

export interface AuthData {
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
    token?: string;
}
