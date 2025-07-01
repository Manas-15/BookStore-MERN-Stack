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
   
  useCreatePfBankAdvicePfBankAdvicePostMutation, 
   
  useGetAllPfBankAdvicePfBankAdviceGetQuery, 
   
  useUpdatePfBankAdvicePfBankAdviceIdPutMutation, 
   
  useDeletePfBankAdvicePfBankAdviceIdDeleteMutation, 
   
  useGetPfBankAdvicePfBankAdviceIdGetQuery, 
   
  useGetAllPfBankAdviceEventGetQuery, 
   
  useCreatePfBankAdvicePfBankAdviceEventPostMutation, 
   
  useUpdatePfBankAdvicePfBankAdviceEventIdPutMutation, 
   
  useDeletePfBankAdvicePfBankAdviceEventIdDeleteMutation, 
   
  useGetPfBankAdvicePfBankAdviceEventIdGetQuery 
  
} from '@/redux/store/generatedServices/myPfApi';
import {
  capitalize,
  downloadFile,
  getColorCode,
  getStatusDetails,
  showToast
} from '@/common/utills/utilities';
import TabPanel from '@/components/feature/TabPanel';
import BankAdviceListing from './BankAdviceListing';
import { Modal } from '@/components/ui/modal';
import BankAdviceForm from './BankAdviceForm';
import { ArrowDownToLine, FileText, Pencil, X, Trash2 } from 'lucide-react';
import DetailsPageHeader from '@/components/layout/DetailsPageHeader';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';


function BankAdviceDetails({id}: { id: number }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [uploadedFileIds, setUploadedFileIds] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formType, setFormType] = useState('');
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

   const [deletePfBankAdvice] = useDeletePfBankAdvicePfBankAdviceIdDeleteMutation();

   const { data: fetchedPfBankAdviceDetails,
     isFetching: isFetchingData,
     refetch: refetchPfBankAdviceDetails
    } = useGetPfBankAdvicePfBankAdviceIdGetQuery({
     ...tenantIDHeader(),
     id: id,
   },
   {
     skip: !id,
     refetchOnMountOrArgChange: true
   }
   );

   useEffect(() => {
     if (!fetchedPfBankAdviceDetails) return;
     setSelectedItem(fetchedPfBankAdviceDetails);
   }, [fetchedPfBankAdviceDetails]);

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
        //await deletePfBankAdvice({
        //  ...tenantIDHeader(),
        //  id: parseInt(selectedItem.id)
        //}).unwrap();
        setIsDeleteModalOpen(false);
        toast.success('Bank Advice deleted successfully');
        //refetchPfBankAdviceDetails(); // Call refetch here
        setSelectedItem(null)
      } else {
        throw new Error('Selected Bank Advice ID is undefined');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const tabs = [
    {
      label: `pfBankAdvice.License`,
      //component: VendorLicenseListing
    },
    // Add more tabs as needed
  ];

  const handelClose = () => {
    router.push(`/dashboard/provident-fund/bank-advice`);
  };



  return (
    <>
      {isCreatePopupOpen && (
        <Modal
          title={
            selectedItem ? 'Edit Bank Advice' : 'Create Bank Advice'
          }
          description=""
          isOpen={isCreatePopupOpen}
          onClose={() => setIsCreatePopupOpen(false)}
          className='max-w-[1200px]'
        >
          <div className="flex w-full items-center justify-end space-x-2 pt-6">
            {/* <BankAdviceForm
              setOpen={setIsCreatePopupOpen}
              refetchList={refetchPfBankAdviceList} //pass here correct list
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              formType={formType}
            /> */}
          </div>
        </Modal>
      )}

      <DetailsPageHeader
        title={
         'BankAdvice Details'
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
                        <p>{fetchedPfBankAdviceDetails?.id }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Tenant Id:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.tenant_id }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Fin Year Id:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.fin_year_id }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Advice Date:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.advice_date }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Advice Type:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.advice_type }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Advice Bank:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.advice_bank }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Advice Slno:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.advice_slno }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Advice Cdno:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.advice_cdno }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Advice Amount:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.advice_amount }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Deleted At:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.deleted_at }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Created At:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.created_at }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Updated At:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.updated_at }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Created By:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.created_by }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Updated By:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.updated_by }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Deleted By:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.deleted_by }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Search Vector:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.search_vector }</p>
                      </div>
                    
                      <div>
                        <p className="font-semibold">Trust Id:</p>
                        <p></p>
                        <p>{fetchedPfBankAdviceDetails?.trust_id }</p>
                      </div>
                    
              
                 
                    {/* <p>moment(
                            fetchedPfBankAdviceDetails?.effective_start_date
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
                  Bank Advice
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

export default BankAdviceDetails;