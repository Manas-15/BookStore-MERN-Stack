'use client';

const _rawData = [
  ['Hour', 'Life Expectancy', 'Population', 'Country', 'Year'],
  [5.228, 69, 34798, 'Surface Miner - 023', 1950],
  [6.289, 70.8, 37459, 'Surface Miner - 023', 1955],
  [7.842, 69, 38558, 'Surface Miner - 023', 1960],
  [10.134, 69.7, 39751, 'Surface Miner - 023', 1965],
  [13.082, 70.8, 40472, 'Surface Miner - 023', 1970],
  [15.622, 72.5, 41319, 'Surface Miner - 023', 1975],
  [18.833, 74.1, 42491, 'Surface Miner - 023', 1980],
  [21.741, 74.8, 43255, 'Surface Miner - 023', 1985],
  [24.253, 75.7, 44310, 'Surface Miner - 023', 1990],
  [23.97, 76.6, 45661, 'Surface Miner - 023', 1995],
  [29.614, 77.7, 46977, 'Surface Miner - 023', 2000],
  [33.752, 78.9, 48498, 'Surface Miner - 023', 2005],
  [36.537, 79.8, 50436, 'Surface Miner - 023', 2010],
  [38.966, 81, 52505, 'Surface Miner - 023', 2015],
  [6.745, 66.1, 42518, 'Surface Miner - 047', 1950],
  [8.483, 68.4, 43428, 'Surface Miner - 047', 1955],
  [9.97, 70.3, 45684, 'Surface Miner - 047', 1960],
  [13.194, 71.4, 48758, 'Surface Miner - 047', 1965],
  [16.106, 72.2, 50772, 'Surface Miner - 047', 1970],
  [18.292, 73.2, 52699, 'Surface Miner - 047', 1975],
  [21.209, 74.3, 53880, 'Surface Miner - 047', 1980],
  [22.955, 75.9, 55284, 'Surface Miner - 047', 1985],
  [26.891, 77, 56743, 'Surface Miner - 047', 1990],
  [27.558, 77.9, 57844, 'Surface Miner - 047', 1995],
  [33.085, 79.1, 59387, 'Surface Miner - 047', 2000],
  [35.288, 80.2, 61203, 'Surface Miner - 047', 2005],
  [37.284, 81.4, 63027, 'Surface Miner - 047', 2010],
  [39.17, 82.3, 64395, 'Surface Miner - 047', 2015],
  [6.739, 67.5, 69786, 'Surface Miner - 069', 1950],
  [9.064, 69.1, 71686, 'Surface Miner - 069', 1955],
  [10.959, 69.6, 73543, 'Surface Miner - 069', 1960],
  [13.639, 70.8, 76368, 'Surface Miner - 069', 1965],
  [16.977, 71, 78169, 'Surface Miner - 069', 1970],
  [18.985, 72.5, 78389, 'Surface Miner - 069', 1975],
  [22.518, 73.8, 78389, 'Surface Miner - 069', 1980],
  [25.336, 74.8, 77718, 'Surface Miner - 069', 1985],
  [31.336, 75.4, 79433, 'Surface Miner - 069', 1990],
  [31.831, 76.7, 81622, 'Surface Miner - 069', 1995],
  [34.887, 78.3, 85212, 'Surface Miner - 069', 2000],
  [37.323, 79.4, 87469, 'Surface Miner - 069', 2005],
  [41.79, 80.4, 89777, 'Surface Miner - 069', 2010],
  [45.229, 81.1, 90689, 'Surface Miner - 069', 2015],
  [6.745, 72, 143, 'Surface Miner - 062', 1950],
  [8.483, 73.4, 155, 'Surface Miner - 062', 1955],
  [9.97, 74.3, 175, 'Surface Miner - 062', 1960],
  [13.194, 74.4, 193, 'Surface Miner - 062', 1965],
  [16.106, 74.2, 204, 'Surface Miner - 062', 1970],
  [18.292, 76.2, 217, 'Surface Miner - 062', 1975],
  [21.209, 77.3, 227, 'Surface Miner - 062', 1980],
  [22.955, 77.9, 240, 'Surface Miner - 062', 1985],
  [26.891, 78.8, 253, 'Surface Miner - 062', 1990],
  [27.558, 79.4, 266, 'Surface Miner - 062', 1995],
  [33.085, 80.4, 279, 'Surface Miner - 062', 2000],
  [35.288, 81.6, 294, 'Surface Miner - 062', 2005],
  [37.284, 82.1, 318, 'Surface Miner - 062', 2010],
  [39.17, 82.7, 329, 'Surface Miner - 062', 2015],
  [10.745, 72.5, 3265, 'Surface Miner - 032', 1950],
  [12.483, 73.8, 3381, 'Surface Miner - 032', 1955],
  [13.97, 73.7, 3568, 'Surface Miner - 032', 1960],
  [15.194, 74, 3723, 'Surface Miner - 032', 1965],
  [18.106, 74.2, 3863, 'Surface Miner - 032', 1970],
  [20.292, 75.2, 4007, 'Surface Miner - 032', 1975],
  [23.209, 75.8, 4086, 'Surface Miner - 032', 1980],
  [25.955, 76.2, 4153, 'Surface Miner - 032', 1985],
  [28.891, 77, 4241, 'Surface Miner - 032', 1990],
  [29.558, 78.1, 4359, 'Surface Miner - 032', 1995],
  [35.085, 79.1, 4491, 'Surface Miner - 032', 2000],
  [37.288, 80.3, 4623, 'Surface Miner - 032', 2005],
  [39.284, 81.2, 4889, 'Surface Miner - 032', 2010],
  [41.17, 82, 5166, 'Surface Miner - 032', 2015],
  [4.745, 61.3, 24824, 'Surface Miner - 087', 1950],
  [5.483, 65.8, 27550, 'Surface Miner - 087', 1955],
  [6.97, 67.9, 29561, 'Surface Miner - 087', 1960],
  [8.194, 69.6, 31435, 'Surface Miner - 087', 1965],
  [10.106, 70.8, 32664, 'Surface Miner - 087', 1970],
  [12.292, 70.7, 34185, 'Surface Miner - 087', 1975],
  [14.209, 71.3, 35574, 'Surface Miner - 087', 1980],
  [15.955, 70.9, 37203, 'Surface Miner - 087', 1985],
  [17.891, 71, 38111, 'Surface Miner - 087', 1990],
  [18.558, 72.7, 38595, 'Surface Miner - 087', 1995],
  [20.085, 74.3, 38454, 'Surface Miner - 087', 2000],
  [22.288, 75.1, 38259, 'Surface Miner - 087', 2005],
  [24.284, 76.4, 38043, 'Surface Miner - 087', 2010],
  [26.17, 77.5, 38612, 'Surface Miner - 087', 2015],
  [2.745, 64.5, 102799, 'Surface Miner - 042', 1950],
  [3.483, 67.1, 111940, 'Surface Miner - 042', 1955],
  [4.97, 68.4, 119906, 'Surface Miner - 042', 1960],
  [6.194, 69.2, 127484, 'Surface Miner - 042', 1965],
  [8.106, 68.9, 130404, 'Surface Miner - 042', 1970],
  [10.292, 68.1, 134690, 'Surface Miner - 042', 1975],
  [12.209, 67.7, 139010, 'Surface Miner - 042', 1980],
  [13.955, 68.8, 143858, 'Surface Miner - 042', 1985],
  [15.891, 68.9, 148292, 'Surface Miner - 042', 1990],
  [16.558, 66.7, 148141, 'Surface Miner - 042', 1995],
  [18.085, 65.3, 146597, 'Surface Miner - 042', 2000],
  [20.288, 66.7, 143618, 'Surface Miner - 042', 2005],
  [22.284, 68.9, 142849, 'Surface Miner - 042', 2010],
  [24.17, 70.5, 143457, 'Surface Miner - 042', 2015],
  [6.974, 69.2, 50127, 'Surface Miner - 067', 1950],
  [8.483, 70.4, 51199, 'Surface Miner - 067', 1955],
  [9.97, 71.2, 52372, 'Surface Miner - 067', 1960],
  [11.194, 71.7, 54266, 'Surface Miner - 067', 1965],
  [13.106, 72, 55632, 'Surface Miner - 067', 1970],
  [15.292, 72.8, 56215, 'Surface Miner - 067', 1975],
  [18.209, 73.7, 56314, 'Surface Miner - 067', 1980],
  [20.955, 74.7, 56460, 'Surface Miner - 067', 1985],
  [23.891, 75.9, 57237, 'Surface Miner - 067', 1990],
  [25.558, 76.8, 58019, 'Surface Miner - 067', 1995],
  [30.085, 77.9, 58892, 'Surface Miner - 067', 2000],
  [32.288, 79.1, 60401, 'Surface Miner - 067', 2005],
  [34.284, 80.4, 62766, 'Surface Miner - 067', 2010],
  [36.17, 81, 64716, 'Surface Miner - 067', 2015]
];

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
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

const countries = [
  'Surface Miner - 023',
  'Surface Miner - 047',
  'Surface Miner - 069',
  'Surface Miner - 062',
  'Surface Miner - 032',
  'Surface Miner - 087',
  'Surface Miner - 042',
  'Surface Miner - 067'
];

const LineRaceChart = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const datasetWithFilters = [];
  const seriesList = [];

  echarts.util.each(countries, function (country) {
    var datasetId = 'dataset_' + country;
    datasetWithFilters.push({
      id: datasetId,
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'Year', gte: 1950 },
            { dimension: 'Country', '=': country }
          ]
        }
      }
    });
    seriesList.push({
      type: 'line',
      datasetId: datasetId,
      showSymbol: false,
      name: country,
      endLabel: {
        show: true,
        formatter: function (params) {
          return params.value[3] + ': ' + params.value[0];
        }
      },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'Year',
        y: 'Hour',
        label: ['Day', 'Hour'],
        itemName: 'Year',
        tooltip: ['Hour']
      }
    });
  });

  const getOption = () => ({
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw',
        source: _rawData
      },
      ...datasetWithFilters
    ],
    title: {
      text: ''
    },
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle'
    },
    yAxis: {
      name: 'Hour'
    },
    grid: {
      right: 140
    },
    series: seriesList
  });

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Asset Downtime</CardTitle>
          <CardDescription></CardDescription>
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[370px] w-full'
        >
          <div className='flex items-center justify-center'>
            <ReactECharts
              option={getOption()}
              style={{ height: '370px', width: '100%' }}
            />
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LineRaceChart;
