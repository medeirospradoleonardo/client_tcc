import Button from 'components/Button'
import Heading from 'components/Heading'
import TextField from 'components/TextField'

import * as S from './styles'
import { Container } from 'components/Container'
import SelectChips from 'components/SelectChips'
import { useEffect, useState } from 'react'
import { MultiValue } from 'react-select'
import { OptionType } from '@atlaskit/select'
import { FormError } from 'components/Form'
import { ErrorOutline, NewLabel } from '@styled-icons/material-outlined'
import { FieldErrors, createProjectValidate } from 'utils/validations'
import { User } from 'components/Table'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  MUTATION_CREATE_PROJECT_USER_ROLE,
  MUTATION_DELETE_PROJECT_USER_ROLE,
  MUTATION_UPDATE_PROJECT_USER_ROLE
} from 'graphql/mutations/projectUserRole'
import {
  MUTATION_CREATE_PROJECT,
  MUTATION_UPDATE_PROJECT
} from 'graphql/mutations/project'
import { Session } from 'next-auth'
import { Project, ProjectUserRoleType } from 'templates/Projects'
import { data } from 'msw/lib/types/context'
import { QueryProjectUserRolesByUserAndProject } from 'graphql/generated/QueryProjectUserRolesByUserAndProject'
import { QUERY_PROJECT_USER_ROLE_BY_USER_AND_PROJECT } from 'graphql/queries/projectUserRole'

export type FormProjectProps = {
  nameProject?: string
  closeModal: () => void
  usersOptions: MultiValue<OptionType>
  option?: 'create' | 'edit'
  user: User
  session: Session
  scrumMastersReceived: SelectValue
  productOwnersReceived: SelectValue
  membersReceived: SelectValue
  projectUserRoleTables: ProjectUserRoleType[]
  setProjects: React.Dispatch<React.SetStateAction<ProjectUserRoleType[]>>
  setQuantityProjectsPage: (quantity: number) => void
  editProjectId?: string | null
  activeProjectId: string
  setActiveProjectSideBar: (project: Project | null) => void
}

export type SelectValue = MultiValue<{
  label: string
  value: string
}>

const FormProject = ({
  nameProject,
  closeModal,
  usersOptions,
  option = 'create',
  user,
  session,
  scrumMastersReceived,
  productOwnersReceived,
  membersReceived,
  projectUserRoleTables,
  setProjects,
  setQuantityProjectsPage,
  editProjectId,
  activeProjectId,
  setActiveProjectSideBar
}: FormProjectProps) => {
  const [scrumMasters, setScrumMasters] =
    useState<SelectValue>(scrumMastersReceived)
  const [productOwners, setProductOwners] = useState<SelectValue>(
    productOwnersReceived
  )
  const [members, setMembers] = useState<SelectValue>(membersReceived)
  const [users, setUsers] = useState<MultiValue<OptionType>>(usersOptions)
  const [name, setName] = useState<string>(nameProject ? nameProject : '')

  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [firstForm, setFirstForm] = useState(option == 'create' ? true : false)

  useEffect(() => {
    let usersNew = []
    usersNew = usersOptions.filter((u) => {
      if (
        !scrumMasters.find((e) => e.value == u.value) &&
        !productOwners.find((e) => e.value == u.value) &&
        !members.find((e) => e.value == u.value)
      ) {
        return u
      }
    })

    setUsers(usersNew)
  }, [scrumMasters, productOwners, members, usersOptions])

  const handleInput = (value: string) => {
    setName(value)
  }

  const [createProjectGraphQL, { error, loading }] = useMutation(
    MUTATION_CREATE_PROJECT,
    {
      context: { session },
      onError: (err) => {
        err?.graphQLErrors[0]?.message == 'This attribute must be unique'
          ? setFormError('Nome do projeto já existente')
          : setFormError(err?.graphQLErrors[0]?.message)
      }
    }
  )

  const [createProjectUserRoleGraphQL] = useMutation(
    MUTATION_CREATE_PROJECT_USER_ROLE,
    {
      context: { session },
      onError: (err) => {
        setFormError(err?.graphQLErrors[0]?.message)
      }
    }
  )

  const createProject = async () => {
    if (
      scrumMasters.length == 0 &&
      productOwners.length == 0 &&
      members.length == 0
    ) {
      setFormError(
        'O projeto precisa ter pelo menos um integrante para ser criado'
      )
      return
    }
    if (
      !scrumMasters.find((e) => e.value == user.id) &&
      !productOwners.find((e) => e.value == user.id) &&
      user.type != 'admin'
    ) {
      setFormError(
        'O usuário criador do projeto precisa ter papel de Scrum Master ou Product Owner'
      )
      return
    }
    setFormError('')
    const errors = createProjectValidate(name)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      return
    }
    setFieldError({})

    const { data: project, errors: errorsCreateProject } =
      await createProjectGraphQL({
        variables: {
          nameProject: name
        }
      })

    if (errorsCreateProject) {
      return
    }
    scrumMasters.map(async (u) => {
      if (u.value == user.id) {
        const { data: dataUser } = await createProjectUserRoleGraphQL({
          variables: {
            role: 'scrumMaster',
            userId: u.value,
            projectId: project.createProject.data.id
          }
        })
        projectUserRoleTables = projectUserRoleTables.concat([
          {
            id: dataUser.createProjectUserRole.data.id,
            project: { id: project.createProject.data.id, name: name },
            role: 'scrumMaster'
          }
        ])
        setProjects(projectUserRoleTables)
        setQuantityProjectsPage(projectUserRoleTables.length)
      } else {
        createProjectUserRoleGraphQL({
          variables: {
            role: 'scrumMaster',
            userId: u.value,
            projectId: project.createProject.data.id
          }
        })
      }
    })

    productOwners.map(async (u) => {
      if (u.value == user.id) {
        const { data: dataUser } = await createProjectUserRoleGraphQL({
          variables: {
            role: 'scrumMaster',
            userId: u.value,
            projectId: project.createProject.data.id
          }
        })
        projectUserRoleTables = projectUserRoleTables.concat([
          {
            id: dataUser.createProjectUserRole.data.id,
            project: { id: project.createProject.data.id, name: name },
            role: 'productOwner'
          }
        ])
        setProjects(projectUserRoleTables)
        setQuantityProjectsPage(projectUserRoleTables.length)
      } else {
        createProjectUserRoleGraphQL({
          variables: {
            role: 'productOwner',
            userId: u.value,
            projectId: project.createProject.data.id
          }
        })
      }
    })

    members.map((u) => {
      createProjectUserRoleGraphQL({
        variables: {
          role: 'member',
          userId: u.value,
          projectId: project.createProject.data.id
        }
      })
    })

    closeModal()
  }

  const [deleteProjectUserRoleGraphQL] = useMutation(
    MUTATION_DELETE_PROJECT_USER_ROLE,
    {
      context: { session },
      onError: (err) => {
        setFormError(err?.graphQLErrors[0]?.message)
      }
    }
  )

  const [editProjectUserRoleGraphQL] = useMutation(
    MUTATION_UPDATE_PROJECT_USER_ROLE,
    {
      context: { session },
      onError: (err) => {
        setFormError(err?.graphQLErrors[0]?.message)
      }
    }
  )

  const [getProjectUserRoleGraphQL] =
    useLazyQuery<QueryProjectUserRolesByUserAndProject>(
      QUERY_PROJECT_USER_ROLE_BY_USER_AND_PROJECT,
      {
        context: { session }
      }
    )

  const [editProjectGraphQL] = useMutation(MUTATION_UPDATE_PROJECT, {
    context: { session },
    onError: (err) => {
      err?.graphQLErrors[0]?.message == 'This attribute must be unique'
        ? setFormError('Nome do projeto já existente')
        : setFormError(err?.graphQLErrors[0]?.message)
    }
  })

  const editProject = async () => {
    if (
      scrumMasters.length == 0 &&
      productOwners.length == 0 &&
      members.length == 0
    ) {
      setFormError(
        'O projeto precisa ter pelo menos um integrante para ser editado'
      )
      return
    }
    if (
      !scrumMasters.find((e) => e.value == user.id) &&
      !productOwners.find((e) => e.value == user.id) &&
      user.type != 'admin'
    ) {
      setFormError(
        'O usuário editor do projeto precisa ter papel de Scrum Master ou Product Owner'
      )
      return
    }
    const errors = createProjectValidate(name)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      return
    }
    setFieldError({})

    const { errors: errorsEditProject } = await editProjectGraphQL({
      variables: {
        id: editProjectId,
        nameProject: name
      }
    })

    if (errorsEditProject) {
      return
    }

    const newUsersArray = scrumMasters.concat(productOwners).concat(members)

    newUsersArray.map(async (u) => {
      const role = scrumMasters.find(
        (element) => element.label == u.label && element.value == u.value
      )
        ? 'scrumMaster'
        : productOwners.find(
            (element) => element.label == u.label && element.value == u.value
          )
        ? 'productOwner'
        : 'member'

      if (
        scrumMastersReceived.find(
          (element) => element.label == u.label && element.value == u.value
        ) ||
        productOwnersReceived.find(
          (element) => element.label == u.label && element.value == u.value
        ) ||
        membersReceived.find(
          (element) => element.label == u.label && element.value == u.value
        )
      ) {
        const { data: projectUserRole } = await getProjectUserRoleGraphQL({
          variables: {
            userId: u.value,
            projectId: editProjectId
          },
          fetchPolicy: 'no-cache'
        })
        editProjectUserRoleGraphQL({
          variables: {
            role: role,
            userId: u.value,
            projectId: editProjectId,
            projectUserRoleId: projectUserRole?.projectUserRoles?.data[0].id
          }
        })
      } else {
        createProjectUserRoleGraphQL({
          variables: {
            role: role,
            userId: u.value,
            projectId: editProjectId
          }
        })
      }
    })

    const oldUsersArray = scrumMastersReceived
      .concat(productOwnersReceived)
      .concat(membersReceived)

    oldUsersArray.map(async (u) => {
      if (
        !scrumMasters.find(
          (element) => element.label == u.label && element.value == u.value
        ) &&
        !productOwners.find(
          (element) => element.label == u.label && element.value == u.value
        ) &&
        !members.find(
          (element) => element.label == u.label && element.value == u.value
        )
      ) {
        const { data } = await getProjectUserRoleGraphQL({
          variables: {
            userId: u.value,
            projectId: editProjectId
          },
          fetchPolicy: 'no-cache'
        })
        deleteProjectUserRoleGraphQL({
          variables: {
            id: data?.projectUserRoles?.data[0].id
          }
        })
      }
    })

    projectUserRoleTables.map((p) => {
      if (p.project.id == editProjectId) {
        p.role = scrumMasters.find(
          (element) => element.label == user.name && element.value == user.id
        )
          ? 'scrumMaster'
          : productOwners.find(
              (element) =>
                element.label == user.name && element.value == user.id
            )
          ? 'productOwner'
          : 'member'
        p.project.name = name
      }
    })
    setProjects(projectUserRoleTables)
    if (activeProjectId == editProjectId) {
      setActiveProjectSideBar({ id: editProjectId || '', name: name })
    }
    closeModal()
  }

  const handleFirstForm = (value: any) => {
    setFirstForm(false)
    switch (value.value) {
      case 'scrumMaster': {
        setScrumMasters([{ label: user.name, value: user.id }])
        return
      }
      case 'productOwner': {
        setProductOwners([{ label: user.name, value: user.id }])
        return
      }
    }
  }

  const setDataScrumMaster = (value: MultiValue<OptionType>) => {
    setScrumMasters(
      value.map((user) => {
        return {
          label: `${user.label}`,
          value: `${user.value}`
        }
      })
    )
  }

  const setDataProductOwner = (value: MultiValue<OptionType>) => {
    setProductOwners(
      value.map((user) => {
        return {
          label: `${user.label}`,
          value: `${user.value}`
        }
      })
    )
  }

  const setDataMembers = (value: MultiValue<OptionType>) => {
    setMembers(
      value.map((user) => {
        return {
          label: `${user.label}`,
          value: `${user.value}`
        }
      })
    )
  }

  return (
    <>
      {firstForm && option == 'create' && (
        <Container>
          <S.Heading>
            <Heading lineBottom color="black" size="small">
              Detalhes do projeto
            </Heading>
          </S.Heading>
          <S.ContentFirstForm>
            <S.Select>
              <SelectChips
                isMulti={false}
                label="Selecione o seu papel no projeto"
                setData={handleFirstForm}
                defaultValues={[]}
                options={[
                  { label: 'Scrum Master', value: 'scrumMaster' },
                  { label: 'Product Owner', value: 'productOwner' }
                ]}
                placeholder="Selecione o seu papel no projeto"
              />
            </S.Select>
          </S.ContentFirstForm>
          <S.ButtonContainerFirstForm>
            <Button
              minimal
              size="small"
              style={{ marginBottom: '10px' }}
              onClick={closeModal}
            >
              Cancelar
            </Button>
          </S.ButtonContainerFirstForm>
        </Container>
      )}
      {!firstForm && (
        <Container>
          <S.Heading>
            <Heading lineBottom color="black" size="small">
              Detalhes do projeto
            </Heading>
          </S.Heading>

          {!!formError && (
            <FormError>
              <ErrorOutline /> {formError}
            </FormError>
          )}
          <S.Content>
            <TextField
              name="name"
              icon={<NewLabel />}
              placeholder="Nome do projeto"
              label="Nome do projeto"
              initialValue={name}
              error={fieldError?.name}
              onInputChange={(v) => handleInput(v)}
              style={{ height: '30px' }}
            />
            <S.Select>
              <SelectChips
                label="Scrum Master"
                setData={setDataScrumMaster}
                defaultValues={scrumMasters}
                options={users}
                maxMenuHeight={250}
                placeholder="Selecione um Scrum Master para o projeto"
              />
              <SelectChips
                label="Product Owner"
                setData={setDataProductOwner}
                defaultValues={productOwners}
                options={users}
                maxMenuHeight={160}
                placeholder="Selecione um Product Owner para o projeto"
              />
              <SelectChips
                label="Membro"
                setData={setDataMembers}
                defaultValues={members}
                options={users}
                placeholder="Selecione um Membro para o projeto"
              />
            </S.Select>
            <S.ButtonContainer>
              <Button
                minimal
                size="small"
                style={{ marginBottom: '10px' }}
                onClick={closeModal}
              >
                Cancelar
              </Button>
              <Button
                size="small"
                style={{ marginBottom: '10px' }}
                onClick={option == 'create' ? createProject : editProject}
              >
                {option == 'create' ? 'Criar projeto' : 'Editar projeto'}
              </Button>
            </S.ButtonContainer>
          </S.Content>
        </Container>
      )}
    </>
  )
}

export default FormProject
