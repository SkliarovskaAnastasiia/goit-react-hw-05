import { IoSearchOutline } from 'react-icons/io5';
import { Formik, Form, Field } from 'formik';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import css from './SearchByNameForm.module.css';

export default function SearchByNameForm({ onSubmit }) {
  const inputRef = useRef();
  const { t } = useTranslation();

  const handleSubmit = (values, action) => {
    const query = values.query.trim();
    onSubmit(query);

    document.activeElement.blur();
    action.resetForm();
  };

  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form className={css.form}>
        <Field
          className={css.formField}
          type="text"
          name="query"
          autoComplete="off"
          ref={inputRef}
          placeholder={t('moviePage.formPlaceholder')}
        />
        <button className={css.formBtn} type="submit">
          <IoSearchOutline size={24} />
        </button>
      </Form>
    </Formik>
  );
}
