'use client'
import { useRef, type FunctionComponent, useEffect, useState } from 'react'
import { type Product } from '@/interfaces'
import { ProductItem } from '..'
import { calculateColumnQuantity } from '@/utils/calculateColumnQuantity.utils'

interface Props {
  products: Product[]
  className?: string
  isOneRow?: boolean
}

const ProductGrid: FunctionComponent<Props> = ({ products, className, isOneRow = false }) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [columnQuantity, setColumnQuantity] = useState(0)

  useEffect(() => {
    if (document && divRef?.current?.clientWidth) {
      const q = calculateColumnQuantity(divRef.current.clientWidth, 16, 200)
      setColumnQuantity(q)
    }
  }, [divRef.current?.clientWidth])

  return (
    <div
      className={`m grid w-full grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] ${className} `}
      ref={divRef}
    >
      {(isOneRow ? products.slice(0, columnQuantity) : products).map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
