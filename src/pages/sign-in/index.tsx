import styles from '@/styles/components/SignIn.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useSignInEmailPassword, useNhostClient } from '@nhost/nextjs'
import { Spinner } from '@/components'
import { Button, Text, TextInput } from '@cookies-ui/react'
import {
  Container,
  Content,
  Form,
  FormActions,
  FormField,
  SignUpContainer,
} from './styles'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()
  const { auth } = useNhostClient()
  const { t } = useTranslation('common')

  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword()

  const handleOnSubmit = async (e: any) => {
    e.preventDefault()
    await signInEmailPassword(email, password)
  }

  if (isSuccess) {
    router.push('/')
    return null
  }

  const disableForm = isLoading || needsEmailVerification

  const handleGoogle = () => auth.signIn({ provider: 'google' })

  return (
    <>
      {needsEmailVerification ? (
        <p className={styles['verification-text']}>
          Please check your mailbox and follow the verification link to verify
          your email.
        </p>
      ) : (
        <Container>
          <Content>
            <Form onSubmit={handleOnSubmit}>
              <FormField>
                <Text size="sm">{t('email')}</Text>
                <TextInput
                  type="email"
                  placeholder={t('type_your_email') ?? ''}
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  disabled={disableForm}
                  required
                />
              </FormField>

              <FormField>
                <Text size="sm">{t('password')}</Text>
                <TextInput
                  type="password"
                  placeholder={t('type_your_password') ?? ''}
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  disabled={disableForm}
                  required
                />
              </FormField>

              <Button type="submit" disabled={disableForm}>
                {isLoading ? <Spinner size="sm" /> : t('sign_in')}
              </Button>

              {isError ? (
                <p className={styles['error-text']}>{error?.message}</p>
              ) : null}
            </Form>

            <FormActions>
              <Button type="button" color="danger" onClick={handleGoogle}>
                Login with Google Account
              </Button>

              <SignUpContainer>
                <Text size="sm">
                  {t('no_account_yet')}
                  <Button variant="text" as="a" href="/sign-up">
                    {t('sign_up')}
                  </Button>
                </Text>
              </SignUpContainer>
            </FormActions>
          </Content>
        </Container>
      )}
    </>
  )
}

export default SignIn

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}
