import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Button from '../components/Button';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // check if we already have the tokens in local storage
    localStorage.getItem('accessToken') && localStorage.getItem('instanceUrl')
      && router.push('/dashboard');

    // check if the url has the access token
    if (router.asPath.includes('access_token')) {
      const accessToken = router.asPath.split('#')[1].split('&')[0].split('=')[1];
      const instance_url = router.asPath.split('#')[1].split('&')[2].split('=')[1];

      if (!instance_url) return;
      // save the access token to local storage
      localStorage.setItem('accessToken', decodeURI(accessToken));
      localStorage.setItem('instanceUrl', decodeURIComponent(instance_url) as string);

      // redirect the user to dashboard page
      router.push('/dashboard');
    }
  }, [router]);

  const handleOnClick = () => {
    if (!process.env.REDIRECT_URL) {
      console.error('Please set the REDIRECT_URL in .env file');
      return;
    }
    // redirect the user to salesforce login page
    router.replace(process.env.REDIRECT_URL)
  };

  return (
    <main>
      <h3>Welcome to Ariel Salesforce App</h3>
      <p>To start, please login with your Salesforce account.</p>
      <Button text="Login" handleOnClick={handleOnClick} customClasses="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800" />
    </main>
  )
};
