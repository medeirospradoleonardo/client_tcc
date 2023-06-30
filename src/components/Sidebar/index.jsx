import React, { useContext, useRef, useState } from 'react'
import {
  SDivider,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  SLinkNotification,
  SLogo,
  SSidebar,
  SSidebarButton,
  STheme,
  SThemeLabel,
  SThemeToggler,
  SToggleThumb
} from './styles'

import logoSVG from '../../../public/img/logo.svg'
import Logo from 'components/Logo'
import Button from 'components/Button'

import {
  AiOutlineApartment,
  AiOutlineHome,
  AiOutlineLeft,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineDatabase,
  AiOutlineGroup,
  AiOutlineBulb
} from 'react-icons/ai'
import { MdLogout, MdOutlineAnalytics } from 'react-icons/md'
import { BsPeople } from 'react-icons/bs'
import Link from 'next/link'

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <SSidebar isOpen={sidebarOpen}>
      <>
        <SSidebarButton
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen((p) => !p)}
        >
          <AiOutlineLeft />
        </SSidebarButton>
      </>
      {/* <SDivider /> */}
      <SLogo>
        {/* <Logo color="black" /> */}
        {/* <img src={logoSVG} alt="logo" /> */}
      </SLogo>
      {linksArray.map(({ icon, label, notification, to }) => (
        <SLinkContainer key={label} isActive={false}>
          <Link
            href={to}
            passHref
            style={!sidebarOpen ? { width: `fit-content` } : {}}
          >
            <SLink>
              <SLinkIcon>{icon}</SLinkIcon>
              {sidebarOpen && (
                <>
                  <SLinkLabel>{label}</SLinkLabel>
                  {/* if notifications are at 0 or null, do not display */}
                  {!!notification && (
                    <SLinkNotification>{notification}</SLinkNotification>
                  )}
                </>
              )}
            </SLink>
          </Link>
        </SLinkContainer>
      ))}
      <SDivider />
      {secondaryLinksArray.map(({ icon, label, to }) => (
        <SLinkContainer key={label}>
          <Link
            href={to}
            passHref
            style={!sidebarOpen ? { width: `fit-content` } : {}}
          >
            <SLink>
              <>
                <SLinkIcon>{icon}</SLinkIcon>
                {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
              </>
            </SLink>
          </Link>
        </SLinkContainer>
      ))}
      <SDivider />
      {terciaryLinksArray.map(({ icon, label, to }) => (
        <SLinkContainer key={label}>
          <Link
            href={to}
            passHref
            style={!sidebarOpen ? { width: `fit-content` } : {}}
          >
            <SLink>
              <>
                <SLinkIcon>{icon}</SLinkIcon>
                {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
              </>
            </SLink>
          </Link>
        </SLinkContainer>
      ))}
      {/* <STheme>
        {sidebarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
        <SThemeToggler
          isActive={theme === 'dark'}
          onClick={() => setTheme((p) => (p === 'light' ? 'dark' : 'light'))}
        >
          <SToggleThumb style={theme === 'dark' ? { right: '1px' } : {}} />
        </SThemeToggler>
      </STheme> */}
    </SSidebar>
  )
}

const linksArray = [
  {
    label: 'Home',
    icon: <AiOutlineHome />,
    to: '/',
    notification: 0
  },
  {
    label: 'Linha do tempo',
    icon: <AiOutlineCalendar />,
    to: '/profile/me',
    notification: 0
  },
  {
    label: 'Backlog do produto',
    icon: <AiOutlineDatabase />,
    to: '/customers',
    notification: 0
  },
  {
    label: 'Painel',
    icon: <AiOutlineGroup />,
    to: '/diagrams',
    notification: 0
  },
  {
    label: 'Grafico Burndown',
    icon: <MdOutlineAnalytics />,
    to: '/diagrams',
    notification: 0
  },
  {
    label: 'Base de conhecimento',
    icon: <AiOutlineBulb />,
    to: '/diagrams',
    notification: 0
  }
]

const secondaryLinksArray = [
  {
    label: 'Meus Projetos',
    icon: <AiOutlineSetting />,
    to: '/sign-up'
  },
  {
    label: 'Minha compania',
    icon: <AiOutlineSetting />,
    to: '/sign-in'
  }
]

const terciaryLinksArray = [
  {
    label: 'Meu Perfil',
    icon: <AiOutlineUser />,
    to: '/profile/me'
  }
]

export default Sidebar
