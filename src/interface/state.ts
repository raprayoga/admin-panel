import { ToastSliceState } from './toast'
import { UsersSliceState } from './users'
import { UserSliceState } from './user'

export interface sliceState {
  toast: ToastSliceState
  users: UsersSliceState
  user: UserSliceState
}
