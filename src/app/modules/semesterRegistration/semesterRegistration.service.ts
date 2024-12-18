import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";

// create 
const createSemesterRegistrationIntoDB = async (payLoad: TSemesterRegistration) => {
    return await SemesterRegistrationModel.create(payLoad);
};

// get all 
const getAllSemesterRegistrationFromDB = async () => {
    return await SemesterRegistrationModel.find();
};

// get singel
const getSingleSemesterRegistrationFromDB = async (id: string) => {
    return await SemesterRegistrationModel.findById(id);
};

// update
const updateSemesterRegistrationIntoDB = async (id: string, payLoad: Partial<TSemesterRegistration>) => {
    return await SemesterRegistrationModel.findByIdAndUpdate(
        id,
        payLoad,
        {
            new: true
        }
    )
}

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}