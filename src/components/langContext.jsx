import { createContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const langVal = localStorage.getItem('lang');
    if (langVal !== null) return langVal;

    return 'en-US';
  });

  const { i18n } = useTranslation();

  const changeLang = selectedLang => {
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('lang', selectedLang);
  };

  return <LangContext value={(lang, changeLang)}>{children}</LangContext>;
};
