import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getIsAuth } from '@/entities/User'
import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { useAppSelector } from '@/shared/hooks'
import { ButtonWithArrow } from '@/shared/ui/ButtonWithArrow'
import { AlertCard } from '@/widgets/AlertCard'
import { Footer } from '@/widgets/Footer'

export const HomePage = () => {
  const navigate = useNavigate()

  const isAuth = useAppSelector(getIsAuth)

  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTER_PATH.LOGIN)
    }
  }, [isAuth, navigate])

  return (
    <div>
      <AlertCard
        count={0}
        title="Контрагента ожидают в стадии “Подписание контракта”"
        alert="Подпишите контракты с контрагентами или переведите их в архивные"
      />
      <ButtonWithArrow />
      <Footer />
    </div>
  )
}
