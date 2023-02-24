import styles from '@/styles/components/SignIn.module.css'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from '@/components'
import logo from '@/assets/images/logo.svg'
import { Button } from '@cookies-ui/react'

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles['logo-wrapper']}>
          <Image src={logo} alt="logo" />
        </div>

        <form onSubmit={handleOnSubmit} className={styles.form}>
          <Input
            type="email"
            label="Email address"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" size="large">
            Sign in
          </Button>
        </form>
      </div>

      <p className={styles.text}>
        No account yet?{' '}
        <Link href="/sign-up" className={styles.link}>
          Sign up
        </Link>
      </p>
    </div>
  )
}
