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

const DoughnutChartWithRoundedCorner = ({
  cardTitle,
  cardDesc = '',
  options
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDesc}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[370px] w-full'
        >
          <div className='flex items-center justify-center'>
            <ReactECharts
              option={options}
              style={{ height: '370px', width: '100%' }}
            />
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DoughnutChartWithRoundedCorner;
