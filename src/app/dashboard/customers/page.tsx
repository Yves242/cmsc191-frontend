import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import dayjs from 'dayjs';

import { config } from '@/config';
import type { Customer } from '@/components/dashboard/customer/customers-table';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const iframes = [
  {
    title: "Analytics 1",
    description: "This provides insights into the professors and their top 5 research interests.",
    src: "https://855dac5f2fa740c5953a30843e86b2d4.us-central1.gcp.cloud.es.io/app/dashboards?auth_provider_hint=anonymous1#/view/b2887699-e738-40e3-a6eb-070865f6a477?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-100y%2Cto%3Anow))",
  },
  {
    title: "Analytics 2",
    description: "This is a pie chart on the number of SPs versus the number of Thesis Publication on the Database",
    src: "https://855dac5f2fa740c5953a30843e86b2d4.us-central1.gcp.cloud.es.io/app/dashboards?auth_provider_hint=anonymous1#/view/d0fea885-7152-4a3c-b409-8a3fc4fd04a8?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-100y%2Cto%3Anow))",
  },
  {
    title: "Analytics 3",
    description: "This allows students to navigate the trending industries over the past year.",
    src: "https://855dac5f2fa740c5953a30843e86b2d4.us-central1.gcp.cloud.es.io/app/dashboards?auth_provider_hint=anonymous1#/view/f5df1ced-d801-48d9-b1c2-0c6970f755df?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-100y%2Cto%3Anow))",
  },
];

export default function Page(): React.JSX.Element {
  return (
    <Card style={{ opacity: 0.95, overflow: "auto", maxHeight: "90vh" }}>
      <CardContent>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4">Insights on Publications</Typography>
            <Stack direction="row" spacing={3}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {/* Left Side: First iframe with its header and subheading */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h5" style={{ marginBottom: "10px" }}>
                    {iframes[0].title}
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: "20px" }}>
                    {iframes[0].description}
                  </Typography>
                  <iframe
                    src={iframes[0].src}
                    height="800"
                    width="100%"
                    style={{ border: "none", overflow: "auto" }}
                    title={iframes[0].title}
                  ></iframe>
                </div>

                {/* Right Side: Other two iframes */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {iframes.slice(1).map((iframe, index) => (
                    <div key={index}>
                      <Typography variant="h6" style={{ marginBottom: "10px" }}>
                        {iframes[index + 1].title}
                      </Typography>
                      <Typography variant="body1" style={{ marginBottom: "20px" }}>
                        {iframes[index + 1].description}
                      </Typography>
                      <iframe
                        src={iframe.src}
                        height="300"
                        width="100%"
                        style={{ border: "none", overflow: "auto" }}
                        title={iframe.title}
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

