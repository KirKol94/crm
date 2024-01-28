import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { getIsAuth, userActions } from '@/entities/User'
import { AuthType } from '@/features/AuthForm'
import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { Loader } from '@/shared/ui/Loader'

import '../styles/index.scss'

const AuthPage = lazy(() => import('@/pages/AuthPage'))
const Layout = lazy(() => import('@/widgets/Layout'))

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))

export const App = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useAppSelector(getIsAuth)

  useEffect(() => {
    dispatch(userActions.initAuthData())

    if (isAuth) {
      navigate(ROUTER_PATH.HOME)
    }
  }, [dispatch, isAuth, navigate])

  return (
    <Routes>
      <Route
        path={ROUTER_PATH.HOME}
        element={
          <Suspense fallback={<Loader />}>
            <Layout />
          </Suspense>
        }
      >
        <Route index path={ROUTER_PATH.HOME} element={<Suspense fallback={<Loader />}>{<ProfilePage />}</Suspense>} />
        <Route path={ROUTER_PATH.USERS} element={<Suspense fallback={<Loader />}>{<>userpage</>}</Suspense>} />
      </Route>

      <Route
        path={ROUTER_PATH.LOGIN}
        element={
          <Suspense fallback={<Loader />}>
            <AuthPage type={AuthType.LOGIN} />
          </Suspense>
        }
      />
      <Route
        path={ROUTER_PATH.REGISTER}
        element={
          <Suspense fallback={<Loader />}>
            <AuthPage type={AuthType.REGISTER} />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
