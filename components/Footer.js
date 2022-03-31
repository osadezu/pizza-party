import useUser from '../lib/useUser';

export default function Footer() {
  const { user } = useUser();

  if (user?.isLoggedIn) {
    return null;
  }

  return (
    <div id='footer-wrapper'>
      <span>PizzaParty is completely gluten free</span>
      <span>-</span>
      <a
        href='https://github.com/osadezu/pizza-party'
        target='_blank'
        rel='noopener noreferrer'>
        Visit GitHub Repo
      </a>
    </div>
  );
}
