import styles from '@/styles/components/SignIn.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSignInEmailPassword, useNhostClient } from '@nhost/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import Input from '@/components/input'
import Spinner from '@/components/spinner'
import logo from '@/assets/images/logo.svg'

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
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles['logo-wrapper']}>
          <Image src={logo} alt="logo" />
        </div>

        {needsEmailVerification ? (
          <p className={styles['verification-text']}>
            Please check your mailbox and follow the verification link to verify
            your email.
          </p>
        ) : (
          <>
            <form onSubmit={handleOnSubmit} className={styles.form}>
              <Input
                type="email"
                label="Email address"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                disabled={disableForm}
                required
              />
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                disabled={disableForm}
                required
              />

              <button
                type="submit"
                disabled={disableForm}
                className={styles.button}
              >
                {isLoading ? <Spinner size="sm" /> : 'Sign in'}
              </button>

              {isError ? (
                <p className={styles['error-text']}>{error?.message}</p>
              ) : null}
            </form>
          </>
        )}
      </div>

      <p className={styles.text}>
        No account yet?{' '}
        <Link href="/sign-up" className={styles.link}>
          Sign up
        </Link>
      </p>

      <button type="button" onClick={handleGoogle}>
        Google
      </button>
    </div>
  )
}

export default SignIn
