import React, { useEffect } from 'react'
import Toast from '@/components/elements/Toast'
import useToastStore from '@/store/toast'

export default function ToastFloat() {
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

  return (
    <Toast onCLosed={() => updateIsShow(false)} isShow={isShow} theme={type}>
      <p>{message}</p>
    </Toast>
  )
}
