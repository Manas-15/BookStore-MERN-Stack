import store from '../redux/store/store';

export function authHeader() {
  // return authorization header with jwt token
  const state = store.getState();
  let accessToken = state?.authSlice?.token;
  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`
    };
  } else {
    return {};
  }
}

export function tenantIDHeader(): { 'x-tenant-id': string } {
  const state = store.getState();
  let tenantID = (state?.assetSlice?.tenantInfo as unknown as { id: string })
    ?.id;

  if (tenantID) {
    return {
      'x-tenant-id': tenantID
    };
  } else {
    return {
      'x-tenant-id': ''
    };
  }
}
