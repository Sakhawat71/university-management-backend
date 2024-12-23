import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.conostant";

// create 
const createSemesterRegistrationIntoDB = async (
    payLoad: TSemesterRegistration
) => {
    const academicSemester = payLoad?.academicSemester;

    // check if there any Registered semester that is already 'upcoming' | 'ongoing'
    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistrationModel.findOne({
        $or: [{ status: RegistrationStatus.UPCOMING }, { status: RegistrationStatus.ONGOING }]
    });
    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} Registered semester`,
            ''
        )
    };

    // step 1 : check academic Semester Exist or not
    const isAcademicSemesterExists = await AcademicSemesterModel.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'This academic semester not found !',
            ''
        )
    };

    // step 2 : check -> this semester already register or not
    const isSemesterRegistrationExist = await SemesterRegistrationModel.findOne({ academicSemester });
    if (isSemesterRegistrationExist) {
        throw new AppError(
            StatusCodes.CONFLICT,
            'This Semester Already Registered!',
            ''
        )
    };

    // final result 
    return await SemesterRegistrationModel.create(payLoad);
};


// get all 
const getAllSemesterRegistrationFromDB = async (
    query: Record<string, unknown>
) => {
    const semesterRegistrationQuery = new QueryBuilder(
        SemesterRegistrationModel.find().populate('academicSemester'),
        query
    )
        .filter()
        .sort()
        .paginate()
        .fields()
    return await semesterRegistrationQuery.modelQuery;
};


// get singel 
const getSingleSemesterRegistrationFromDB = async (id: string) => {
    return await SemesterRegistrationModel.findById(id).populate('academicSemester');
};

// update
const updateSemesterRegistrationIntoDB = async (id: string, payLoad: Partial<TSemesterRegistration>) => {

    // check -> requested Semester exist or not 
    const isSemesterRegistrationExist = await SemesterRegistrationModel.findById(id);
    if (!isSemesterRegistrationExist) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'Semester registere not found',
            ''
        )
    };

    // check semester already ended or not
    const currentSemesterStatus = isSemesterRegistrationExist?.status;
    const requestedStatus = payLoad?.status;
    if (currentSemesterStatus === RegistrationStatus.ENDED) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `This semester is Alreay ${currentSemesterStatus}`,
            ''
        )
    };

    // UPCOMING --> ONGOING --> ENDED
    if (
        currentSemesterStatus === RegistrationStatus.UPCOMING &&
        requestedStatus === RegistrationStatus.ENDED
    ) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`, ''
        );
    }

    if (
        currentSemesterStatus === RegistrationStatus.ONGOING &&
        requestedStatus === RegistrationStatus.UPCOMING
    ) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`, ''
        );
    }

    return await SemesterRegistrationModel.findByIdAndUpdate(
        id,
        payLoad,
        {
            new: true,
            runValidators: true
        }
    )
}

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}