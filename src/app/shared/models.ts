export interface Tag {
    _author: string;
    name: string;
    seq: number;
    createdAt: Date;
}

export type DateFormat = 'dayTime' | 'day' | 'time';

export interface Colors {
    tiny: string;
    small: string;
    medium: string;
    large: string;
    huge: string;
}
