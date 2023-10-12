import { ToastSliceState } from './toast'
import { UsersSliceState } from './users'
import { UserSliceState } from './user'
import { ProfileSliceState } from './profile'
import { RolesSliceState } from './roles'

export interface sliceState {
  toast: ToastSliceState
  users: UsersSliceState
  user: UserSliceState
  profile: ProfileSliceState
  roles: RolesSliceState
}
