import { z } from "zod";


const loginValidation = z.object({
    body: z.object({
        id: z.string({ required_error: "Id is required" }),
        password: z.string({ required_error: "Password is required" }).min(6),
    }),
});


const changePasswordValidation = z.object({
    body: z.object({
        oldPassword: z.string({ required_error: "Old password is required" }),
        newPassword: z.string({ required_error: "Password is required" }).min(6),
    }),
});

const refreshTokenValidation = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: "refresh token is required!"
        })
    })
});

const forgetPasswordValidation = z.object({
    body: z.object({
        id: z.string({
            required_error: 'User id is required!',
        }),
    }),
});

export const AuthValidation = {
    loginValidation,
    changePasswordValidation,
    refreshTokenValidation,
    forgetPasswordValidation
};