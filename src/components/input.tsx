import styles from '@/styles/components/Input.module.css'
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string
}

export const Input: FC<InputProps> = ({ label = '', ...inputProps }) => {
  return (
    <div className={styles.container}>
      {label ? <label className={styles.label}>{label}</label> : null}
      <input {...inputProps} className={styles.input} />
    </div>
  )
}
