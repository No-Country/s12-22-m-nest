import { type FunctionComponent } from 'react'
import { type Shop } from '@/interfaces'
import ShopItem from './Item'

interface Props {
  shops: Shop[]
  className?: string
}

const ShopGrid: FunctionComponent<Props> = ({ shops, className }) => (
  <>
    {shops.length <= 0 ? (
      <div className='flex w-full items-center justify-start'>
        <h1 className='text-center text-lg font-semibold'>No hay nada por aquí</h1>
      </div>
    ) : (
      <div
        className={`m grid w-full grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] ${className} `}
      >
        {shops.map((shop) => (
          <ShopItem key={shop.id} shop={shop} />
        ))}
      </div>
    )}
  </>
)

export default ShopGrid
