import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'en',
    fallbacking: 'en',
    returnObjects: true,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    }
  });

export default i18n;
