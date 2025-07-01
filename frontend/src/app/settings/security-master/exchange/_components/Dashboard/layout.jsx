import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

import {
  ClockAlert,
  CreditCard,
  FileClock,
  Fuel,
  Tag,
  Videotape,
  Wrench
} from 'lucide-react';
import BarChart from '@/components/DashboardCharts/BarChart';
import LineRaceChart from '@/components/DashboardCharts/LineRaceChart';
import PieChart from '@/components/DashboardCharts/PieChart';
import DoughnutChartWithRoundedCorner from '@/components/DashboardCharts/DoughnutChartWithRoundedCorner';

export default function OverViewLayout({ title }) {
  const barOptions = {
    legend: {},
    tooltip: {},
    dataset: {
      dimensions: ['product', 'active', 'idle'],
      source: [
        { product: 'Miner - 087', active: 43.3, idle: 85.8 },
        { product: 'Miner - 021', active: 83.1, idle: 73.4 },
        { product: 'Miner - 045', active: 86.4, idle: 65.2 },
        { product: 'Miner - 042', active: 72.4, idle: 53.9 },
        { product: 'Miner - 042', active: 22.4, idle: 53.9 },
        { product: 'Miner - 042', active: 42.4, idle: 53.9 },
        { product: 'Miner - 042', active: 12.4, idle: 53.9 },
        { product: 'Miner - 042', active: 79.4, idle: 53.9 },
        { product: 'Miner - 042', active: 42.4, idle: 53.9 }
      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }, { type: 'bar' }]
  };

  const pieOptions = {
    title: {
      text: '',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Assets Pending' },
          { value: 735, name: 'Completed Maintenance' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const doughnutRoundedOptions = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 275, name: 'Expired Warranties' },
          { value: 200, name: 'Regulatory Compliance' },
          { value: 287, name: 'Theft or Loss Incidents' }
        ]
      }
    ]
  };
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>{title ?? ''}</h2>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Assets Value
              </CardTitle>
              <Videotape size={18} />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$12.5M</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Depreciated Asset Value
              </CardTitle>
              <FileClock size={18} />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$2.5M</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Assets Requiring Maintenance
              </CardTitle>
              <Wrench size={18} />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+20</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Assets with Expired Warranties
              </CardTitle>
              <ClockAlert size={18} />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+120</div>
            </CardContent>
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>
            <BarChart cardTitle='Asset Utilization' options={barOptions} />
          </div>
          <div className='col-span-4 md:col-span-3'>
            <PieChart cardTitle='Asset Maintenance' options={pieOptions} />
          </div>
          <div className='col-span-4'>
            <LineRaceChart />
          </div>
          <div className='col-span-4 md:col-span-3'>
            <DoughnutChartWithRoundedCorner
              cardTitle='Risk & Compliance'
              cardDesc={`${new Date(
                new Date().setMonth(new Date().getMonth() - 3)
              ).toLocaleString('default', {
                month: 'long'
              })} - ${new Date().toLocaleString('default', { month: 'long' })} 2025`}
              options={doughnutRoundedOptions}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
