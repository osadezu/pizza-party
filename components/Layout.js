import Navigation from './Navigation';
import Header from './Header';

function Layout({ children }) {
  return (
    <div className='w-screen h-screen relative'>
      <Header />
      <main className='h-full'>{children}</main>
      <Navigation />
    </div>
  );
}

export default Layout;
