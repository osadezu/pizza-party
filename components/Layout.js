import Navigation from './Navigation';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div id='app-wrapper'>
      <Header />
      <main>{children}</main>
      <Navigation />
    </div>
  );
}
