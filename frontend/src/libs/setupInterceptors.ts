import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import instance from './api';

const axiosInstance = () => {
  // Add a request interceptor (optional)
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  //   const { dispatch } = store as Store;

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (err: AxiosError) => {
      const originalConfig = err.config as InternalAxiosRequestConfig;
      // Access Token was expired
      if (originalConfig?.url !== '/' && err?.response) {
        if (err.response.status === 401 && !(originalConfig as any)._retry) {
          (originalConfig as any)._retry = true;
          localStorage.removeItem('accessToken');
          const router = useRouter();
          router.push('/');
          toast.error('Session expired. Please log in again.');
          //   dispatch(userActions.logout());
        }
      }

      return Promise.reject(err);
    }
  );
};
export default axiosInstance;
