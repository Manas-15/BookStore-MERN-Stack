import i18n from 'i18next';

export const getValidationMessage = (key) => {
  return i18n.t(`validation.${key}`);
};
