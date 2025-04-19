import Joi from 'joi';


const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    confirmPassword:Joi.ref('password')
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()    
})

export { registerSchema, loginSchema };
