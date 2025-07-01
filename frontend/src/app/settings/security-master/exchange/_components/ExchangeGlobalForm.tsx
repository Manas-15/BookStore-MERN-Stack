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
} from '@/redux/store/generatedServices/myPfApi';

//FIXME validation schema to Templatize this
const formSchema = z.object({
            name: z.string().nonempty({
              message: 'Name is required'
            }),
            mic_code: z.string().nonempty({
              message: 'Mic Code is required'
            }),
            country: z.string().nonempty({
              message: 'Country is required'
            }),
            timezone: z.string().nonempty({
              message: 'Timezone is required'
            }),
            regulator: z.string().nonempty({
              message: 'Regulator is required'
            }),
            metadata: z.string(),
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

export default function ExchangeGlobalForm({
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

 const [createExchange] = useCreateExchangeExchangePostMutation();
 const [updateExchange] = useUpdateExchangeExchangeIdPutMutation();


//make changes for dropdown field options



//FIXME Default values to Templatize this
const defaultValues = {
         name: selectedItem?.name || "",
         mic_code: selectedItem?.mic_code || "",
         country: selectedItem?.country || "",
         timezone: selectedItem?.timezone || "",
         regulator: selectedItem?.regulator || "",
         metadata: selectedItem?.metadata || "",
};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedItem) {
      try {
        await updateExchange({
           ...tenantIDHeader(),
          id: selectedItem.id,
          exchangeUpdate: values
        }).unwrap();
        toast.success(`Exchange updated successfully`);
        afterSubmit();
      } catch (error) {
        toast.error('Failed to update Exchange');
      }
    } else {
      try {
        await createExchange({
           ...tenantIDHeader(),
          exchangeInsert: values
        }).unwrap();
        toast.success(`Exchange created successfully`);
        afterSubmit();
      } catch (error) {
        toast.error('Failed to create Exchange');
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
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Name</FormLabel>
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
                                name="mic_code"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Mic Code</FormLabel>
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
                                name="country"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Country</FormLabel>
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
                                name="timezone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Timezone</FormLabel>
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
                                name="regulator"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Regulator</FormLabel>
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
                                name="metadata"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Metadata</FormLabel>
                                    <FormControl>
                                      <Input type='text' {...field} />
                                    </FormControl>
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