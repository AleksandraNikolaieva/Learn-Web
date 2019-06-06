export interface Tag {
    title: string;
    isActive: boolean;
}

export type DateFormat = 'dayTime' | 'day' | 'time';

export interface Colors {
    tiny: string;
    small: string;
    medium: string;
    large: string;
    huge: string;
}

export interface CollapseContext {
    $implicit: string;
    controller: {
      collapse: () => void;
      expand: () => void;
    };
}
