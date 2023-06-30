import FormForgotPassword from 'components/FormForgotPassword'
import Auth from 'templates/Auth'

export default function ForgotPassword() {
  return (
    <Auth title="Solicitar nova senha">
      <FormForgotPassword />
    </Auth>
  )
}
