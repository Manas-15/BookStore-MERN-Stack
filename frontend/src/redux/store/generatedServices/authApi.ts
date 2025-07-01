import { authBaseApi as api } from '../base/authBaseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    globalSearchV1GlobalSearchSearchTextGet: build.query<
      GlobalSearchV1GlobalSearchSearchTextGetApiResponse,
      GlobalSearchV1GlobalSearchSearchTextGetApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/globalSearch/${queryArg.searchText}`
      })
    }),
    authJwtLoginV1AuthJwtLoginPost: build.mutation<
      AuthJwtLoginV1AuthJwtLoginPostApiResponse,
      AuthJwtLoginV1AuthJwtLoginPostApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/auth/jwt/login`,
        method: 'POST',
        body: queryArg.bodyAuthJwtLoginV1AuthJwtLoginPost
      })
    }),
    authJwtLogoutV1AuthJwtLogoutPost: build.mutation<
      AuthJwtLogoutV1AuthJwtLogoutPostApiResponse,
      AuthJwtLogoutV1AuthJwtLogoutPostApiArg
    >({
      query: () => ({ url: `/v1/auth/jwt/logout`, method: 'POST' })
    }),
    registerRegisterV1AuthRegisterPost: build.mutation<
      RegisterRegisterV1AuthRegisterPostApiResponse,
      RegisterRegisterV1AuthRegisterPostApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/auth/register`,
        method: 'POST',
        body: queryArg.userCreate
      })
    }),
    resetForgotPasswordV1AuthForgotPasswordPost: build.mutation<
      ResetForgotPasswordV1AuthForgotPasswordPostApiResponse,
      ResetForgotPasswordV1AuthForgotPasswordPostApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/auth/forgot-password`,
        method: 'POST',
        body: queryArg.bodyResetForgotPasswordV1AuthForgotPasswordPost
      })
    }),
    resetResetPasswordV1AuthResetPasswordPost: build.mutation<
      ResetResetPasswordV1AuthResetPasswordPostApiResponse,
      ResetResetPasswordV1AuthResetPasswordPostApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/auth/reset-password`,
        method: 'POST',
        body: queryArg.bodyResetResetPasswordV1AuthResetPasswordPost
      })
    }),
    verifyRequestTokenV1AuthRequestVerifyTokenPost: build.mutation<
      VerifyRequestTokenV1AuthRequestVerifyTokenPostApiResponse,
      VerifyRequestTokenV1AuthRequestVerifyTokenPostApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/auth/request-verify-token`,
        method: 'POST',
        body: queryArg.bodyVerifyRequestTokenV1AuthRequestVerifyTokenPost
      })
    }),
    verifyVerifyV1AuthVerifyPost: build.mutation<
      VerifyVerifyV1AuthVerifyPostApiResponse,
      VerifyVerifyV1AuthVerifyPostApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/auth/verify`,
        method: 'POST',
        body: queryArg.bodyVerifyVerifyV1AuthVerifyPost
      })
    }),
    usersCurrentUserV1UsersMeGet: build.query<
      UsersCurrentUserV1UsersMeGetApiResponse,
      UsersCurrentUserV1UsersMeGetApiArg
    >({
      query: () => ({ url: `/v1/users/me` })
    }),
    usersPatchCurrentUserV1UsersMePatch: build.mutation<
      UsersPatchCurrentUserV1UsersMePatchApiResponse,
      UsersPatchCurrentUserV1UsersMePatchApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/users/me`,
        method: 'PATCH',
        body: queryArg.userUpdate
      })
    }),
    usersUserV1UsersIdGet: build.query<
      UsersUserV1UsersIdGetApiResponse,
      UsersUserV1UsersIdGetApiArg
    >({
      query: (queryArg: any) => ({ url: `/v1/users/${queryArg.id}` })
    }),
    usersPatchUserV1UsersIdPatch: build.mutation<
      UsersPatchUserV1UsersIdPatchApiResponse,
      UsersPatchUserV1UsersIdPatchApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/users/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.userUpdate
      })
    }),
    usersDeleteUserV1UsersIdDelete: build.mutation<
      UsersDeleteUserV1UsersIdDeleteApiResponse,
      UsersDeleteUserV1UsersIdDeleteApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/users/${queryArg.id}`,
        method: 'DELETE'
      })
    }),
    oauthGoogleJwtAuthorizeV1AuthGoogleAuthorizeGet: build.query<
      OauthGoogleJwtAuthorizeV1AuthGoogleAuthorizeGetApiResponse,
      OauthGoogleJwtAuthorizeV1AuthGoogleAuthorizeGetApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/auth/google/authorize`,
        params: {
          scopes: queryArg.scopes
        }
      })
    }),
    oauthGoogleJwtCallbackV1AuthGoogleCallbackGet: build.query<
      OauthGoogleJwtCallbackV1AuthGoogleCallbackGetApiResponse,
      OauthGoogleJwtCallbackV1AuthGoogleCallbackGetApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/auth/google/callback`,
        params: {
          code: queryArg.code,
          code_verifier: queryArg.codeVerifier,
          state: queryArg.state,
          error: queryArg.error
        }
      })
    }),
    oauthAssociateGoogleAuthorizeV1AuthAssociateGoogleAuthorizeGet: build.query<
      OauthAssociateGoogleAuthorizeV1AuthAssociateGoogleAuthorizeGetApiResponse,
      OauthAssociateGoogleAuthorizeV1AuthAssociateGoogleAuthorizeGetApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/auth/associate/google/authorize`,
        params: {
          scopes: queryArg.scopes
        }
      })
    }),
    oauthAssociateGoogleCallbackV1AuthAssociateGoogleCallbackGet: build.query<
      OauthAssociateGoogleCallbackV1AuthAssociateGoogleCallbackGetApiResponse,
      OauthAssociateGoogleCallbackV1AuthAssociateGoogleCallbackGetApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/auth/associate/google/callback`,
        params: {
          code: queryArg.code,
          code_verifier: queryArg.codeVerifier,
          state: queryArg.state,
          error: queryArg.error
        }
      })
    }),
    changePasswordV1AuthChangePasswordPut: build.mutation<
      ChangePasswordV1AuthChangePasswordPutApiResponse,
      ChangePasswordV1AuthChangePasswordPutApiArg
    >({
      query: (queryArg: any) => ({
        url: `/v1/auth/change-password`,
        method: 'PUT',
        body: queryArg.userPasswordUpdate
      })
    })
  }),
  overrideExisting: false
});
export { injectedRtkApi as authApi };
export type GlobalSearchV1GlobalSearchSearchTextGetApiResponse =
  /** status 200 Successful Response */ any;
export type GlobalSearchV1GlobalSearchSearchTextGetApiArg = {
  searchText: string;
};
export type AuthJwtLoginV1AuthJwtLoginPostApiResponse =
  /** status 200 Successful Response */ BearerResponse;
export type AuthJwtLoginV1AuthJwtLoginPostApiArg = {
  bodyAuthJwtLoginV1AuthJwtLoginPost: BodyAuthJwtLoginV1AuthJwtLoginPost;
};
export type AuthJwtLogoutV1AuthJwtLogoutPostApiResponse =
  /** status 200 Successful Response */ any;
export type AuthJwtLogoutV1AuthJwtLogoutPostApiArg = void;
export type RegisterRegisterV1AuthRegisterPostApiResponse =
  /** status 201 Successful Response */ UserRead;
export type RegisterRegisterV1AuthRegisterPostApiArg = {
  userCreate: UserCreate;
};
export type ResetForgotPasswordV1AuthForgotPasswordPostApiResponse =
  /** status 202 Successful Response */ any;
export type ResetForgotPasswordV1AuthForgotPasswordPostApiArg = {
  bodyResetForgotPasswordV1AuthForgotPasswordPost: BodyResetForgotPasswordV1AuthForgotPasswordPost;
};
export type ResetResetPasswordV1AuthResetPasswordPostApiResponse =
  /** status 200 Successful Response */ any;
export type ResetResetPasswordV1AuthResetPasswordPostApiArg = {
  bodyResetResetPasswordV1AuthResetPasswordPost: BodyResetResetPasswordV1AuthResetPasswordPost;
};
export type VerifyRequestTokenV1AuthRequestVerifyTokenPostApiResponse =
  /** status 202 Successful Response */ any;
export type VerifyRequestTokenV1AuthRequestVerifyTokenPostApiArg = {
  bodyVerifyRequestTokenV1AuthRequestVerifyTokenPost: BodyVerifyRequestTokenV1AuthRequestVerifyTokenPost;
};
export type VerifyVerifyV1AuthVerifyPostApiResponse =
  /** status 200 Successful Response */ UserRead;
export type VerifyVerifyV1AuthVerifyPostApiArg = {
  bodyVerifyVerifyV1AuthVerifyPost: BodyVerifyVerifyV1AuthVerifyPost;
};
export type UsersCurrentUserV1UsersMeGetApiResponse =
  /** status 200 Successful Response */ UserRead;
export type UsersCurrentUserV1UsersMeGetApiArg = void;
export type UsersPatchCurrentUserV1UsersMePatchApiResponse =
  /** status 200 Successful Response */ UserRead;
export type UsersPatchCurrentUserV1UsersMePatchApiArg = {
  userUpdate: UserUpdate;
};
export type UsersUserV1UsersIdGetApiResponse =
  /** status 200 Successful Response */ UserRead;
export type UsersUserV1UsersIdGetApiArg = {
  id: string;
};
export type UsersPatchUserV1UsersIdPatchApiResponse =
  /** status 200 Successful Response */ UserRead;
export type UsersPatchUserV1UsersIdPatchApiArg = {
  id: string;
  userUpdate: UserUpdate;
};
export type UsersDeleteUserV1UsersIdDeleteApiResponse = unknown;
export type UsersDeleteUserV1UsersIdDeleteApiArg = {
  id: string;
};
export type OauthGoogleJwtAuthorizeV1AuthGoogleAuthorizeGetApiResponse =
  /** status 200 Successful Response */ OAuth2AuthorizeResponse;
export type OauthGoogleJwtAuthorizeV1AuthGoogleAuthorizeGetApiArg = {
  scopes?: string[];
};
export type OauthGoogleJwtCallbackV1AuthGoogleCallbackGetApiResponse =
  /** status 200 Successful Response */ any;
export type OauthGoogleJwtCallbackV1AuthGoogleCallbackGetApiArg = {
  code?: string | null;
  codeVerifier?: string | null;
  state?: string | null;
  error?: string | null;
};
export type OauthAssociateGoogleAuthorizeV1AuthAssociateGoogleAuthorizeGetApiResponse =
  /** status 200 Successful Response */ OAuth2AuthorizeResponse;
export type OauthAssociateGoogleAuthorizeV1AuthAssociateGoogleAuthorizeGetApiArg =
  {
    scopes?: string[];
  };
export type OauthAssociateGoogleCallbackV1AuthAssociateGoogleCallbackGetApiResponse =
  /** status 200 Successful Response */ UserRead;
export type OauthAssociateGoogleCallbackV1AuthAssociateGoogleCallbackGetApiArg =
  {
    code?: string | null;
    codeVerifier?: string | null;
    state?: string | null;
    error?: string | null;
  };
export type ChangePasswordV1AuthChangePasswordPutApiResponse =
  /** status 200 Successful Response */ any;
export type ChangePasswordV1AuthChangePasswordPutApiArg = {
  userPasswordUpdate: UserPasswordUpdate;
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type BearerResponse = {
  access_token: string;
  token_type: string;
};
export type ErrorModel = {
  detail:
    | string
    | {
        [key: string]: string;
      };
};
export type BodyAuthJwtLoginV1AuthJwtLoginPost = {
  grant_type?: string | null;
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
};
export type UserRead = {
  id: string;
  email: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verified?: boolean;
};
export type UserCreate = {
  email: string;
  password: string;
  is_active?: boolean | null;
  is_superuser?: boolean | null;
  is_verified?: boolean | null;
  invite_token?: string | null;
  first_name?: string | null;
  last_name?: string | null;
};
export type BodyResetForgotPasswordV1AuthForgotPasswordPost = {
  email: string;
};
export type BodyResetResetPasswordV1AuthResetPasswordPost = {
  token: string;
  password: string;
};
export type BodyVerifyRequestTokenV1AuthRequestVerifyTokenPost = {
  email: string;
};
export type BodyVerifyVerifyV1AuthVerifyPost = {
  token: string;
};
export type UserUpdate = {
  password?: string | null;
  email?: string | null;
  is_active?: boolean | null;
  is_superuser?: boolean | null;
  is_verified?: boolean | null;
};
export type OAuth2AuthorizeResponse = {
  authorization_url: string;
};
export type UserPasswordUpdate = {
  current_password: string;
  new_password: string;
};
export const {
  useGlobalSearchV1GlobalSearchSearchTextGetQuery,
  useAuthJwtLoginV1AuthJwtLoginPostMutation,
  useAuthJwtLogoutV1AuthJwtLogoutPostMutation,
  useRegisterRegisterV1AuthRegisterPostMutation,
  useResetForgotPasswordV1AuthForgotPasswordPostMutation,
  useResetResetPasswordV1AuthResetPasswordPostMutation,
  useVerifyRequestTokenV1AuthRequestVerifyTokenPostMutation,
  useVerifyVerifyV1AuthVerifyPostMutation,
  useUsersCurrentUserV1UsersMeGetQuery,
  useUsersPatchCurrentUserV1UsersMePatchMutation,
  useUsersUserV1UsersIdGetQuery,
  useUsersPatchUserV1UsersIdPatchMutation,
  useUsersDeleteUserV1UsersIdDeleteMutation,
  useOauthGoogleJwtAuthorizeV1AuthGoogleAuthorizeGetQuery,
  useOauthGoogleJwtCallbackV1AuthGoogleCallbackGetQuery,
  useOauthAssociateGoogleAuthorizeV1AuthAssociateGoogleAuthorizeGetQuery,
  useOauthAssociateGoogleCallbackV1AuthAssociateGoogleCallbackGetQuery,
  useChangePasswordV1AuthChangePasswordPutMutation
} = injectedRtkApi;
