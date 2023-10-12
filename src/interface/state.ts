import { ToastSliceState } from './toast'
import { UsersSliceState } from './users'
import { UserSliceState } from './user'
import { ProfileSliceState } from './profile'
import { RolesSliceState } from './roles'
import { CategoriesSliceState } from './categories'
import { ArticlesSliceState } from './articles'
import { ArticleSliceState } from './article'

export interface sliceState {
  toast: ToastSliceState
  users: UsersSliceState
  user: UserSliceState
  profile: ProfileSliceState
  roles: RolesSliceState
  categories: CategoriesSliceState
  articles: ArticlesSliceState
  article: ArticleSliceState
}
