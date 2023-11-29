import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  className?: string
}

const Button = ({ children, onClick, variant = 'primary', className }: ButtonProps): JSX.Element => {
  const getButtonStyle = (): string => {
    switch (variant) {
      case 'secondary':
        return styles.secondary
      default:
        return styles.primary
    }
  }

  const buttonStyle: string = getButtonStyle()

  return (
    <button className={`${styles.btn} ${buttonStyle} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export { Button }
