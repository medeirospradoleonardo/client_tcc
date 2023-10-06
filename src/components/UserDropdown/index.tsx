import {
  AccountCircle,
  FavoriteBorder,
  ExitToApp
} from '@styled-icons/material-outlined'
import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown'

import Dropdown from 'components/Dropdown'

import * as S from './styles'

import { signOut } from 'next-auth/client'
import { useRouter } from 'next/router'

export type UserDropdownProps = {
  username: string
}

const UserDropdown = ({ username }: UserDropdownProps) => {
  const { push } = useRouter()
  const router = useRouter()
  return (
    <Dropdown
      title={
        <>
          <AccountCircle size={24} />
          <S.Username>{username}</S.Username>
          <ChevronDown size={24} />
        </>
      }
    >
      <S.Nav>
        <S.Link
          onClick={() =>
            router.push({
              pathname: '/profile',
              query: { confirm: true }
            })
          }
        >
          <AccountCircle />
          <span>Meu Perfil</span>
        </S.Link>

        <S.Link
          onClick={() =>
            router.push({
              pathname: `${process.env.NEXT_PUBLIC_API_URL}/`,
              query: { confirm: true }
            })
          }
        >
          <FavoriteBorder />
          <span>Home</span>
        </S.Link>

        <S.Link
          role="button"
          title="Sair"
          onClick={async () => {
            const data = await signOut({
              redirect: false,
              callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/`
            })
            push(data.url)
          }}
        >
          <ExitToApp />
          <span>Sair</span>
        </S.Link>
      </S.Nav>
    </Dropdown>
  )
}

export default UserDropdown
