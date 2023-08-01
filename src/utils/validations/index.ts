import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import Joi from 'joi'

const fieldsValidationsSignUp = {
  username: Joi.string().min(5).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'confirm password does not match with password' })
}

export type FieldErrors = {
  [key: string]: string
}

function getFieldErrors(objError: Joi.ValidationResult) {
  const errors: FieldErrors = {}

  if (objError.error) {
    objError.error.details.forEach((err) => {
      errors[err.path.join('.')] = err.message
    })
  }

  return errors
}

export function signUpValidate(values: UsersPermissionsRegisterInput) {
  const schema = Joi.object(fieldsValidationsSignUp)

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

type SignInValues = Omit<UsersPermissionsRegisterInput, 'username'>

export function signInValidate(values: SignInValues) {
  const { email, password } = fieldsValidationsSignUp
  const schema = Joi.object({ email, password })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

type ForgotValidateParamas = Pick<UsersPermissionsRegisterInput, 'email'>

export function forgotValidate(values: ForgotValidateParamas) {
  const { email } = fieldsValidationsSignUp

  const schema = Joi.object({ email })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

type ResetValidateParams = {
  password: string
  confirm_password: string
}

export function resetValidate(values: ResetValidateParams) {
  const { password, confirm_password } = fieldsValidationsSignUp

  const schema = Joi.object({ password, confirm_password })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

const fieldsValidationsProject = {
  name: Joi.string().required().messages({
    'string.empty': `O campo nome do projeto não pode ficar vazio`
  })
}

export function createProjectValidate(name: string) {
  const schema = Joi.object(fieldsValidationsProject)

  return getFieldErrors(schema.validate({ name }, { abortEarly: false }))
}
