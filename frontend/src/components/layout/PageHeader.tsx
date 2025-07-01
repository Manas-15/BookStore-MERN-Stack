import Loader from '@/common/utills/Loader';
import { Filter, Plus } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { Heading } from '../ui/heading';

const PageHeader = ({
  title = '',
  itemCount,
  loading,
  onFilterToggle,
  ctaButtons, // Pluggable CTAs
  buttonWidth
}: {
  title?: string;
  itemCount?: number;
  loading?: boolean;
  onFilterToggle?: () => void;
  ctaButtons?: any[];
  buttonWidth?: string;
}) => {
  return (
    <div className='flex flex-col justify-between rounded-sm py-2 sm:flex-row sm:items-center sm:justify-between'>
      <Heading title={title} description='' />
      {/* <span className='text-title-md2 font-semibold text-black dark:text-white'>
        {itemCount !== undefined && itemCount > 0 && ` (${itemCount})`}
      </span> */}

      {loading && <Loader />}

      <div
        className={`w-${buttonWidth || '2/5'} 2xsm:flex-row 2xsm:items-center flex flex-col justify-end gap-4`}
      >
        {onFilterToggle && ( // Check if onFilterToggle exists
          <div className='cursor-pointer text-black' onClick={onFilterToggle}>
            <Filter className='h-5 w-5' />
            <div className='font-sm absolute left-1/2 top-full z-20 mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-slate-500 px-3 py-1 text-sm text-white opacity-0 group-hover:opacity-100'>
              <span className='absolute left-1/2 top-[-3px] -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-slate-500'></span>
              Filter
            </div>
          </div>
        )}

        {/* Render pluggable CTAs */}
        <div className='flex items-center space-x-4'>
          {ctaButtons &&
            ctaButtons?.map((cta: any, index: any) => {
              return (
                <React.Fragment key={index}>
                  {cta?.isButton ? (
                    <Button
                      key={index}
                      className={cn(buttonVariants({ variant: 'default' }))}
                      onClick={cta.onClick}
                      title={cta.title}
                    >
                      <Plus className='mr-2 h-4 w-4' /> Add New
                    </Button>
                  ) : (
                    <span
                      key={index}
                      title={cta.title}
                      onClick={cta.onClick}
                      className='cursor-pointer text-xl font-bold'
                    >
                      {cta.icon}
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
export default PageHeader;
