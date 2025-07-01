'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ReactECharts from 'echarts-for-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

const chartConfig = {
  views: {
    label: 'Page Views'
  },
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  },
  error: {
    label: 'Error',
    color: 'hsl(var(--chart-2))'
  }
};

const FuelPieChart = () => {
  const dispatch = useDispatch();
  const OverallProgress = [
    {
      task_state: 'todo',
      state_count: 891
    },
    {
      task_state: 'doing',
      state_count: 9
    },
    {
      task_state: 'done',
      state_count: 45
    },
    {
      task_state: null,
      state_count: 91
    }
  ];
  const { t } = useTranslation();

  const [state, setState] = useState({
    series: [],
    labels: ['At Risk', 'Delayed', 'On Track', 'Completed'],
    colors: ['#DF6653', '#FFAF0B', '#2165A3', '#219653'],
    showNoData: false
  });

  useEffect(() => {
    if (OverallProgress && OverallProgress?.length > 0) {
      const limitedOverallProgress = OverallProgress?.slice(0, 3);

      const seriesData = limitedOverallProgress?.map(
        (item) => item?.state_count
      );

      if (seriesData.every((val) => val === 0)) {
        setState({
          series: [1],
          labels: [t('dashboard.No Data')],
          colors: ['#b0b0b0'],
          showNoData: true
        });
      } else {
        setState({
          series: seriesData,
          labels: ['At Risk', 'Delayed', 'On Track', 'Completed'],
          colors: ['#DF6653', '#FFAF0B', '#2165A3', '#219653'],
          showNoData: false
        });
      }
    }
  }, []);

  const getOption = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Bond', 'Government Securities', 'Mutual Funds', 'Stocks', 'ETF'] // Updated legend data
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // Updated dates for xAxis, extended with more dates
      data: [
        '28-Feb',
        '27-Feb',
        '26-Feb',
        '25-Feb',
        '24-Feb',
        '23-Feb',
        '22-Feb',
        '21-Feb',
        '20-Feb',
        '19-Feb',
        '18-Feb',
        '17-Feb',
        '16-Feb'
      ]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Bond',
        type: 'line',
        stack: 'Total',
        data: [
          1320, 1013, 1474, 1588, 1074, 1170, 1393, 1460, 1084, 1090, 1074,
          1170, 1000, 1320, 1013, 1474, 1588, 1074, 1170, 1393, 1460, 1084,
          1090, 1074, 1170, 1000, 1320, 1013, 1474, 1588, 1074, 1170
        ]
      },
      {
        name: 'Government Securities',
        type: 'line',
        stack: 'Total',
        data: [
          911, 1690, 1511, 1401, 1560, 1386, 1221, 1378, 1104, 1695, 1490, 1378,
          1421, 911, 1690, 1511, 1401, 1560, 1386, 1221, 1378, 1104, 1695, 1490,
          1378, 1421, 911, 1690, 1511, 1401, 1560, 1386
        ]
      },
      {
        name: 'Mutual Funds',
        type: 'line',
        stack: 'Total',
        data: [
          1200, 1450, 1300, 1600, 1250, 1400, 1350, 1500, 1150, 1550, 1280,
          1420, 1380, 1200, 1450, 1300, 1600, 1250, 1400, 1350, 1500, 1150,
          1550, 1280, 1420, 1380, 1200, 1450, 1300, 1600, 1250, 1400
        ]
      },
      {
        name: 'Stocks',
        type: 'line',
        stack: 'Total',
        data: [
          1100, 1300, 1200, 1400, 1150, 1250, 1180, 1350, 1050, 1450, 1220,
          1320, 1280, 1100, 1300, 1200, 1400, 1150, 1250, 1180, 1350, 1050,
          1450, 1220, 1320, 1280, 1100, 1300, 1200, 1400, 1150, 1250
        ]
      },
      {
        name: 'ETF',
        type: 'line',
        stack: 'Total',
        data: [
          1000, 1200, 1100, 1300, 1050, 1150, 1080, 1250, 950, 1350, 1120, 1220,
          1180, 1000, 1200, 1100, 1300, 1050, 1150, 1080, 1250, 950, 1350, 1120,
          1220, 1180, 1000, 1200, 1100, 1300, 1050, 1150
        ]
      }
    ]
  };

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Portfolio Values</CardTitle>
          <CardDescription></CardDescription>
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[350px] w-full'
        >
          <div className='flex items-center justify-center'>
            <ReactECharts
              option={getOption}
              style={{ height: '350px', width: '100%' }}
            />
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FuelPieChart;
