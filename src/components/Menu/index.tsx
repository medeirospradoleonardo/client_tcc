import { useState } from 'react'
import { Menu2 as MenuIcon } from '@styled-icons/remix-fill/Menu2'
import { Close as CloseIcon } from '@styled-icons/material-outlined/Close'

import Logo from 'components/Logo'
import * as S from './styles'
import Button from 'components/Button'
import MediaMatch from 'components/MediaMatch'
import Link from 'next/link'
import UserDropdown from 'components/UserDropdown'
import { useRouter } from 'next/router'

export type MenuProps = {
  username?: string | null
  loading?: boolean
}

const Menu = ({ username, loading }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <S.Container>
      <S.Wrapper isOpen={isOpen}>
        <MediaMatch lessThan="medium">
          <S.IconWrapper onClick={() => setIsOpen(true)}>
            <MenuIcon aria-label="Open Menu" />
          </S.IconWrapper>
        </MediaMatch>
        <S.LogoWrapper
          onClick={() =>
            router.push({
              pathname: '/',
              query: { confirm: true }
            })
          }
        >
          <Logo color="black" />
        </S.LogoWrapper>
        {!loading && (
          <>
            <S.MenuGroup>
              <MediaMatch greaterThan="medium">
                {!username ? (
                  <Button
                    onClick={() =>
                      router.push({
                        pathname: '/sign-in',
                        query: { confirm: true }
                      })
                    }
                  >
                    Entrar
                  </Button>
                ) : (
                  <UserDropdown username={username} />
                )}
              </MediaMatch>
            </S.MenuGroup>

            <S.MenuFull aria-hidden={!isOpen} isOpen={isOpen}>
              <CloseIcon
                aria-label="Close Menu"
                onClick={() => setIsOpen(false)}
              />
              <S.MenuNav>
                <S.MenuLink
                  onClick={() =>
                    router.push({
                      pathname: '/',
                      query: { confirm: true }
                    })
                  }
                >
                  Home
                </S.MenuLink>

                {!!username && (
                  <>
                    <S.MenuLink
                      onClick={() =>
                        router.push({
                          pathname: '/profile',
                          query: { confirm: true }
                        })
                      }
                    >
                      Meu Perfil
                    </S.MenuLink>
                  </>
                )}
              </S.MenuNav>
              {!username && (
                <S.RegisterBox>
                  <Button
                    fullWidth
                    size="large"
                    onClick={() =>
                      router.push({
                        pathname: '/sign-in',
                        query: { confirm: true }
                      })
                    }
                  >
                    Entrar
                  </Button>
                  <span>or</span>

                  <S.CreateAccount
                    title="Sign Up"
                    onClick={() =>
                      router.push({
                        pathname: '/sign-up',
                        query: { confirm: true }
                      })
                    }
                  >
                    Criar conta
                  </S.CreateAccount>
                </S.RegisterBox>
              )}
            </S.MenuFull>
          </>
        )}
      </S.Wrapper>
    </S.Container>
  )
}

export default Menu
