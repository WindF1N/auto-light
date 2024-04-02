import styles from './styles/SignIn.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMainContext } from '../context';
import FixedButton from '../components/FixedButton';
import Button from '../components/Button';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некорректный email')
    .required('Обязательное поле'),

});
const validationSchema2 = Yup.object().shape({
  code: Yup.number()
    .integer('Код должен быть целым числом')
    .min(100000, 'Код должен содержать ровно 6 цифр')
    .max(999999, 'Код должен содержать ровно 6 цифр')
    .required('Обязательное поле')
});

function SignIn() {

  const navigate = useNavigate();

  const { account, setAccount, login, loading, setLoading } = useMainContext();

  const handleSubmit = async (values) => {
    setAccount(values);
    setLoading(true);
    await login(values, navigate);
  }

  return (
    <div className="view">
      <div className={styles.container}>
        <div className={styles.title}>Войти</div>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={errors.email && touched.email ? `${styles.input} ${styles.error}` : `${styles.input}`}>
                  <div className={styles.label}>Введите e-mail</div>
                  <Field name="email">
                    {({ field }) => (
                      <input {...field} type="text" name="email" placeholder="example@example.com" />
                    )}
                  </Field>
                </div>
                {errors.email && touched.email &&
                  <div className={styles.errorLabel}>{errors.email}</div>}
                <button type="submit" className={(!errors.email && touched.email) ? styles.button : styles.buttonBlocked}>Далее</button>
              </Form>
            )}
          </Formik>
      </div>
      <FixedButton />
    </div>
  );
}

export default SignIn;
