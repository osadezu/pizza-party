import Navigation from './Navigation';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div id='app-wrapper'>
      <Header />
      <main>{children}</main>
      <Footer />
      <Navigation />
    </div>
  );
}
