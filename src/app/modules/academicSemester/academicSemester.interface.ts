export type TMonths =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

export type TName = "Autumn" | "Summer" | "Fall";
export type TCode =  "1" | "2" | "3";

export interface IAcademicSemester {
    name: TName;
    code: TCode;
    year: Date;
    startMonth: TMonths;
    endMonth: TMonths;
};