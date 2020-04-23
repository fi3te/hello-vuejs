import { Entry } from '@/shared/entry';
import { SupportedLanguage } from '@/shared/supported-language';

export interface EntriesState {
    content: Entry[];
}

export interface RootState {
    entries?: EntriesState;
    language: SupportedLanguage;
}