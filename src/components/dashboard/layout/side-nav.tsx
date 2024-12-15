'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { Logo } from '@/components/core/logo';
import { navItems1, navItems2, sideBarItems } from './config';
import { navIcons } from './nav-icons';
import {maroonColor, lightBlackColor, yellowColor, forestGreenColor, white} from "./colors";
import { UploadSimple } from '@phosphor-icons/react';

import type { NavItemConfig } from '@/types/nav';
import { Icon } from '@mui/material';
import { BookOpen } from '@phosphor-icons/react';

export function SideNav(): React.JSX.Element {
  const pathname = usePathname();
  
  // Array of texts to display in the stack
  const texts = ["Journal 1", "Journal 2", "Journal 3", "Journal 4"];

  return (
    <Box
      sx={{
        '--SideNav-background': 'var(--mui-palette-neutral-950)',
        '--SideNav-color': 'var(--mui-palette-common-white)',
        '--NavItem-color': 'var(--mui-palette-neutral-300)',
        '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
        '--NavItem-active-background': 'var(--mui-palette-primary-main)',
        '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
        '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
        '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
        bgcolor: maroonColor,
        color: 'var(--SideNav-color)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        left: 0,
        maxWidth: '100%',
        position: 'fixed',
        scrollbarWidth: 'none',
        top: 0,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >

      {/* LOGO PART HERE */}
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
          <Logo color="light" height={50} width={104} />
        </Box>
      </Stack>


      {/* simple divider */}
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.5)'}} />


      {/* ANALYTICS PAGE HERE */}
      <Box component="nav" sx={{  p: '12px', bottomPadding: '0px' }}>
        {renderNavItems({ pathname, items: navItems1 })}
      </Box>

      {/* simple divider */}
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.5)', topPadding: 0, bottomPadding: 1}} />


      {/* SEARCH PAGE HERE */}
      <Box component="nav" sx={{p: '12px'}}>
        {renderNavItems({ pathname, items: navItems2 })}
      </Box>

      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px', topPadding: '0px'}}>
        {texts.map((text, index) => (
          <Box sx={{ alignItems: 'left', borderRadius: 1, color: white,
              display: 'flex', flex: '0 0 auto', gap: 1, p: '6px 16px', position: 'relative',
              textDecoration: 'none',whiteSpace: 'nowrap'
            }}>
            <Box sx={{ alignItems: 'left', display: 'flex', justifyContent: 'left', flex: '0 0 auto' }}>
              <BookOpen style={{ fontSize: "var(--icon-fontSize-md)", color: '#ffffff', cursor: 'pointer'}} />
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
              <Box onClick={() => {alert("You clicked on me.")}} sx={{minWidth: '60%'}}>
                <Typography
                  component="span"
                  sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px', cursor: 'pointer',}}
                >
                  {text}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>




      <Box component="nav" sx={{ flex: '1 1 1', p: '12px'}} >
        <Box
          component={RouterLink} 
          href="https://material-kit-pro-react.devias.io/"
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            cursor: 'pointer',
            display: 'flex',
            flex: '0 0 auto',
            gap: 1,
            p: '6px 16px',
            position: 'relative',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            bgcolor: yellowColor, 
            color: forestGreenColor 
          }}
        >
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
              <UploadSimple fontSize="var(--icon-fontSize-md)" />
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography
                component="span"
                sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
              >
                Upload SP/Thesis
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
  );
}

function renderNavItems({ items = [], pathname }: { items?: NavItemConfig[]; pathname: string }): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { key, ...item } = curr;

    acc.push(<NavItem key={key} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  pathname: string;
}

function NavItem({ disabled, external, href, icon, matcher, pathname, title }: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null;
  const textArray = ["Text 1", "Text 2", "Text 3", "Text 4"];

  return (
    <li>
      <Box
        {...(href
          ? {
              component: external ? 'a' : RouterLink,
              href,
              target: external ? '_blank' : undefined,
              rel: external ? 'noreferrer' : undefined,
            }
          : { role: 'button' })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: white,
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          position: 'relative',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            color: white,
            cursor: 'not-allowed',
          }),
          ...(active && { bgcolor: yellowColor, color: forestGreenColor }),
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
          {Icon ? (
            <Icon
              fill={active ? forestGreenColor : white}
              fontSize="var(--icon-fontSize-md)"
              weight={active ? 'fill' : undefined}
              style={{
                transform: icon == 'search' ? 'scaleX(-1)' : 'scaleX(1)'
              }}
            />
          ) : null}
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
      </Box>

    </li>
  );


}

