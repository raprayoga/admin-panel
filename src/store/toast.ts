import { create } from 'zustand'
import { State } from '@/interface/toast'

export interface ToastState extends State {}

type Action = {
  updateIsShow: (isShow: State['isShow']) => void
  showToast: ({ isShow, type, message }: ToastState) => void
}

// Create your store, which includes both state and (optionally) actions
const useToastStore = create<State & Action>((set) => ({
  isShow: false,
  type: 'white',
  message: '',
  updateIsShow: (isShow) => set(() => ({ isShow: isShow })),
  showToast: ({ isShow, type, message }) =>
    set(() => ({
      isShow: isShow,
      type: type,
      message: message,
    })),
}))

export default useToastStore
