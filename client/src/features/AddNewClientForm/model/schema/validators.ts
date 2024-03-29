import type { CustomValidator } from 'joi'

export const PHONE_LENGTH_REGEX = /^(?=[0-9]*$)(?:.{0}|.{10})$/
const PHONE_STARTING_NUMBERS_REGEX = /^[34789]/

const getUnmaskValue = (value: string | null) => {
  if (value) {
    return value.replace(/\D/g, '')
  }
  return null
}

const getUnmaskPhone = (value: string | null) => {
  const unmaskedValue = getUnmaskValue(value)
  if (unmaskedValue) {
    return unmaskedValue.substring(1)
  }
  return null
}

/**
 * Валидация ФИО.
 */
export const validateFio: CustomValidator<string> = (value, helpers) => {
  const isLastName = helpers.state.path?.[0] === 'lastName'
  const matchPattern = isLastName ? /^[а-яА-ЯёЁ]*$/ : /^[а-яА-ЯёЁ-]*$/
  const errorMessage = isLastName ? 'Только русские буквы' : 'Только русские буквы и «-»'

  if (!value?.match(matchPattern)) {
    return helpers.message({
      custom: errorMessage,
    })
  }
  return value
}

/**
 * Валидация электронной почты.
 */
export const validateEmail: CustomValidator<string> = (value, helpers) => {
  const matchPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!value?.match(matchPattern)) {
    return helpers.message({
      custom: 'Неверный email',
    })
  }
  return value
}

/**
 * Валидация количества занятий.
 */
export const validateCount: CustomValidator<string> = (value, helpers) => {
  const matchPattern = /^\d+$/
  if (!String(value)?.match(matchPattern)) {
    return helpers.message({
      custom: 'Только цифры от 0 до 9',
    })
  }
  return value
}

/**
 * Валидация номера телефона.
 */
export const validatePhoneNumber: CustomValidator<string> = (value, helpers) => {
  const clearedValue = getUnmaskPhone(value) // номер без пробелов и +7
  const isFormatValid = `${clearedValue}`.match(PHONE_LENGTH_REGEX) // проверка длины введенного номера
  const isPhoneStartValid = `${clearedValue}`.match(PHONE_STARTING_NUMBERS_REGEX) // проверка начала введенного номера

  if (!isFormatValid)
    return helpers.message({
      custom: 'Номер должен состоять из 11 цифр',
    })

  if (!isPhoneStartValid)
    return helpers.message({
      custom: 'Номер должен начинаться с "3", "4", "7", "8" или "9"',
    })

  return value
}

export const validateDate: CustomValidator<string> = (date, helpers) => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.(19|20)\d{2}$/

  if (!regex.test(date)) {
    return helpers.message({
      custom: 'Неверный формат даты',
    })
  }

  const currentYear = new Date().getFullYear()
  const parts = date.split('.')
  const year = parseInt(parts[2], 10)

  if (year > currentYear) {
    return helpers.message({
      custom: 'Не может быть позже текущего года',
    })
  }

  return date
}
