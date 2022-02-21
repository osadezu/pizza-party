import Navigation from './Navigation';
import Header from './Header';

// export const UserContext = createContext();

export default function Layout({ children }) {
  // const { user, mutateUser } = useUser({ redirectTo: '/?login' });

  return (
    <div id='app-wrapper'>
      <Header />
      <main>{children}</main>
      <Navigation />
    </div>
  );
}
