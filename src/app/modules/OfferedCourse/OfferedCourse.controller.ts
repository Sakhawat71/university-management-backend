import catchAsync from "../../utils/catchAsync";
import { OfferedCourseServices } from "./OfferedCourse.service";

// create 
const createOfferedCourse = catchAsync(async (req, res) => {
    // const result = OfferedCourseServices.
});

// get all
const getAllOfferedCourse = catchAsync(async (req, res) => {

})

// get single 
const getSingleOfferedCourse = catchAsync(async (req, res) => {

})

// update
const updateOfferedCourse = catchAsync(async (req, res) => {

})

export const OfferedCourseController = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    updateOfferedCourse,
}