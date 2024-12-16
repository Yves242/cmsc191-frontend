'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { paths } from '@/paths';
import { useUser } from '@/hooks/use-user';

import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Box } from '@mui/material';
import axios from 'axios';

export function SignInForm() {
  const router = useRouter();

  const { checkSession } = useUser();

  const [ user, setUser ] = React.useState([]);
  const [ profile, setProfile ] = React.useState([]);

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => {router.replace(paths.dashboard.overview); setUser(codeResponse)},
      onError: (error) => console.log('Login Failed:', error)
  });

  React.useEffect(
      () => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
      },
      [ user ]
  );

    // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
      googleLogout();
      setProfile(null);
  };


  return (
    <Stack>
         <Stack spacing={2}>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', zIndex: 2}}>
            <Box
              component="img"
              alt="Widgets"
              src="/assets/auth-widgets.png"
              sx={{ height: 'auto', width: '100%', maxWidth: '600px' }}
            />
          </Box>
          {/* {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null} */}
          <Button onClick={() => login()} variant="contained">
            Sign in with Google 🚀
          </Button>
        </Stack>
    </Stack>
  );
}
