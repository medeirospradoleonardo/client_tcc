import { FormBoardValues } from 'components/FormBoard'
import { SprintValues } from 'components/FormSprint'
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import Joi from 'joi'

const fieldsValidationsSignUp = {
  username: Joi.string().min(5).required().messages({
    'string.empty': `O campo nome não pode ficar vazio`
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': `O campo Email não pode ficar vazio`
    }),
  password: Joi.string().required().messages({
    'string.empty': `O campo Senha não pode ficar vazio`
  }),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'A senha de confirmação não e a mesma que a senha escolhida',
      'string.empty': `O campo Confirmar senha não pode ficar vazio`
    })
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

const fieldsValidationsSprint = {
  name: Joi.string().required().messages({
    'string.empty': `O campo nome não pode ficar vazio`
  }),
  initialDate: Joi.string().required().messages({
    'string.empty': `O campo data inicial não pode ficar vazio`
  }),
  finalDate: Joi.string().required().messages({
    'string.empty': `O campo data final não pode ficar vazio`
  })
}

export function createSprintValidate(values: SprintValues) {
  const schema = Joi.object(fieldsValidationsSprint)

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

const fieldsValidationsBoard = {
  title: Joi.string().required().messages({
    'string.empty': `O campo título não pode ficar vazio.`
  }),
  timeEstimated: Joi.number().integer().min(1).messages({
    'number.min': `O campo tempo precisa ser maior que 0.`
  })
}

export function createBoardValidate(values: FormBoardValues) {
  const schema = Joi.object(fieldsValidationsBoard)

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}
