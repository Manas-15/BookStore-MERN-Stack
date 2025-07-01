import { delay } from '@/constants/mock-api';
import { chartData } from '@/constants/PurchaseOrderData';
import { BarGraph } from '@/features/overview/components/bar-graph';

export default async function BarStats() {
  await await delay(1000);

  return (
    <BarGraph
      chartData={chartData}
      title='Investment'
      desc='Showing total investment for the last 3 months'
      defaultView='orders'
    />
  );
}
