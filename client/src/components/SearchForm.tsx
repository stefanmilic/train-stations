import React from 'react';
import { Formik, FormikProps } from 'formik';
import Loader from 'react-loader-spinner';
import * as Yup from 'yup';
import { Form, Datepicker, Input } from 'react-formik-ui';
import { block } from 'bem-cn';
import axios from 'axios';
import moment from 'moment';
import { useSetTrainStationData } from 'src/context/TrainStationContext';

const b = block('search-form');

interface SearchFormProps {
  fromValue: string;
  toValue: string;
  date?: any;
}

const InnerForm = (bag: FormikProps<SearchFormProps>) => {
  return (
    <Form mode='themed' className={String(b({ submit: bag.isSubmitting }))}>
      <Input
        className={b('from-input')}
        label='From'
        onChange={bag.handleChange}
        value={bag.values.fromValue}
        autoComplete='off'
        name='fromValue'
        required
      />
      <Input
        className={b('to-input')}
        label='To'
        onChange={bag.handleChange}
        value={bag.values.toValue}
        autoComplete='off'
        type='text'
        name='toValue'
        required
      />
      <Datepicker
        name='date'
        label='Select a date and time'
        showTimeSelect
        timeFormat='HH:mm'
        timeIntervals={30}
        dateFormat='dd.MM.yyyy HH:mm aa'
        timeCaption='time'
        minDate={new Date()}
      />
      {/* is not by design but i add for better user experiance :) */}
      <button onClick={bag.submitForm} className={b('btn-search')}>
        Search
      </button>
      {bag.isSubmitting && (
        <Loader
          type='ThreeDots'
          color='gray'
          className={String(b('loader'))}
          height={70}
          width={70}
        />
      )}
    </Form>
  );
};

const SearchForm = () => {
  const initialValues: SearchFormProps = {
    fromValue: '',
    toValue: '',
    date: null,
  };
  const setData = useSetTrainStationData();

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={false}
      onSubmit={async (values, actions) => {
        const stringDate = JSON.stringify(values.date);
        const date = moment(JSON.parse(stringDate)).format('YYYY-MM-DD');
        const time = moment(JSON.parse(stringDate)).format('HH:MM');
        // using try catch because of this issiue
        // https://github.com/jaredpalmer/formik/issues/1730
        try {
          // added proxy to package.json, it be enough if put only destination without localhost and port
          // if you using docker use exact url http://localhost:4000
          const { data } = await axios.get(
            'http://localhost:4000/destination',
            {
              params: {
                from: values.fromValue,
                to: values.toValue,
                date: values.date && date,
                time: values.date && time,
              },
            },
          );
          setData(() => ({
            ...data,
          }));
          actions.setSubmitting(false);
        } catch (error) {
          setData(data => ({
            ...data,
            sections: [],
            error:
              'There is not available connection for particular destination!',
          }));
        }
      }}
      validationSchema={Yup.object().shape<SearchFormProps>({
        fromValue: Yup.string().required('From field is required'),
        toValue: Yup.string().required('To field is required'),
        date: Yup.mixed(),
      })}
    >
      {InnerForm}
    </Formik>
  );
};

export default SearchForm;
