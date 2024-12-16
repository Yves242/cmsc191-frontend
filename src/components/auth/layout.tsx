import React, { useState, useEffect } from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// 38160431277-1sjovockfcltp654a36bkvpu6h8k6im5.apps.googleusercontent.com

import { paths } from '@/paths';
import { DynamicLogo } from '@/components/core/logo';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserGoogleAuth } from './google-auth';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100%',
      }}
    >
      <GoogleOAuthProvider clientId='38160431277-1sjovockfcltp654a36bkvpu6h8k6im5.apps.googleusercontent.com'>
            <React.StrictMode>
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
        <Box sx={{ p: 3 }}>
          <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
            <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
          </Box>
        </Box>
        <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center', p: 3 }}>
          <Box sx={{ maxWidth: '450px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>
      <Box
      
        sx={{
          backgroundImage:`url(/uplb_pegaraw.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          alignItems: 'center',
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'center',
        }}
      >
        <Stack>
        </Stack>
      </Box>
      </React.StrictMode>
          </GoogleOAuthProvider>
    </Box>
  );
}
