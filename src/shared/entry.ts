export interface Entry {
    id: number;
    name: string;
    description: string;
    date: Date;
    endDate: Date;
}

export interface NewEntry {
    name: string;
    description: string;
    periodInMonths: number;
}

export interface OldEntry {
    name: string;
    description: string;
    periodInMonths: number;
    date: Date;
}
