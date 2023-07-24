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
import { useRouter } from 'next/router'

const Sidebar = ({ session, projects }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = useRouter().pathname

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
      {linksArray.map(({ icon, label, to }) => (
        <SLinkContainer
          key={label}
          isActive={pathname === to}
          session={session}
          title={!session ? 'Você precisa estar logado' : ''}
        >
          <Link
            href={to}
            passHref
            style={!sidebarOpen ? { width: `fit-content` } : {}}
          >
            <SLink session={session}>
              <SLinkIcon>{icon}</SLinkIcon>
              {sidebarOpen && (
                <>
                  <SLinkLabel>{label}</SLinkLabel>
                </>
              )}
            </SLink>
          </Link>
        </SLinkContainer>
      ))}
      <SDivider />
      {secondaryLinksArray.map(({ icon, label, to }) => (
        <SLinkContainer
          key={label}
          isActive={pathname === to}
          session={session}
          title={!session ? 'Você precisa estar logado' : ''}
        >
          <Link
            href={to}
            passHref
            style={!sidebarOpen ? { width: `fit-content` } : {}}
          >
            <SLink session={session}>
              <>
                <SLinkIcon>{icon}</SLinkIcon>
                {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
                {sidebarOpen && !!session && !!projects && (
                  <SLinkNotification>{projects}</SLinkNotification>
                )}
              </>
            </SLink>
          </Link>
        </SLinkContainer>
      ))}
      <SDivider />
      {terciaryLinksArray.map(({ icon, label, to }) => (
        <SLinkContainer
          key={label}
          isActive={pathname === to}
          session={session}
          title={!session ? 'Você precisa estar logado' : ''}
        >
          <Link
            href={to}
            passHref
            style={!sidebarOpen ? { width: `fit-content` } : {}}
          >
            <SLink session={session}>
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
  // {
  //   label: 'Linha do tempo',
  //   icon: <AiOutlineCalendar />,
  //   to: '/timeline',
  //   notification: 0
  // },
  {
    label: 'Backlog do produto',
    icon: <AiOutlineDatabase />,
    to: '/productBacklog',
    notification: 0
  },
  {
    label: 'Painel',
    icon: <AiOutlineGroup />,
    to: '/panel',
    notification: 0
  },
  {
    label: 'Gráfico Burndown',
    icon: <MdOutlineAnalytics />,
    to: '/burndownChart',
    notification: 0
  },
  {
    label: 'Base de conhecimento',
    icon: <AiOutlineBulb />,
    to: '/knowledgeBase',
    notification: 0
  }
]

const secondaryLinksArray = [
  {
    label: 'Meus Projetos',
    icon: <AiOutlineSetting />,
    to: '/projects'
  }
]

const terciaryLinksArray = [
  {
    label: 'Meu Perfil',
    icon: <AiOutlineUser />,
    to: '/profile'
  }
]

export default Sidebar
