import Button from 'components/Button'
import Heading from 'components/Heading'
import TextField from 'components/TextField'
import Link from 'next/link'

import * as S from './styles'
import { useState } from 'react'
import { FieldErrors } from 'utils/validations'
import { useMutation } from '@apollo/client'
import { MUTATION_UPDATE_USER_NAME } from 'graphql/mutations/user'
import { Session } from 'next-auth'
import { ErrorOutline } from '@styled-icons/material-outlined'
import { FormError } from 'components/Form'
import { signOut } from 'next-auth/client'
import { useRouter } from 'next/router'

export type FormProfileProps = {
  username?: string
  email?: string
  session: Session
}

const FormProfile = ({ email, username, session }: FormProfileProps) => {
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [formError, setFormError] = useState('')
  const [name, setName] = useState<string>(username ? username : '')
  const { push } = useRouter()

  const handleInput = (value: string) => {
    setName(value)
  }

  const [updateUserName, { error, loading }] = useMutation(
    MUTATION_UPDATE_USER_NAME,
    {
      context: { session },
      onError: (err) => {
        setFormError(err?.graphQLErrors[0]?.message)
      }
    }
  )

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await updateUserName({
      variables: {
        id: 1,
        username: name
      }
    })
    const data = await signOut({ redirect: false, callbackUrl: '/sign-in' })
    push('/sign-in')
  }

  return (
    <>
      <Heading lineBottom color="black" size="small">
        Meu Perfil
      </Heading>
      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <S.Form>
        <TextField
          name="username"
          placeholder="Nome"
          label="Nome"
          error={fieldError?.name}
          onInputChange={(v) => handleInput(v)}
          initialValue={username}
        />

        <TextField
          name="email"
          type="email"
          placeholder="E-mail"
          initialValue={email}
          label="E-mail"
          disabled
        />
        <S.ButtonContainer>
          <Link href={`/forgot-password?email=${email}`} passHref>
            <Button minimal size="medium" as="a">
              Resetar senha
            </Button>
          </Link>
          <Button size="medium" onClick={handleSubmit}>
            Salvar
          </Button>
        </S.ButtonContainer>
      </S.Form>
    </>
  )
}
export default FormProfile
