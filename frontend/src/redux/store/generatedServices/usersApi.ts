import { usersBaseApi as api } from '../base/usersBaseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUserUserAdminGet: build.query<
      GetAllUserUserAdminGetApiResponse,
      GetAllUserUserAdminGetApiArg
    >({
      query: (queryArg) => ({
        url: `/user-admin/`,
        params: {
          order_by: queryArg.orderBy,
          id: queryArg.id,
          first_name: queryArg.firstName,
          first_name__in: queryArg.firstNameIn,
          page: queryArg.page,
          size: queryArg.size,
          get_all: queryArg.getAll
        }
      })
    }),
    getUserAdminIdGet: build.query<
      GetUserAdminIdGetApiResponse,
      GetUserAdminIdGetApiArg
    >({
      query: (queryArg) => ({ url: `/user-admin/${queryArg.id}` })
    }),
    updateUserAdminIdPut: build.mutation<
      UpdateUserAdminIdPutApiResponse,
      UpdateUserAdminIdPutApiArg
    >({
      query: (queryArg) => ({
        url: `/user-admin/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.userProfileUpdate
      })
    }),
    registerUserUserAdminRegisterPost: build.mutation<
      RegisterUserUserAdminRegisterPostApiResponse,
      RegisterUserUserAdminRegisterPostApiArg
    >({
      query: (queryArg) => ({
        url: `/user-admin/register`,
        method: 'POST',
        body: queryArg.baseUserCreate
      })
    })
  }),
  overrideExisting: false
});
export { injectedRtkApi as usersApi };
export type GetAllUserUserAdminGetApiResponse =
  /** status 200 Successful Response */ PaginatedUserBaseResponse;
export type GetAllUserUserAdminGetApiArg = {
  orderBy?: string | null;
  id?: string | null;
  firstName?: string | null;
  firstNameIn?: string | null;
  page?: number;
  size?: number;
  getAll?: boolean;
};
export type GetUserAdminIdGetApiResponse =
  /** status 200 Successful Response */ UserBaseResponse;
export type GetUserAdminIdGetApiArg = {
  id: string;
};
export type UpdateUserAdminIdPutApiResponse =
  /** status 200 Successful Response */ any;
export type UpdateUserAdminIdPutApiArg = {
  id: string;
  userProfileUpdate: UserProfileUpdate;
};
export type RegisterUserUserAdminRegisterPostApiResponse =
  /** status 200 Successful Response */ any;
export type RegisterUserUserAdminRegisterPostApiArg = {
  baseUserCreate: BaseUserCreate;
};
export type UserBaseResponse = {
  id?: string | null;
  file_id?: number | null;
  resource_id?: number | null;
  profile_image?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  user_type?: string | null;
  time_zone?: string | null;
  time_format?: string | null;
  phone_number?: string | null;
  language?: string | null;
  is_active?: number | null;
};
export type PaginatedMeta = {
  current_page: number;
  items_per_page: number;
  total_pages: number;
  total_items: number;
};
export type PaginatedUserBaseResponse = {
  items: UserBaseResponse[];
  meta: PaginatedMeta;
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type UserProfileUpdate = {
  first_name?: string | null;
  last_name?: string | null;
  time_zone?: string | null;
  time_format?: string | null;
  phone_number?: string | null;
  language?: string | null;
  is_active?: number | null;
};
export type BaseUserCreate = {
  email: string;
  password: string;
  is_active?: boolean | null;
  is_superuser?: boolean | null;
  is_verified?: boolean | null;
};
export const {
  useGetAllUserUserAdminGetQuery,
  useGetUserAdminIdGetQuery,
  useUpdateUserAdminIdPutMutation,
  useRegisterUserUserAdminRegisterPostMutation
} = injectedRtkApi;
