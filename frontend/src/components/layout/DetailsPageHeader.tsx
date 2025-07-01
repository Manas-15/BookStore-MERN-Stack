import React from 'react';
import Loader from '@/common/utills/Loader';
import { Filter } from 'lucide-react';

const DetailsPageHeader = ({
  title,
  loading,
  onFilterToggle,
  ctaButtons, // Pluggable CTAs
  data
}: {
  title?: string;
  itemCount?: number;
  loading?: boolean;
  onFilterToggle?: () => void;
  ctaButtons?: any[];
  data?: any;
}) => {
  return (
    <div className='flex flex-col justify-between rounded-sm py-2 sm:flex-row sm:items-center sm:justify-between'>
      <h2 className='text-title-md2 font-semibold text-black dark:text-white'>
        {title}
      </h2>
      {loading && <Loader />}
      <div className='2xsm:flex-row 2xsm:items-center flex flex-col justify-end gap-4'>
        {onFilterToggle && ( // Check if onFilterToggle exists
          <div className='cursor-pointer text-black' onClick={onFilterToggle}>
            <Filter className='h-5 w-5' />
            <div className='font-sm absolute left-1/2 top-full z-20 mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-slate-500 px-3 py-1 text-sm text-white opacity-0 group-hover:opacity-100'>
              <span className='absolute left-1/2 top-[-3px] -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-slate-500'></span>
              Filter
            </div>
          </div>
        )}
        {/* Check if isDisplayTreeView exists
        {isDisplayTreeView && (
          <div onClick={handleViewChange} className="cursor-pointer">
            {!isDisplayTreeView ? (
              <FaListUl title="List View" />
            ) : (
              <TbHierarchy2 title="Tree View" />
            )}
          </div>
        )} */}

        {data?.barcode ? (
          <img
            src={`data:image/png;base64,${data?.barcode}`}
            alt='Barcode'
            style={{ width: '40%', height: '55px' }}
          />
        ) : (
          <></>
        )}

        {/* Render pluggable CTAs */}
        <div
          className={`flex items-center space-x-4 ${data?.barcode ? 'mb-3' : ''}`}
        >
          {ctaButtons &&
            ctaButtons?.map((cta: any, index: any) => {
              return (
                <React.Fragment key={index}>
                  {cta?.isButton ? (
                    <button
                      key={index}
                      onClick={cta?.onClick}
                      title={cta?.title}
                      className={`${cta?.type === 'button' ? 'flex items-center gap-2 rounded bg-primary px-2 py-2 text-sm font-medium text-white hover:bg-opacity-90' : 'h-5 w-5 cursor-pointer bg-transparent font-bold'}`}
                    >
                      <span className=''>{cta?.icon}</span>
                      <span>{cta?.label}</span>
                    </button>
                  ) : (
                    <span
                      key={index}
                      title={cta?.title}
                      onClick={cta?.onClick}
                      className='cursor-pointer text-xl font-bold'
                    >
                      {cta?.icon}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default DetailsPageHeader;
