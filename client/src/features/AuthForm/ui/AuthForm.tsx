import { ChangeEvent, FormEvent, useState } from "react";

import { authFormActions } from "@/features/AuthForm";
import { ROUTER_PATH } from "@/shared/const/path/PATH";
import { useAppDispatch } from "@/shared/hooks";
import { AppLink, AppLinkSize } from "@/shared/ui/AppLink";
import { Button, ButtonSize } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Text, TextSize } from "@/shared/ui/Text";
import { Title, TitleSize } from "@/shared/ui/Title";

import { AuthFormType } from "../types/types";
import { UserData } from "../types/types";

import classes from "./AuthForm.module.scss";

interface AuthFormProps {
  type: AuthFormType;
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    name: "",
    surname: "",
    patronymic: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(authFormActions.setAuthData(userData));
  };

  return (
    <>
      <Title size={TitleSize.XXL} className={classes.title}>
        {type === AuthFormType.LOGIN && "Авторизация"}
        {type === AuthFormType.REGISTER && "Регистрация"}
      </Title>

      <form className={classes.form} onSubmit={handleSubmit}>
        <Input
          inputName="Email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={userData.email}
        />
        <Input
          inputName="Пароль"
          name="password"
          placeholder="Пароль"
          onChange={handleInputChange}
          value={userData.password}
        />

        {type === AuthFormType.REGISTER && (
          <>
            <Input
              inputName="Имя"
              name="name"
              placeholder="Имя"
              onChange={handleInputChange}
              value={userData.name}
            />
            <Input
              inputName="Фамилия"
              name="surname"
              placeholder="Фамилия"
              onChange={handleInputChange}
              value={userData.surname}
            />
            <Input
              inputName="Отчество"
              name="patronymic"
              placeholder="Отчество"
              onChange={handleInputChange}
              value={userData.patronymic}
            />
          </>
        )}

        <div className={classes.footer}>
          <Button size={ButtonSize.M} type="submit">
            {type === AuthFormType.LOGIN && "Войти"}
            {type === AuthFormType.REGISTER && "Регистрация"}
          </Button>

          <div>
            <Text size={TextSize.S}>
              {type === AuthFormType.LOGIN && "Еще нет аккаунта?"}
              {type === AuthFormType.REGISTER && "Уже нет аккаунт?"}
            </Text>

            <AppLink
              to={
                type === AuthFormType.LOGIN
                  ? ROUTER_PATH.REGISTER
                  : ROUTER_PATH.LOGIN
              }
              size={AppLinkSize.S}
            >
              {type === AuthFormType.REGISTER && "Войти"}
              {type === AuthFormType.LOGIN && "Регистрация"}
            </AppLink>
          </div>
        </div>
      </form>
    </>
  );
};