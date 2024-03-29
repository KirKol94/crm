import { Navigate } from 'react-router-dom'

import { getIsAuth } from '@/entities/User/model/selectors/getIsAuth'
import { AuthForm, authType } from '@/features/AuthForm'
import { CURRENT_PATHNAME_KEY } from '@/shared/const/localStorage/currentLocationKey'
import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { useAppSelector } from '@/shared/hooks'

import classes from './AuthPage.module.scss'

interface AuthPage {
  type?: keyof typeof authType
}

export const AuthPage = ({ type = authType.login }: AuthPage) => {
  const isAuth = useAppSelector(getIsAuth)
  const currentLocationPath = localStorage.getItem(CURRENT_PATHNAME_KEY)

  if (isAuth) return <Navigate to={currentLocationPath ? currentLocationPath : ROUTER_PATH.PROFILE} />

  return (
    <div className={classes.page}>
      <AuthForm type={type} />
    </div>
  )
}

export default AuthPage
