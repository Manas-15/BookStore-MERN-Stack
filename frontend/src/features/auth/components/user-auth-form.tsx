'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { setAuth } from '@/redux/store/slices/authSlice';
// import { setTenantInfo } from '@/redux/store/slices/assetSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import * as z from 'zod';
// import GithubSignInButton from './github-auth-button';

const formSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type UserFormValue = z.infer<typeof formSchema>;
export default function UserAuthForm() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   if (fetchedTenantsListData) {
  //     dispatch(setTenantInfo(fetchedTenantsListData));
  //   }
  // }, [fetchedTenantsListData]);

  const defaultValues = {
    email: '',
    password: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    const formData = {
      email: data.email,
      password: data.password
    };

    startTransition(async () => {
      try {
        const url = process.env.NEXT_PUBLIC_REACT_APP_ASSET_API_URL + '/signin';
        const responseData = await axios.post(url, formData);

        if (responseData) {
          const result = await signIn('credentials', {
            email: data.email,
            callbackUrl: callbackUrl ?? '/dashboard'
            // redirect: false
          });
          if ((result as any)?.error) {
            toast.error((result as any).error);
          } else {
            const serializableData = {
              access_token: responseData.data.access_token
            };
            dispatch(setAuth(serializableData)); // Only pass serializable data
            toast.success('Signed In Successfully!');
            // await refetchTenants();
          }
        } else {
          toast.error('Something went wrong');
        }
      } catch (error) {
        console.error('Login failed', error);
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-2'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email...'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter your password'
                      disabled={loading}
                      {...field}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute inset-y-0 right-0 flex items-center pr-3'
                    >
                      {showPassword ? (
                        <Eye className='size-[17px] text-slate-700' />
                      ) : (
                        <EyeOff className='size-[17px] text-slate-700' />
                      )}{' '}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className='ml-auto w-full' type='submit'>
            Sign In
          </Button>
        </form>
      </Form>
      {/* <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div> */}
      {/* <GithubSignInButton /> */}
    </>
  );
}
