import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-Q100SQBYDV'); // Replace with your tracking code
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};