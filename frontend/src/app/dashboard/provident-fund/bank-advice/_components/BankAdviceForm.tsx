'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller,useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { tenantIDHeader } from '@/libs/authHeader';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import FormFooter from '@/components/feature/FormFooter';
import { CustomDatePicker } from '@/components/FormInputs/CustomDatePicker';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { MultiSelectSearchDropdown } from '@/components/ui/MultiSelectSearchDropdown';

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
          useGetAllFinancialYearFinancialYearGetQuery,
          useGetAllPfTrustsPfTrustsGetQuery
} from '@/redux/store/generatedServices/myPfApi';

//FIXME validation schema to Templatize this
const formSchema = z.object({
            fin_year_id: z.number().min(1, {
              message: 'Fin Year Id is required'
            }),
            advice_date: z.string(),
            advice_type: z.string().nonempty({
              message: 'Advice Type is required'
            }),
            advice_bank: z.number().min(1, {
              message: 'Advice Bank is required'
            }),
            advice_slno: z.number().min(1, {
              message: 'Advice Slno is required'
            }),
            advice_cdno: z.string().nonempty({
              message: 'Advice Cdno is required'
            }),
            advice_amount: z.number().min(1, {
              message: 'Advice Amount is required'
            }),
            trust_id: z.number().min(1, {
              message: 'Trust Id is required'
            }),
});

const radioGroupOptions = [
  {
    value: 'option_1',
    label: 'Option 1'
  },
  {
    value: 'option_2',
    label: 'Option 2'
  },
  {
    value: 'option_3',
    label: 'Option 3'
  }
];
const selectFieldOptions = [
  {
    value: 'option_1',
    label: 'Option 1'
  },
  {
    value: 'option_2',
    label: 'Option 2'
  },
  {
    value: 'option_3',
    label: 'Option 3'
  },
  {
    value: 'option_4',
    label: 'Option 4'
  }
];

//file_id: z.array(z.number()).optional(), // Optional array of file_ids
 

export default function BankAdviceForm({
  setOpen,
  refetchList,
  selectedItem,
  setSelectedItem,
  formType
}: {
  setOpen: (open: boolean) => void;
  refetchList: () => void;
  selectedItem: any;
  setSelectedItem: (item: any) => void;
  formType: string;
}) {

 const [createPfBankAdvice] = useCreatePfBankAdvicePfBankAdvicePostMutation();
 const [updatePfBankAdvice] = useUpdatePfBankAdvicePfBankAdviceIdPutMutation();


//make changes for dropdown field options
        const {
          data: fetchedFinancialYearData,
          refetch: refetchFinancialYearList
        } = useGetAllFinancialYearFinancialYearGetQuery(
          {
            ...tenantIDHeader()
          },
          {
            refetchOnMountOrArgChange: true
          }
        );
        const {
          data: fetchedPfTrustsData,
          refetch: refetchPfTrustsList
        } = useGetAllPfTrustsPfTrustsGetQuery(
          {
            ...tenantIDHeader()
          },
          {
            refetchOnMountOrArgChange: true
          }
        );



//FIXME Default values to Templatize this
const defaultValues = {
         fin_year_id: selectedItem?.fin_year_id || 0,
         advice_date: selectedItem?.advice_date || "",
         advice_type: selectedItem?.advice_type || "",
         advice_bank: selectedItem?.advice_bank || 0,
         advice_slno: selectedItem?.advice_slno || 0,
         advice_cdno: selectedItem?.advice_cdno || "",
         advice_amount: selectedItem?.advice_amount || 0,
         trust_id: selectedItem?.trust_id || 0,
};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedItem) {
      try {
        await updatePfBankAdvice({
           ...tenantIDHeader(),
          id: selectedItem.id,
          pfBankAdviceUpdate: values
        }).unwrap();
        toast.success(`Bank Advice updated successfully`);
        afterSubmit();
      } catch (error) {
        toast.error('Failed to update Bank Advice');
      }
    } else {
      try {
        await createPfBankAdvice({
           ...tenantIDHeader(),
          pfBankAdviceInsert: values
        }).unwrap();
        toast.success(`Bank Advice created successfully`);
        afterSubmit();
      } catch (error) {
        toast.error('Failed to create Bank Advice');
      }
    }
  }

  const afterSubmit = () => {
    form.reset();
    refetchList();
    setSelectedItem(null);
    setOpen(false);
  };

  return (
    <div className='flex w-full flex-col'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className='mx-auto form-dynamic-height w-full items-center justify-end space-x-2 overflow-hidden'> 
            <CardContent className='form-dynamic-height overflow-y-auto px-6'>
                          <div className="mb-6 grid grid-cols-1 gap-6">
                              <Controller
                                control={form.control}
                                name="fin_year_id"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Fin Year Id</FormLabel>
                                    <MultiSelectSearchDropdown
                                      {...field} // Spread the form field props
                                      keyName="fin_year_id"
                                      isSearchable={true}
                                      multiSelect={false}
                                      placeholder='Select...'
                                      control={form.control} // Control passed from react-hook-form
                                      options={
                                         fetchedFinancialYearData?.map((item:any) => ({
                                            label: item.FIXME || "",
                                            value: item.id || "",
                                          })) || selectFieldOptions || []
                                      }
                                    />
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                          </div>
                          <div className="mb-6 grid grid-cols-1 gap-6">
                                <CustomDatePicker
                                  control={form.control}
                                  name='advice_date'
                                  label='Advice Date'
                                  isRequired={false}
                                  viewType='grid'
                                />
                          </div>
                          <div className="mb-6 grid grid-cols-1 gap-6">
                              <FormField
                                control={form.control}
                                name="advice_type"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Advice Type</FormLabel>
                                    <FormControl>
                                      <Input type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                          </div>
                          <div className="mb-6 grid grid-cols-1 gap-6">
                              <FormField
                                control={form.control}
                                name="advice_bank"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Advice Bank</FormLabel>
                                    <FormControl>
                                      <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                          </div>
                          <div className="mb-6 grid grid-cols-1 gap-6">
                              <FormField
                                control={form.control}
                                name="advice_slno"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Advice Slno</FormLabel>
                                    <FormControl>
                                      <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                          </div>
                          <div className="mb-6 grid grid-cols-1 gap-6">
                              <FormField
                                control={form.control}
                                name="advice_cdno"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Advice Cdno</FormLabel>
                                    <FormControl>
                                      <Input type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                          </div>
                          <div className="mb-6 grid grid-cols-1 gap-6">
                              <FormField
                                control={form.control}
                                name="advice_amount"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Advice Amount</FormLabel>
                                    <FormControl>
                                      <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                          </div>
                          <div className="mb-6 grid grid-cols-1 gap-6">
                              <Controller
                                control={form.control}
                                name="trust_id"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Trust Id</FormLabel>
                                    <MultiSelectSearchDropdown
                                      {...field} // Spread the form field props
                                      keyName="trust_id"
                                      isSearchable={true}
                                      multiSelect={false}
                                      placeholder='Select...'
                                      control={form.control} // Control passed from react-hook-form
                                      options={
                                         fetchedPfTrustsData?.map((item:any) => ({
                                            label: item.trust_name || "",
                                            value: item.id || "",
                                          })) || selectFieldOptions || []
                                      }
                                    />
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                          </div>
            </CardContent>
          </Card>
          <FormFooter
            form={form}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            setOpen={setOpen}
          />
       </form>
      </Form>
    </div>
  );
}