import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
// import { setVendorDetailsTab } from '@/redux/slices/vendorSlice';

type TabPanelProps = {
  id: number;
  tabs: Array<{
    label: string;
    component?: React.ComponentType<any>;
  }>;
  fetchedVendorData?: any;
  refetchList?: any;
};

const TabPanel = ({
  id,
  tabs,
  fetchedVendorData,
  refetchList
}: TabPanelProps) => {
  //   const selectedTab = useSelector(
  //     (state: any) => state.vendorSlice.vendorDetails.selectedTab
  //   );
  const [openTab, setOpenTab] = useState(1);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  return (
    <div className='border-stroke px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white'>
      <div className='border-stroke dark:border-strokedark flex flex-wrap gap-5 border-b px-5 sm:gap-5'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`cursor-pointer border-b-2 py-3 text-sm font-medium hover:text-primary md:text-base ${
              openTab === index + 1 ? activeClasses : inactiveClasses
            }`}
            onClick={() => setOpenTab(index + 1)}
          >
            {t(tab.label)}
          </div>
        ))}
      </div>
      <div>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`leading-relaxed ${openTab === index + 1 ? 'block' : 'hidden'}`}
          >
            {openTab === index + 1 && tab.component && (
              <tab.component id={id} vendorId={id} enableDetailTable={true} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabPanel;
