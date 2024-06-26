import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  SDivider,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  SLinkNotification,
  SProjectTitle,
  SProjectHelp,
  SProjectTitleContainer,
  SSidebar,
  SSidebarButton,
  SNaoLogado,
  STheme,
  SThemeLabel,
  SThemeToggler,
  SToggleThumb,
  SDividerContainer,
  SDividerTitle,
  SContainer
} from './styles'

import logoSVG from '../../../public/img/logo.svg'
import Logo from 'components/Logo'
import Button from 'components/Button'

import {
  AiOutlineCodepen,
  AiOutlineHome,
  AiOutlineLeft,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineDatabase,
  AiOutlineGroup,
  AiOutlineBulb
} from 'react-icons/ai'
import { MdOutlineAnalytics } from 'react-icons/md'
import { useRouter } from 'next/router'

const Sidebar = ({ session, projectsQuantity, activeProject }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = useRouter().pathname
  const router = useRouter()

  return (
    <SContainer>
      <SSidebar isOpen={sidebarOpen}>
        <>
          <SSidebarButton
            isOpen={sidebarOpen}
            onClick={() => setSidebarOpen((p) => !p)}
          >
            <AiOutlineLeft />
          </SSidebarButton>
        </>

        {/* <>
          <SProjectTitleContainer>
            <SLinkIcon>
              <AiOutlineCodepen />
            </SLinkIcon>
            {sidebarOpen && (
              <div>
                {activeProject != null && activeProject.name != null ? (
                  <>
                    <SProjectTitle>{activeProject.name}</SProjectTitle>
                  </>
                ) : (
                  <>
                    <SProjectTitle>Selecione um projeto</SProjectTitle>
                    <SProjectHelp>Vá em &quot;Meus Projetos&quot;</SProjectHelp>
                  </>
                )}
              </div>
            )}
          </SProjectTitleContainer>
          <SDividerContainer>
            <SDivider />
            <SDivider />
          </SDividerContainer>
        </> */}
        {linksArray.map(({ icon, label, to }) => (
          <SLinkContainer
            key={label}
            isActive={pathname === to}
            session={session}
            title={!session ? 'Você precisa estar logado' : ''}
            onClick={
              session
                ? () =>
                    router.push({
                      pathname: to,
                      query: { confirm: true }
                    })
                : () => {
                    return
                  }
            }
          >
            <SLink session={session}>
              <>
                <SLinkIcon>{icon}</SLinkIcon>
                {sidebarOpen && (
                  <>
                    <SLinkLabel session={session}>{label}</SLinkLabel>
                    {!session && <SNaoLogado>Não logado</SNaoLogado>}
                  </>
                )}

                {sidebarOpen &&
                  to == '/' &&
                  !!session &&
                  projectsQuantity >= 0 && (
                    <SLinkNotification>{projectsQuantity}</SLinkNotification>
                  )}
              </>
            </SLink>
          </SLinkContainer>
        ))}
        <SDivider />
        {secondaryLinksArray.map(({ icon, label, to }) => (
          <SLinkContainer
            key={label}
            isActive={pathname === to}
            session={session}
            title={!session ? 'Você precisa estar logado' : ''}
            onClick={
              session
                ? () =>
                    router.push({
                      pathname: to,
                      query: { confirm: true }
                    })
                : () => {
                    return
                  }
            }
          >
            <SLink session={session}>
              <SLinkIcon>{icon}</SLinkIcon>
              {sidebarOpen && (
                <>
                  <SLinkLabel session={session}>{label}</SLinkLabel>
                  {!session && <SNaoLogado>Não logado</SNaoLogado>}
                </>
              )}
            </SLink>
          </SLinkContainer>
        ))}
        <SDivider />
        {terciaryLinksArray.map(({ icon, label, to }) => (
          <SLinkContainer
            key={label}
            isActive={pathname === to}
            session={session}
            title={!session ? 'Você precisa estar logado' : ''}
            onClick={
              session
                ? () =>
                    router.push({
                      pathname: to,
                      query: { confirm: true }
                    })
                : () => {
                    return
                  }
            }
          >
            <SLink session={session}>
              <>
                <SLinkIcon>{icon}</SLinkIcon>
                {sidebarOpen && (
                  <>
                    <SLinkLabel session={session}>{label}</SLinkLabel>
                    {!session && <SNaoLogado>Não logado</SNaoLogado>}
                  </>
                )}
              </>
            </SLink>
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
    </SContainer>
  )
}

const linksArray = [
  // {
  //   label: 'Home',
  //   icon: <AiOutlineHome />,
  //   to: '/',
  //   notification: 0
  // },
  {
    label: 'Meus Projetos',
    icon: <AiOutlineHome />,
    to: '/'
  },
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
  }
  // {
  //   label: 'Gráfico Burndown',
  //   icon: <MdOutlineAnalytics />,
  //   to: '/burndownChart',
  //   notification: 0
  // },
  // {
  //   label: 'Base de conhecimento',
  //   icon: <AiOutlineBulb />,
  //   to: '/knowledgeBase',
  //   notification: 0
  // }
]

const secondaryLinksArray = [
  {
    label: 'Base de conhecimento',
    icon: <AiOutlineBulb />,
    to: '/knowledgeBase',
    notification: 0
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
