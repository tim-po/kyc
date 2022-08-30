import React from "react";
import Login from '../pages/Login';
import Registration from "../pages/Registration";
import Verification from "../pages/Verification";
import TwoFA from "../pages/TwoFA";

export interface IRoute {
  path: string
  exact: boolean
  component: React.ComponentType
}

export enum RouteName {
  LOGIN = '/',
  TWOFA = '/code',
  REGISTRATION = '/registration',
  VERIFICATION = '/verification'
}

export const publicRoutes: IRoute[] = [
  {path: RouteName.LOGIN, component: Login, exact: true},
  {path: RouteName.TWOFA, component: TwoFA, exact: true},
  {path: RouteName.REGISTRATION, component: Registration, exact: true},
]

export const privateRoutes: IRoute[] = [
  {path: RouteName.VERIFICATION, component: Verification, exact: true},
]