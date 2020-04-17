import moment from 'moment';

export const formatDate = (date: Date, format?: string): string => {
    if (!date) {
        return "Not set";
    } else {
        format = format ? format : "L";
        return moment(date).format(format);
    }
};