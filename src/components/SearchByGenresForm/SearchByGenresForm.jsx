import { IoSearchOutline } from 'react-icons/io5';
import { Field, Formik, Form } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { getGenresList } from '../../utils/tmdb-api';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import toast from 'react-hot-toast';
import css from './SearchByGenresForm.module.css';

const animatedComponents = makeAnimated();

export default function SearchByGenresForm({ lang, onSubmit }) {
  const [genres, setGenres] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const { genres } = await getGenresList(lang);
        setGenres(genres);
      } catch {
        toast.error('Something went wrong, please reload page', {
          duration: 3000,
        });
      }
    })();
  }, [lang]);

  const memoizedGenres = useMemo(
    () =>
      genres.map(genre => {
        return { value: genre.id, label: genre.name };
      }),
    [genres]
  );

  const hanldeSubmit = values => {
    const selectedGenres = values.genres.map(genre => genre.value).join('|');
    onSubmit(selectedGenres);
  };

  return (
    <Formik initialValues={{ genres: [] }} onSubmit={hanldeSubmit}>
      <Form className={css.selectForm}>
        <Field name="genres">
          {({ form, field }) => (
            <Select
              closeMenuOnSelect={false}
              options={memoizedGenres}
              isMulti
              value={field.value || []}
              onChange={selectedOptions => {
                form.setFieldValue(field.name, selectedOptions);
              }}
              isLoading={!genres.length}
              placeholder={t('moviePage.selectPlaceholder')}
              components={animatedComponents}
              className={css.selectField}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  outline: state.isSelected && 'none',
                }),
              }}
            />
          )}
        </Field>
        <button type="submit" className={css.submitBtn}>
          <IoSearchOutline size={24} />
        </button>
      </Form>
    </Formik>
  );
}
