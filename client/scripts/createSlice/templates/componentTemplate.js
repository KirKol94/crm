import firstCharLowerCase from '../firstCharLowerCase.js'
import firstCharUpperCase from '../firstCharUpperCase.js'

export default (componentName) => `import { memo } from 'react'
import cx from 'classix'

import cls from './${firstCharUpperCase(componentName)}.module.scss'

interface ${firstCharUpperCase(componentName)}Props {}

export const ${firstCharUpperCase(componentName)} = memo(({}: ${firstCharUpperCase(componentName)}Props) => {
  const ${firstCharLowerCase(componentName)}Class = cx(cls.${firstCharLowerCase(componentName)})

  return <div className={${firstCharLowerCase(componentName)}Class}>${componentName}</div>
})
`
