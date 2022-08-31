import React, {useEffect, useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {privateRoutes, publicRoutes, RouteName} from './index';
import {useCookies} from "react-cookie";

const AppRouter = () => {
  const [cookies] = useCookies(['auth']);
  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    if (cookies.auth) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [cookies])

  return (
    isAuth ?
      <Switch>
        {privateRoutes.map(route =>
          <Route path={route.path}
                 exact={route.exact}
                 component={route.component}
                 key={route.path}
          />
        )}
        <Redirect to={RouteName.VERIFICATION}/>
      </Switch>
      :
      <Switch>
        {publicRoutes.map(route =>
          <Route path={route.path}
                 exact={route.exact}
                 component={route.component}
                 key={route.path}
          />
        )}
        <Redirect to={RouteName.LOGIN}/>
      </Switch>
  );
};

export default AppRouter;