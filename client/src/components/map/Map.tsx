import { type FunctionComponent } from 'react'
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(async () => await import('./_component/DinamicMap'), {
  ssr: false
})

const Map: FunctionComponent = () => (

<div className="container mx-auto">
  <DynamicMap/>
</div>

)

export default Map
