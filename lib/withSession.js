import { withIronSessionApiRoute } from 'iron-session/next';

// Stateless session with encrypted cookies:
// https://github.com/vvo/iron-session

const sessionOptions = {
  cookieName: 'pizzaparty_iron',
  password: process.env.IRON_SESSION_PASS,
  cookieOptions: {
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}
