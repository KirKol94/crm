import { compareSync, hashSync } from 'bcrypt'
import type { Request, Response } from 'express'
import type { Result, ValidationError } from 'express-validator'
import { validationResult } from 'express-validator'

import { User } from '../db'
import type { LoginInputData, RegisterInputData } from '../types/IUser'
import { generateAccessToken } from '../utils/generateAccessToken'

type ResMsgs = MessageJSON | Result<ValidationError>

export const UserController = {
  // TODO эти данные клиент сможет получать только будучи авторизованными
  findAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.findAll()
      res.json(users)
    } catch (err) {
      res.status(400).json({ message: (err as Error).message })
    }
  },

  registerUser: async (req: Request<Empty, ResMsgs, RegisterInputData>, res: Response<ResMsgs>): Promise<void> => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json(errors)
      return
    }

    const { password } = req.body
    const hashedPassword = hashSync(password, 7)

    try {
      const [newUser, created] = await User.findOrCreate({
        where: {
          email: req.body.email,
        },
        defaults: {
          ...req.body,
          password: hashedPassword,
        },
      })
      if (!created) {
        throw new Error('Пользователь с таким email уже существует')
      }
      res.status(201).json({ message: `Пользователь с логином ${newUser.email} создан` })
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  },

  loginUser: async (req: Request<Empty, ResMsgs, LoginInputData>, res: Response<ResMsgs>) => {
    const errors = validationResult(req)
    const { email, password } = req.body
    if (!errors.isEmpty()) {
      res.status(400).json(errors)
      return
    }

    try {
      const foundedUser = await User.findOne({
        where: {
          email,
        },
      })

      const validatedPassword = foundedUser && compareSync(password, foundedUser.password)

      const token = foundedUser?.id && generateAccessToken({ id: foundedUser.id, email: foundedUser.email })

      if (!validatedPassword) {
        res.status(400).json({ message: 'Email или пароль не верно' })
        return
      }

      res.json({ message: token ? token : 'ошибка авторизации' })
    } catch (err) {
      res.json({ message: (err as Error).message })
    }
  },
}
