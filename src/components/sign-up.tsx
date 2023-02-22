import styles from '@/styles/components/SignUp.module.css'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from './input'
import logo from '@/assets/images/logo.svg'

export const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
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
          <div className={styles['input-group']}>
            <Input
              label="First name"
              value={firstName}
              onChange={(e: any) => setFirstName(e.target.value)}
              required
            />
            <Input
              label="Last name"
              value={lastName}
              onChange={(e: any) => setLastName(e.target.value)}
              required
            />
          </div>
          <Input
            type="email"
            label="Email address"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Create password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.button}>
            Create account
          </button>
        </form>
      </div>

      <p className={styles.text}>
        Already have an account?{' '}
        <Link href="/sign-in" className={styles.link}>
          Sign in
        </Link>
      </p>
    </div>
  )
}
