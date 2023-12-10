import { type FunctionComponent } from 'react'

interface Props {
  fillColor: string
  width?: number
  height?: number
}

const ChatIcon: FunctionComponent<Props> = ({ fillColor, width = 24, height = 24 }) => (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
      <circle cx='12' cy='12' r='1' fill={fillColor} />
      <circle cx='16' cy='12' r='1' fill={fillColor} />
      <circle cx='8' cy='12' r='1' fill={fillColor}/>
      <path
      fill={fillColor}
      d='M19.07 4.93a10 10 0 0 0-16.28 11a1.06 1.06 0 0 1 .09.64L2 20.8a1 1 0 0 0 .27.91A1 1 0 0 0 3 22h.2l4.28-.86a1.26 1.26 0 0 1 .64.09a10 10 0 0 0 11-16.28Zm.83 8.36a8 8 0 0 1-11 6.08a3.26 3.26 0 0 0-1.25-.26a3.43 3.43 0 0 0-.56.05l-2.82.57l.57-2.82a3.09 3.09 0 0 0-.21-1.81a8 8 0 0 1 6.08-11a8 8 0 0 1 9.19 9.19Z'
      />
    </svg>
)

export default ChatIcon
