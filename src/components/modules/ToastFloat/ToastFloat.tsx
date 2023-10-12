import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideToast } from '@/store/toast'
import { Dispatch } from '@reduxjs/toolkit'
import { sliceState } from '@/interface/state'
import Toast from '@/components/elements/Toast'

export default function ToastFloat() {
  const dispatch: Dispatch<any> = useDispatch()
  const toast = useSelector((state: sliceState) => state.toast)

  useEffect(() => {
    if (toast.isShow) {
      setTimeout(() => {
        dispatch(hideToast())
      }, 3000)
    }
  }, [dispatch, toast.isShow])

  return (
    <Toast
      onCLosed={() => dispatch(hideToast())}
      isShow={toast.isShow}
      theme={toast.type}
    >
      <p>{toast.message}</p>
    </Toast>
  )
}
