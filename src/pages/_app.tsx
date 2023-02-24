import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { NhostProvider, NhostClient } from '@nhost/nextjs'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { EntriesProvider, UserProvider } from '@/providers'
import { globalStyles } from '@/styles/global'
import { theme } from '@/styles/theme'

globalStyles()

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || '',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <UserProvider>
          <EntriesProvider>
            <div className={theme}>
              <Component {...pageProps} />
            </div>
            <Toaster />
          </EntriesProvider>
        </UserProvider>
      </NhostApolloProvider>
    </NhostProvider>
  )
}
