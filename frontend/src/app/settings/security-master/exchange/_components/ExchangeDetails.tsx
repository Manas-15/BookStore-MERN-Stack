'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { tenantIDHeader } from '@/libs/authHeader';
import { ErrorBoundary } from 'react-error-boundary';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
   
  useCreateExchangeExchangePostMutation, 
   
  useGetAllExchangeExchangeGetQuery, 
   
  useUpdateExchangeExchangeIdPutMutation, 
   
  useDeleteExchangeExchangeIdDeleteMutation, 
   
  useGetExchangeExchangeIdGetQuery, 
   
  useGetAllExchangeEventGetQuery, 
   
  useCreateExchangeExchangeEventPostMutation, 
   
  useUpdateExchangeExchangeEventIdPutMutation, 
   
  useDeleteExchangeExchangeEventIdDeleteMutation, 
   
  useGetExchangeExchangeEventIdGetQuery 
  
} from '@/redux/store/generatedServices/myPfApi';
import {
  capitalize,
  downloadFile,
  getColorCode,
  getStatusDetails,
  showToast
} from '@/common/utills/utilities';
import TabPanel from '@/components/feature/TabPanel';
import ExchangeListing from './ExchangeListing';
import { Modal } from '@/components/ui/modal';
import ExchangeForm from './ExchangeForm';
import { ArrowDownToLine, FileText, Pencil, X, Trash2 } from 'lucide-react';
import DetailsPageHeader from '@/components/layout/DetailsPageHeader';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';


function ExchangeDetails({id}: { id: number }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [uploadedFileIds, setUploadedFileIds] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formType, setFormType] = useState('');
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

   const [deleteExchange] = useDeleteExchangeExchangeIdDeleteMutation();

   const { data: fetchedExchangeDetails,
     isFetching: isFetchingData,
     refetch: refetchExchangeDetails
    } = useGetExchangeExchangeIdGetQuery({
     ...tenantIDHeader(),
     id: id,
   },
   {
     skip: !id,
     refetchOnMountOrArgChange: true
   }
   );

   useEffect(() => {
     if (!fetchedExchangeDetails) return;
     setSelectedItem(fetchedExchangeDetails);
   }, [fetchedExchangeDetails]);

  const handleCloseModal = () => {
    setIsCreatePopupOpen(false);
    setSelectedItem(null);
  };

  const ctaButtons = [
   {/* {
      label: `Edit`,
      icon: <Pencil size={20} />,
      onClick: () => {
        setIsCreatePopupOpen(true);
      },
      type: 'button',
      title: `Edit`,
      isButton: false
    },
    {
      label: `Delete`,
      icon: <Trash2 size={20} />,
      onClick: () => setIsDeleteModalOpen(true),
      type: 'button',
      title: `Delete`,
      isButton: false
    }, */},
    {
      label: `Close`,
      icon: <X size={25} />,
      onClick: () => handelClose(),
      type: 'button',
      title: `Close`,
      isButton: false
    }
  ];

  const onConfirmDelete = async () => {
    try {
      if (selectedItem?.id) {
        //await deleteExchange({
        //  ...tenantIDHeader(),
        //  id: parseInt(selectedItem.id)
        //}).unwrap();
        setIsDeleteModalOpen(false);
        toast.success('Exchange deleted successfully');
        //refetchExchangeDetails(); // Call refetch here
        setSelectedItem(null)
      } else {
        throw new Error('Selected Exchange ID is undefined');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const tabs = [
    {
      label: `exchange.License`,
      //component: VendorLicenseListing
    },
    // Add more tabs as needed
  ];

  const handelClose = () => {
    router.push(`/settings/security-master/exchange`);
  };



  return (
    <>
      {isCreatePopupOpen && (
        <Modal
          title={
            selectedItem ? 'Edit Exchange' : 'Create Exchange'
          }
          description=""
          isOpen={isCreatePopupOpen}
          onClose={() => setIsCreatePopupOpen(false)}
          className='max-w-[1200px]'
        >
          <div className="flex w-full items-center justify-end space-x-2 pt-6">
            {/* <ExchangeForm
              setOpen={setIsCreatePopupOpen}
              refetchList={refetchExchangeList} //pass here correct list
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              formType={formType}
            /> */}
          </div>
        </Modal>
      )}

      <DetailsPageHeader
        title={
         'Exchange Details'
        }
        ctaButtons={ctaButtons}
      />

      <div className='custom-scrollbar h-[80vh] overflow-y-auto py-4 pr-3'>
          <Card className="mx-auto mb-4 w-full">
            
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   
                      <div>
                        <p className="font-semibold">Id:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.id }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Name:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.name }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Mic Code:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.mic_code }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Country:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.country }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Timezone:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.timezone }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Regulator:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.regulator }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Metadata:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.metadata }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Deleted At:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.deleted_at }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Created At:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.created_at }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Updated At:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.updated_at }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Created By:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.created_by }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Updated By:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.updated_by }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Deleted By:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.deleted_by }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Search Vector:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.search_vector }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Tenant Id:</p>
                        <p></p>
                        <p>{fetchedExchangeDetails?.tenant_id }</p>
                      </div>
                    
              
                 
                    {/* <p>moment(
                            fetchedExchangeDetails?.effective_start_date
                          ).format('MM/DD/YYYY')
                    </p> */}
                </div>
              </div>
            </CardContent>
          </Card>

          {/*<Card className='mx-auto mb-4 w-full'>
            <CardContent>
              <section className='mb-6'>
                <h2 className='text-title-md2 mb-2 font-semibold text-black dark:text-white'>
                  Exchange
                </h2>
                <ErrorBoundary
                  fallback={<div>{'Error loading data'}</div>}
                >
                  {false ? (
                    <DataTableSkeleton columnCount={5} rowCount={10} />

                  ) : (
                    <TabPanel
                      id={163}
                      tabs={tabs}
                      //fetchedVendorData={fetchedVendorData}
                      //refetchList={refetchVendorDetailsList}
                    />
                  )}
                </ErrorBoundary>
              </section>
            </CardContent>
          </Card>*/}
      </div>
    </>
  );
}

export default ExchangeDetails;