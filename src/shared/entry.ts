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
