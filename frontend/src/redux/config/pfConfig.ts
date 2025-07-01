export const config = {
  schemaFile:
    'https://pftrust-dev-api.andolasoft.co.in/api/v1/docs/openapi.json',
  apiFile: '../store/base/myPfBaseApi.ts',
  apiImport: 'myPfBaseApi',
  outputFile: '../store/generatedServices/myPfApi.ts',
  exportName: 'myPfApi',
  hooks: true
};

export default config;
