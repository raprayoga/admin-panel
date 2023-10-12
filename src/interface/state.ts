import { ToastSliceState } from './toast'
import { UsersSliceState } from './users'
import { UserSliceState } from './user'
import { ProfileSliceState } from './profile'

export interface sliceState {
  toast: ToastSliceState
  users: UsersSliceState
  user: UserSliceState
  profile: ProfileSliceState
}
