import Logo from 'components/Logo'

const WithoutProject = () => {
  return (
    <>
      <Logo color="black" />
      <h1 style={{ marginLeft: '20px' }}>
        Você precisa ter um projeto ativado para acessar essa seção
      </h1>
    </>
  )
}

export default WithoutProject
