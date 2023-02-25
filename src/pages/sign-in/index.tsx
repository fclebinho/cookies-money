import styles from '@/styles/components/SignIn.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
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
                <Text size="sm">Email address</Text>
                <TextInput
                  type="email"
                  placeholder="Type your email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  disabled={disableForm}
                  required
                />
              </FormField>

              <FormField>
                <Text size="sm">Password</Text>
                <TextInput
                  type="password"
                  placeholder="Type your password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  disabled={disableForm}
                  required
                />
              </FormField>

              <Button type="submit" size="large" disabled={disableForm}>
                {isLoading ? <Spinner size="sm" /> : 'Sign in'}
              </Button>

              {isError ? (
                <p className={styles['error-text']}>{error?.message}</p>
              ) : null}
            </Form>

            <FormActions>
              <Button
                type="button"
                size="large"
                color="danger"
                onClick={handleGoogle}
              >
                Login with Google Account
              </Button>

              <SignUpContainer>
                <Text size="sm">
                  No account yet?
                  <Button variant="text" as="a" size="medium" href="/sign-up">
                    Sign up
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
