import { TCode, TMonths, TName } from "./academicSemester.interface";

export const AcademicSemesterMonths: TMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const AcademicSemesterName: TName[] = ['Autumn', 'Summer', 'Fall'];
export const AcademicSemesterCode: TCode[] = ['01', '02', '03'];

// why this page ?
// Because, This part I will use model and zod Validation.
// Don't repeat yourself : DRY

/*

const nameValidation = z.enum(['Autumn', 'Summer', 'Fall']);
const codeValidation = z.enum(['1', '2', '3']);
const months = z.enum([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]);


*/