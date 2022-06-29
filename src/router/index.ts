import React from "react";
import Login from '../pages/Login';
import Registration from "../pages/Registration";

export interface IRoute {
  path: string
  exact: boolean
  component: React.ComponentType
}

export enum RouteName {
  LOGIN = '/',
  REGISTRATION = '/registration',
  VERIFICATION = '/verification'
}

export const publicRoutes: IRoute[] = [
  {path: RouteName.LOGIN, component: Login, exact: true},
  {path: RouteName.REGISTRATION, component: Registration, exact: true},
]

export const privateRoutes: IRoute[] = [

]