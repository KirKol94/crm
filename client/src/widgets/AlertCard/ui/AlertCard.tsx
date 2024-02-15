import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { Counter, CounterColor, CounterSize } from '@/shared/ui/Counter'
import { Text, TextSize } from '@/shared/ui/Text'
import { Title, TitleSize } from '@/shared/ui/Title'

import classes from './AlertCard.module.scss'

export interface AlertCardProps {
  count: number
  title: string
  alert: string
}

export const AlertCard = ({ count, title, alert }: AlertCardProps) => {
  return (
    <div className={classes['alert-card']}>
      <div className={classes.header}>
        <Counter size={CounterSize.M} count={count} color={CounterColor.WHITE} />
        <Title level={2} size={TitleSize.XL}>
          {title}
        </Title>
      </div>
      <div className={classes.footer}>
        <Button size={ButtonSize.S} theme={ButtonTheme.PRIMARY}>
          Обработать
        </Button>
        <Text size={TextSize.S}>{alert}</Text>
      </div>
    </div>
  )
}
