import styles from '@/styles/components/Layout.module.css'

import { useSignOut } from '@nhost/nextjs'
import React, { FC, Fragment } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { useUserContext } from '@/providers/user-provider'
import logo from '@/assets/images/logo.svg'
import { CaretDown, HouseSimple, SignOut, User } from 'phosphor-react'
import { Avatar } from '@cookies-ui/react'

export interface LayoutProps {
  children?: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ children = null }) => {
  const { user } = useUserContext()
  const { signOut } = useSignOut()

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/',
      icon: HouseSimple,
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: User,
    },
    {
      label: 'Logout',
      onClick: signOut,
      icon: SignOut,
    },
  ]

  return (
    <div>
      <header className={styles.header}>
        <div className={styles['header-container']}>
          <div className={styles['logo-wrapper']}>
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>

          <Menu as="div" className={styles.menu}>
            <Menu.Button className={styles['menu-button']}>
              <Avatar
                src={user?.avatarUrl}
                size="small"
                referrerPolicy="no-referrer"
                alt={user?.displayName}
              />
              <CaretDown />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter={styles['menu-transition-enter']}
              enterFrom={styles['menu-transition-enter-from']}
              enterTo={styles['menu-transition-enter-to']}
              leave={styles['menu-transition-leave']}
              leaveFrom={styles['menu-transition-leave-from']}
              leaveTo={styles['menu-transition-leave-to']}
            >
              <Menu.Items className={styles['menu-items-container']}>
                <div className={styles['menu-header']}>
                  <Avatar
                    src={user?.avatarUrl}
                    size="small"
                    alt={user?.displayName}
                  />
                  <div className={styles['user-details']}>
                    <span>{user?.displayName}</span>
                    <span className={styles['user-email']}>{user?.email}</span>
                  </div>
                </div>

                <div className={styles['menu-items']}>
                  {menuItems.map(({ label, href, onClick, icon: Icon }) => (
                    <div key={label} className={styles['menu-item']}>
                      <Menu.Item>
                        {href ? (
                          <Link href={href}>
                            <Icon />
                            <span>{label}</span>
                          </Link>
                        ) : (
                          <button onClick={onClick}>
                            <Icon />
                            <span>{label}</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles['main-container']}>{children}</div>
      </main>
    </div>
  )
}
