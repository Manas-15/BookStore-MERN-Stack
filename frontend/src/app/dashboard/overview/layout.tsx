import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import FuelPieChart from './FuelPieChart';
import FuelHeatMap from './FuelHeatMap';
import { CreditCard, Fuel, Tag, Videotape } from 'lucide-react';

export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>Hi, Anurag 👋</h2>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Number Of Employees
              </CardTitle>
              {/* <Tag size={17} /> */}
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>260</div>
              <p className='text-xs text-muted-foreground'>
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                AUM (In Crores)
              </CardTitle>
              {/* <Fuel size={18} /> */}
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+2350 cr</div>
              <p className='text-xs text-muted-foreground'>
                +80.23% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                New Employee Added
              </CardTitle>
              {/* <CreditCard size={18} /> */}
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+120</div>
              <p className='text-xs text-muted-foreground'>
                +19 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Loans Outstanding (In Crores)
              </CardTitle>
              <Videotape size={18} />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+573 cr</div>
              <p className='text-xs text-muted-foreground'>
                +201 from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>{bar_stats}</div>
          <div className='col-span-4 md:col-span-3'>
            <FuelPieChart />
          </div>
          {/* <div className='col-span-4 md:col-span-3'>{sales}</div> */}
          {/* <div className='col-span-4'>{area_stats}</div> */}
          <div className='col-span-4'>
            <FuelHeatMap />
          </div>
          <div className='col-span-4 md:col-span-3'>{pie_stats}</div>
        </div>
      </div>
    </PageContainer>
  );
}
