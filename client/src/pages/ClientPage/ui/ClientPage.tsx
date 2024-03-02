import { useParams } from 'react-router-dom'

import { useGetClientData } from '@/entities/Client'
import { EditClientDataForm } from '@/features/EditClientDataForm'
import { Loader, loaderSize } from '@/shared/ui/Loader'
import { Title, titleSize } from '@/shared/ui/Title'

import cls from './ClientPage.module.scss'

export const ClientPage = () => {
  const { id } = useParams()
  const { data: client, isLoading, refetch } = useGetClientData(id)

  const data = client || {
    id: 1,
    firstName: 'Иван',
    lastName: 'Иванов',
    middleName: 'Иванович',
    sex: 1,
    email: 'ivan@ivan.ru',
    mobilePhone: '+7(999)999-99-99',
    birthday: '2000-02-01',
    personalTrainingCount: 10,
  }

  if (isLoading) return <Loader size={loaderSize.big} />

  return (
    <div className={cls.clientPage}>
      <Title level={1} size={titleSize.xxl}>{`${data?.firstName} ${data?.middleName}`}</Title>

      <div className={cls.content}>
        <div className={cls.data}>
          <pre>{JSON.stringify(data, null, '   ')}</pre>
        </div>
        <EditClientDataForm className={cls.form} client={data} refetch={refetch} />
      </div>
    </div>
  )
}
