interface ItemNavInterface {
  label: string
  key: string
  href: string
  visible: boolean
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default' | undefined
}
