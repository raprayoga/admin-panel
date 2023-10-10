import React, { useEffect, useState } from 'react'
import Toast from '@/components/elements/Toast'
import useToastStore from '@/store/toast'
import { createPortal } from 'react-dom'

export default function ToastFloat() {
  const [mounted, setMounted] = useState(false)
  const updateIsShow = useToastStore((state) => state.updateIsShow)
  const { isShow, type, message } = useToastStore((state) => ({
    isShow: state.isShow,
    type: state.type,
    message: state.message,
  }))

  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        updateIsShow(false)
      }, 5000)
    }
  }, [isShow, updateIsShow])

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return (
    mounted &&
    createPortal(
      <Toast onCLosed={() => updateIsShow(false)} isShow={isShow} theme={type}>
        <p>{message}</p>
      </Toast>,
      document.getElementById('floating-toast')!
    )
  )
}
