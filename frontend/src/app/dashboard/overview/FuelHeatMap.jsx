'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
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

const FuelHeatMap = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const taskCompletionHeatmapOption = {
    title: { text: '' },
    tooltip: {
      position: 'top'
    },
    grid: {
      height: '50%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: [
        '24-Feb-2025',
        '25-Feb-2025',
        '26-Feb-2025',
        '27-Feb-2025',
        '28-Feb-2025'
      ],
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: [
        'Under 25K',
        '25K-50K',
        '50K-100K',
        '100K-200K',
        '200K-500K',
        '500K-750k'
      ],
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 0,
      max: 2000,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%'
    },
    series: [
      {
        name: 'Loan Disbursement',
        type: 'heatmap',
        data: [
          [0, 0, 560],
          [0, 1, 1588],
          [0, 2, 1401],
          [0, 3, 454],
          [0, 4, 100],
          [0, 5, 1013],
          [0, 6, 0],
          [1, 0, 1320],
          [1, 1, 911],
          [1, 2, 1511],
          [1, 3, 150],
          [1, 4, 1690],
          [1, 5, 1320],
          [1, 6, 204],
          [2, 0, 1511],
          [2, 1, 1013],
          [2, 2, 1090],
          [2, 3, 630],
          [2, 4, 911],
          [3, 0, 1511],
          [3, 1, 356],
          [3, 2, 690],
          [3, 3, 1320],
          [3, 4, 911],
          [4, 0, 1511],
          [4, 1, 1013],
          [4, 2, 2690],
          [4, 3, 1320],
          [4, 4, 911]
        ].map(function (item) {
          return [item[0], item[1], item[2] || '-'];
        }),
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Loan Disbursement</CardTitle>
          <CardDescription></CardDescription>
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[370px] w-full'
        >
          <ReactECharts
            option={taskCompletionHeatmapOption}
            style={{ height: '370px' }}
          />
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FuelHeatMap;
