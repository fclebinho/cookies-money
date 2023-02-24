import { Box, styled } from '@cookies-ui/react'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  height: '100vh',
})

export const Content = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  width: 360,
  gap: '$4',
  margin: 'auto',
  padding: '$8',
})

export const Logo = styled('div', {
  margin: '$12',
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  '> button': { marginTop: '$2' },
})

export const FormField = styled('label', {
  display: 'flex',
  flexDirection: 'column',
})

export const FormActions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '$6',

  '> p': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const SignUpContainer = styled('div', {
  '> p': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '$2',
    color: '$gray400',

    '> a': {
      padding: 0,
      margin: '0 $1',
      color: '$gray200',

      '&:not(:disabled):hover': {
        color: '$gray400',
      },
    },
  },
})
