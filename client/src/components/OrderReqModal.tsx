/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useState, useEffect, useMemo, useContext, useRef } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { debounce } from 'lodash'
import { handleOrderRequest } from '@/services/socket/handlers'
import { SocketContext } from '@/context/providers/socket.provider'
import { type OrderRequest } from '@/interfaces'
import { useRouter } from 'next/navigation'
import { Routes } from '@/utils/constants/routes.const'

const OrderReqModal: React.FunctionComponent = () => {
  const router = useRouter()
  const [remainingTime, setRemainingTime] = useState(30)
  const [asking, setAsking] = useState(false)
  const [reqOrder, setReqOrder] = useState<OrderRequest | null>(null)
  const callbackRef = useRef<(accepted: boolean) => void>()
  const intervalRef = useRef<NodeJS.Timeout>()
  const { isOpen, onOpenChange, onClose } = useDisclosure()
  const socket = useContext(SocketContext)

  const handleReject = (): void => {
    callbackRef.current?.(false)
    toInitialStatus()
  }

  const handleAccept = (): void => {
    callbackRef.current?.(true)
    if (reqOrder) {
      router.push(Routes.ORDER(reqOrder?.id))
    }
    toInitialStatus()
  }

  const toInitialStatus = (): void => {
    onClose()
    setAsking(false)
    setRemainingTime(30)
    setReqOrder(null)
    callbackRef.current = undefined
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
      debounce((data: OrderRequest, callback: (accepted: boolean) => void) => {
        handleInterval()
        callbackRef.current = callback
        setAsking(true)
        setReqOrder(data)
        onOpenChange()
      }, 2000),
    []
  )

  useEffect(() => {
    handleOrderRequest(socket, incomingOrder)
  }, [socket])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton isDismissable={false} placement='center'>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Pedido Entrante</ModalHeader>
        <ModalBody>
          <div className='flex flex-col gap-1'>
            <p className='text-sm'>Cliente: {reqOrder?.clientName}</p>
            <p className='text-sm'>Tienda: {reqOrder?.shop}</p>
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
