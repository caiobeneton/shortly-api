import joi from "joi"

export const signUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    confirmPassword: joi.string().min(3).required(),
})