import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers = [
  {
    id: 'USR-010',
    name: 'Alcides Antonio',
    avatar: '/assets/avatar-10.png',
    email: 'alcides.antonio@devias.io',
    phone: '908-691-3242',
    address: { city: 'Madrid', country: 'Spain', state: 'Comunidad de Madrid', street: '4158 Hedge Street' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-009',
    name: 'Marcus Finn',
    avatar: '/assets/avatar-9.png',
    email: 'marcus.finn@devias.io',
    phone: '415-907-2647',
    address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-008',
    name: 'Jie Yan',
    avatar: '/assets/avatar-8.png',
    email: 'jie.yan.song@devias.io',
    phone: '770-635-2682',
    address: { city: 'North Canton', country: 'USA', state: 'Ohio', street: '4894 Lakeland Park Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-007',
    name: 'Nasimiyu Danai',
    avatar: '/assets/avatar-7.png',
    email: 'nasimiyu.danai@devias.io',
    phone: '801-301-7894',
    address: { city: 'Salt Lake City', country: 'USA', state: 'Utah', street: '368 Lamberts Branch Road' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-006',
    name: 'Iulia Albu',
    avatar: '/assets/avatar-6.png',
    email: 'iulia.albu@devias.io',
    phone: '313-812-8947',
    address: { city: 'Murray', country: 'USA', state: 'Utah', street: '3934 Wildrose Lane' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-005',
    name: 'Fran Perez',
    avatar: '/assets/avatar-5.png',
    email: 'fran.perez@devias.io',
    phone: '712-351-5711',
    address: { city: 'Atlanta', country: 'USA', state: 'Georgia', street: '1865 Pleasant Hill Road' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },

  {
    id: 'USR-004',
    name: 'Penjani Inyene',
    avatar: '/assets/avatar-4.png',
    email: 'penjani.inyene@devias.io',
    phone: '858-602-3409',
    address: { city: 'Berkeley', country: 'USA', state: 'California', street: '317 Angus Road' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-003',
    name: 'Carson Darrin',
    avatar: '/assets/avatar-3.png',
    email: 'carson.darrin@devias.io',
    phone: '304-428-3097',
    address: { city: 'Cleveland', country: 'USA', state: 'Ohio', street: '2849 Fulton Street' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-002',
    name: 'Siegbert Gottfried',
    avatar: '/assets/avatar-2.png',
    email: 'siegbert.gottfried@devias.io',
    phone: '702-661-1654',
    address: { city: 'Los Angeles', country: 'USA', state: 'California', street: '1798 Hickory Ridge Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-001',
    name: 'Miron Vitold',
    avatar: '/assets/avatar-1.png',
    email: 'miron.vitold@devias.io',
    phone: '972-333-4106',
    address: { city: 'San Diego', country: 'USA', state: 'California', street: '75247' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
] satisfies Customer[];

const iframes = [
  {
    title: "Dashboard 1",
    description: "This dashboard provides insights into the professors and their top 5 research interests.",
    src: "https://855dac5f2fa740c5953a30843e86b2d4.us-central1.gcp.cloud.es.io/app/dashboards?auth_provider_hint=anonymous1#/view/b2887699-e738-40e3-a6eb-070865f6a477?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-100y%2Cto%3Anow))",
  },
  {
    title: "Dashboard 2",
    description: "This dashboard is a pie chart on the number of SPs versus the number of Thesis Publication on the Database",
    src: "https://855dac5f2fa740c5953a30843e86b2d4.us-central1.gcp.cloud.es.io/app/dashboards?auth_provider_hint=anonymous1#/view/d0fea885-7152-4a3c-b409-8a3fc4fd04a8?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-100y%2Cto%3Anow))",
  },
  {
    title: "Dashboard 3",
    description: "This dashboard allows students to navigate the trending industries over the past year.",
    src: "https://855dac5f2fa740c5953a30843e86b2d4.us-central1.gcp.cloud.es.io/app/dashboards?auth_provider_hint=anonymous1#/view/f5df1ced-d801-48d9-b1c2-0c6970f755df?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-100y%2Cto%3Anow))",
  },
];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Insights on Publications</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            
          </Stack>
        </Stack>
        
      </Stack>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Left Side: First iframe with its header and subheading */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h5" style={{ marginBottom: "10px" }}>
            {iframes[0].title}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "20px" }}>
            {iframes[0].description}
          </Typography>
          <iframe
            src={iframes[0].src}
            height="400"
            width="100%"
            style={{ border: "none" }}
            title={iframes[0].title}
          ></iframe>
        </div>

        {/* Right Side: Other two iframes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {iframes.slice(1).map((iframe, index) => (
            <div key={index}>
              <Typography variant="h5" style={{ marginBottom: "10px" }}>
            {iframes[index].title}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "20px" }}>
            {iframes[index].description}
          </Typography>
              <iframe
                src={iframe.src}
                height="400"
                width="100%"
                style={{ border: "none" }}
                title={iframe.title}
              ></iframe>
            </div>
          ))}
        </div>
      </div>


    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
