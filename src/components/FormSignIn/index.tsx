import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'
import Link from 'next/link'
import { Email, ErrorOutline, Lock } from '@styled-icons/material-outlined'

import Button from 'components/Button'
import TextField from 'components/TextField'
import { FormWrapper, FormLink, FormLoading, FormError } from 'components/Form'

import * as S from './styles'
import { FieldErrors, signInValidate } from 'utils/validations'

const FormSignIn = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const routes = useRouter()
  const { push, query } = routes

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const errors = signInValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }

    setFieldError({})

    // sign in
    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/${
        query?.callbackUrl || ''
      }`
    })

    if (result?.url) {
      return push(result?.url)
    }

    setLoading(false)

    // jogar o erro
    setFormError('Email ou senha inválidos.')
  }

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          error={fieldError?.email}
          onInputChange={(v) => handleInput('email', v)}
          icon={<Email />}
        />
        <TextField
          name="password"
          placeholder="Senha"
          type="password"
          error={fieldError?.password}
          onInputChange={(v) => handleInput('password', v)}
          icon={<Lock />}
        />

        <S.ForgotPassword
          onClick={() =>
            routes.push({
              pathname: '/forgot-password',
              query: { confirm: true }
            })
          }
        >
          Esqueceu sua senha?
        </S.ForgotPassword>

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Entrar</span>}
        </Button>

        <FormLink>
          Não possui conta?{' '}
          <span
            onClick={() =>
              routes.push({
                pathname: '/sign-up',
                query: { confirm: true }
              })
            }
          >
            <span>Criar conta</span>
          </span>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignIn
