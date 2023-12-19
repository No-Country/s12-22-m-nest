import { type FunctionComponent } from 'react'

interface Props {
  fillColor: string
  width?: number
  height?: number
}

const SendMessageIcon: FunctionComponent<Props> = ({
  fillColor,
  width = 24,
  height = 24
}) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill={fillColor}
        d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
      />
    </svg>
)

export default SendMessageIcon
