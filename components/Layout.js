import Navigation from './Navigation';
import Header from './Header';

function Layout({ children }) {
  return (
    <div id='app-wrapper'>
      <Header />
      <main>{children}</main>
      <Navigation />
    </div>
  );
}

export default Layout;
