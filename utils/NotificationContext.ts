import React, {ReactNode} from 'react';

const NotificationContext = React.createContext({
  displayNotification: (title: string, subtitle: string, icon: ReactNode) => {},
});

export default NotificationContext;
