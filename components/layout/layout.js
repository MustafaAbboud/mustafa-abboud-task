import { Fragment } from 'react';

import MainNavigation from './main-navigation';

//wraps the app with a navbar
function Layout(props) {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
