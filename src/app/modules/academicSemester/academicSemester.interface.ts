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

type TName = "Autumn" | "Summer" | "Fall";
type TCode =  "1" | "2" | "3";

export interface IAcademicSemester {
    name: TName;
    code: TCode;
    year: Date;
    startMonth: TMonths;
    endMonth: TMonths;
};