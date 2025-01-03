import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { SemesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { OfferedCourseModel } from "./OfferedCourse.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseModel } from "../Course/course.model";
import { FacultyModel } from "../Faculty/faculty.model";
import { hasTimeConflict } from "./OfferedCourse.utils";
import { StudentModel } from "../student/student.model";

// create 
const createOfferedCourseIntoDB = async (payLoad: TOfferedCourse) => {
    const {
        semesterRegistration,
        academicFaculty,
        academicDepartment,
        course,
        faculty,
        section,
        days,
        startTime,
        endTime,
    } = payLoad;

    /*
        Step 1: check if the semester registration id is exists!
        Step 2: check if the academic faculty id is exists!
        Step 3: check if the academic department id is exists!
        Step 4: check if the course id is exists!
        Step 5: check if the faculty id is exists!
        Step 6: check if the department is belong to the  faculty
        Step 7: check if the same offered course same section in same registered semester exists
        Step 8: get the schedules of the faculties
        Step 9: check if the faculty is available at that time. If not then throw error
        Step 10: create the offered course
    */

    // stap 1 : check semester Registration exist 
    const isSemesterRegistrationExist = await SemesterRegistrationModel.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'Semester registration not found !',
            ''
        );
    };

    // academic Semester
    const academicSemester = isSemesterRegistrationExist.academicSemester;

    // stap 2 : check academic Faculty exist 
    const isAcademicFacultyExist = await AcademicFacultyModel.findById(academicFaculty);
    if (!isAcademicFacultyExist) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'academic Faculty not found !'
        );
    };

    // stap 3 : check academic Department exist  
    const isAcademicDepartmentExist = await AcademicDepartmentModel.findById(academicDepartment);
    if (!isAcademicDepartmentExist) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'Academic Department not found !',
            ''
        );
    };

    // stap 4 :  course exist
    const isCourseExits = await CourseModel.findById(course);
    if (!isCourseExits) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Course not found !', '');
    };

    // stap 5: facutly exist
    const isFacultyExits = await FacultyModel.findById(faculty);
    if (!isFacultyExits) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found !', '');
    };

    // check if the department is belong to the  faculty
    const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
        _id: academicDepartment,
        academicFaculty,
    });
    if (!isDepartmentBelongToFaculty) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `This ${isAcademicDepartmentExist.name} is not  belong to this ${isAcademicDepartmentExist.name}`, ''
        );
    };

    // check if the same offered course same section in same registered semester exists
    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
        await OfferedCourseModel.findOne({
            semesterRegistration,
            course,
            section,
        });

    if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `Offered course with same section is already exist!`,
            ''
        );
    };

    // get the schedules of the faculties
    const assignedSchedules = await OfferedCourseModel.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');

    const newSchedule = {
        days,
        startTime,
        endTime,
    };

    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(
            StatusCodes.CONFLICT,
            `This faculty is not available at that time ! Choose other time or day`,
            ''
        );
    };

    return await OfferedCourseModel.create({ ...payLoad, academicSemester });
};

// get all 
const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
    const offeredCourseQuery = new QueryBuilder(OfferedCourseModel.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await offeredCourseQuery.modelQuery;
    const meta = await offeredCourseQuery.countTotal();
    return {
        meta,
        result
    };
};

// get my offered courses 
const getMyOfferedCoursesFromDB = async (
    id: string,
    query: Record<string, unknown>
) => {

    // get pagination setup
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;


    // find student
    const student = await StudentModel.findOne({ id });
    if (!student) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'student not found'
        );
    };

    // Find current ongoing semester
    const currentOngoingSemester = await SemesterRegistrationModel.findOne({ status: 'ONGOING' });
    if (!currentOngoingSemester) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'current Ongoing Semester not found'
        );
    };

    const aggregationQuery = [
        {
            $match: {
                semesterRegistration: currentOngoingSemester._id,
                academicFaculty: student.academicFaculty,
                academicDepartment: student.academicDepartment,
            }
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'course'
            }
        },
        {
            $unwind: '$course'
        },
        {
            $lookup: {
                from: 'enrolledcourses',
                let: {
                    currentOngoingSemester: currentOngoingSemester._id,
                    currentStudent: student._id,
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: [
                                            '$semesterRegistration',
                                            '$$currentOngoingSemester'
                                        ]
                                    },
                                    {
                                        $eq: [
                                            '$student',
                                            '$$currentStudent'
                                        ]
                                    },
                                    {
                                        $eq: ['$isEnrolled', true]
                                    }
                                ]
                            }
                        }
                    }
                ],
                as: 'enrolledCourses'
            }
        },
        {
            $lookup: {
                from: 'enrolledcourses',
                let: { currentStudent: student._id, },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ['$student', '$$currentStudent']
                                    },
                                    {
                                        $eq: ['$isCompleted', true]
                                    }
                                ]
                            }
                        }
                    }
                ],
                as: 'completedCourses'
            }
        },
        {
            $addFields: {
                completedCourseIds: {
                    $map: {
                        input: '$completedCourses',
                        as: 'completed',
                        in: '$$completed.course'
                    }
                }
            }
        },
        {
            $addFields: {
                isPreRequisitesFulFilled: {
                    $or: [
                        { $eq: ['$course.preRequisiteCourses', []] },
                        {
                            $setIsSubset: [
                                '$course.preRequisiteCourses.course',
                                '$completedCourseIds'
                            ]
                        }
                    ]
                },
                isAlreadyEnrolled: {
                    $in: [
                        '$course._id',
                        {
                            $map: {
                                input: '$enrolledCourses',
                                as: 'enroll',
                                in: '$$enroll.course'
                            }
                        }]
                }
            }
        },
        {
            $match: {
                isAlreadyEnrolled: false,
                isPreRequisitesFulFilled: true,
            }
        },
    ];

    const paginationQuery = [
        {
            $skip: skip
        },
        {
            $limit: limit
        }
    ];

    const result = await OfferedCourseModel.aggregate([
        ...aggregationQuery,
        ...paginationQuery
    ]);

    const total = (await OfferedCourseModel.aggregate(aggregationQuery)).length;
    const totalPages = Math.ceil(total / limit);


    return {
        meta: {
            page,
            limit,
            total,
            totalPages,
        },
        result
    };
};


// get singel 
const getSingleOfferedCourseFromDB = async (id: string) => {
    const offeredCourse = await OfferedCourseModel.findById(id);

    if (!offeredCourse) {
        throw new AppError(404, 'Offered Course not found', '');
    }

    return offeredCourse;
};

// update
const updateOfferedCourseIntoDB = async (
    id: string,
    payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
    /**
     * Step 1: check if the offered course exists
     * Step 2: check if the faculty exists
     * Step 3: check if the semester registration status is upcoming
     * Step 4: check if the faculty is available at that time. If not then throw error
     * Step 5: update the offered course
     */
    const { faculty, days, startTime, endTime } = payload;

    const isOfferedCourseExists = await OfferedCourseModel.findById(id);
    if (!isOfferedCourseExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not found !', '');
    }

    const isFacultyExists = await FacultyModel.findById(faculty);
    if (!isFacultyExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found !', '');
    }

    const semesterRegistration = isOfferedCourseExists.semesterRegistration;


    // Checking the status of the semester registration
    const semesterRegistrationStatus =
        await SemesterRegistrationModel.findById(semesterRegistration);
    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`, ''
        );
    }

    // get the schedules of the faculties
    // check if the faculty is available at that time.
    const assignedSchedules = await OfferedCourseModel.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');

    const newSchedule = {
        days,
        startTime,
        endTime,
    };

    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(
            StatusCodes.CONFLICT,
            `This faculty is not available at that time ! Choose other time or day`, ''
        );
    }

    return await OfferedCourseModel.findByIdAndUpdate(id, payload, {
        new: true,
    });
};

// delete
const deleteOfferedCourseFromDB = async (id: string) => {
    /**
     * Step 1: check if the offered course exists
     * Step 2: check if the semester registration status is upcoming
     * Step 3: delete the offered course
     */

    const isOfferedCourseExists = await OfferedCourseModel.findById(id);
    if (!isOfferedCourseExists) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'Offered Course not found',
            ''
        );
    };

    const semesterRegistation = isOfferedCourseExists.semesterRegistration;
    const semesterRegistrationStatus =
        await SemesterRegistrationModel.findById(semesterRegistation).select('status');

    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
            ''
        );
    };

    return await OfferedCourseModel.findByIdAndDelete(id);
};



export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getMyOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    deleteOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
};