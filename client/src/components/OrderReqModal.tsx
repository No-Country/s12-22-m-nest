/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useState, useEffect, useMemo, useContext, useRef } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { debounce } from 'lodash'
import { handleOrder } from '@/services/socket/handlers'
import { SocketContext } from '@/context/providers/socket.provider'
import { type OrderInterface } from '@/interfaces'
import { useRouter } from 'next/navigation'
import { routes } from '@/utils/constants/routes.const'
import { toast } from 'sonner'
import { Howl } from 'howler'
import { clientUrl } from '@/utils/constants/env.const'

const OrderReqModal: React.FunctionComponent = () => {
  const router = useRouter()
  const [remainingTime, setRemainingTime] = useState(30)
  const [asking, setAsking] = useState(false)
  const [reqOrder, setReqOrder] = useState<OrderInterface | null>(null)
  const callbackRef = useRef<(accepted: boolean) => void>()
  const intervalRef = useRef<NodeJS.Timeout>()
  const { isOpen, onOpenChange, onClose } = useDisclosure()
  const socket = useContext(SocketContext)
  const soundRef = useRef<Howl>()

  const handleReject = (): void => {
    callbackRef.current?.(false)
    toInitialStatus()
  }

  const handleAccept = (): void => {
    callbackRef.current?.(true)
    toast('Procesando...')
    if (reqOrder) {
      setTimeout(() => {
        router.push(routes.dealer.ORDER(reqOrder?.id))
      }, 1500)
    }
    toInitialStatus()
  }

  const toInitialStatus = (): void => {
    onClose()
    setAsking(false)
    setRemainingTime(30)
    setReqOrder(null)
    callbackRef.current = undefined
    soundRef?.current?.stop()
    soundRef?.current?.unload()
    clearInterval(intervalRef.current)
  }

  const handleInterval = (): (() => void) | undefined => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        console.log('remainingTime', prev - 1)

        if (prev <= 1) {
          console.log('handleInterval', asking)
          handleReject()
          clearInterval(interval)
        }

        return prev - 1
      })
    }, 1000)

    intervalRef.current = interval

    return () => {
      clearInterval(interval)
    }
  }

  const incomingOrder = useMemo(
    () =>
      debounce((data: OrderInterface, callback: (accepted: boolean) => void) => {
        console.log('incomingOrder', clientUrl + '/sound/incomingOrder.mp3')
        soundRef?.current?.load()
        soundRef?.current?.play()
        handleInterval()
        callbackRef.current = callback
        setAsking(true)
        setReqOrder(data)
        onOpenChange()
      }, 2000),
    []
  )

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    // Evita la acción predeterminada cuando se presiona la tecla "Play"
    if (event.key === 'Play') {
      event.preventDefault()
    }
  }

  useEffect(() => {
    const sound = new Howl({
      src: [clientUrl + '/sound/incomingOrder.mp3'],
      loop: true,
      html5: true
    })

    sound.unload()

    soundRef.current = sound

    handleOrder(socket, incomingOrder)

    return () => {
      sound.unload()
    }
  }, [socket])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      isDismissable={false}
      placement='center'
      onKeyDown={handleKeyDown}
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Pedido Entrante</ModalHeader>
        <ModalBody>
          <div className='flex flex-col gap-1'>
            <p className='text-sm'>Cliente: {reqOrder?.client.firstName + ' ' + reqOrder?.client.lastName}</p>
            <p className='text-sm'>Tienda: {reqOrder?.shop?.name}</p>
            <p className='text-sm'>Distancia: {reqOrder?.distance}km</p>
          </div>
        </ModalBody>
        <ModalFooter className='flex items-center justify-between'>
          <p className='text-sm'>{remainingTime}s</p>
          <div className='flex gap-2'>
            <Button color='danger' variant='flat' onPress={handleReject}>
              Rechazar
            </Button>
            <Button
              color='primary'
              onPress={() => {
                handleAccept()
              }}
            >
              Aceptar
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OrderReqModal
