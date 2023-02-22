import styles from '../styles/pages/Home.module.css'

import { useUserContext } from '@/providers/user-provider'
import Head from 'next/head'
import { EntryForm, Layout, ListEntries } from '@/components'
import withAuth from '@/hooks/with-auth'

const Home = () => {
  const { user } = useUserContext()

  return (
    <Layout>
      <Head>
        <title>Dashboard - Nhost</title>
      </Head>

      <div>
        <h2 className={styles.title}>Dashboard</h2>

        <p className={styles['welcome-text']}>
          Welcome, {user?.metadata?.firstName || 'stranger'}{' '}
          <span role="img">👋</span>
        </p>

        <p className={styles['info-text']}>
          Edit the <code>pages/index.js</code> file to populate this page.
        </p>
      </div>
      <ListEntries />
      <EntryForm />
    </Layout>
  )
}

export default withAuth(Home)
