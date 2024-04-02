import styles from './styles/SignIn.module.css';
import { useState } from 'react';
import { useMainContext } from '../context';
import FixedButton from '../components/FixedButton';
import Button from '../components/Button';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Добавляем регулярное выражение для проверки латиницы, нижнего пробела и точки
const usernameRegex = /^[a-zA-Z0-9._]*$/;

const validationSchemaUsername = Yup.object().shape({
  username: Yup.string()
    .matches(usernameRegex, 'Имя пользователя может содержать только латиницу, нижние пробелы и точки')
    .max(20, 'Максимальная длина никнейма 20 символов')
    .required('Обязательное поле'),
});

const validationSchemaName = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Максимальная длина никнейма 50 символов')
    .required('Обязательное поле'),
});

function LoadUserInfo() {

  const { account, setAccount, login, loading, setLoading, setLoadUserInfo, sendMessage } = useMainContext();

  const handleSubmitUsername = async (values) => {
    sendMessage(JSON.stringify(["user", "update", values]));
    setLoading(true);
  }

  const handleSubmitName = async (values) => {
    sendMessage(JSON.stringify(["user", "update", values]));
    setLoading(true);
  }

  return (
    <div className="view">
      <div className={styles.container}>
        <div className={styles.title}>Добро пожаловать!</div>
          {(!account.username && !account.name) &&
          <Formik
            initialValues={{ username: '' }}
            validationSchema={validationSchemaUsername}
            onSubmit={handleSubmitUsername}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={errors.username && touched.username ? `${styles.input} ${styles.error}` : `${styles.input}`}>
                  <div className={styles.label}>Придумайте никнейм</div>
                  <Field name="username">
                    {({ field }) => (
                      <input {...field} type="text" name="username" placeholder={`Например: ${account.email.split("@")[0]}`} />
                    )}
                  </Field>
                </div>
                {errors.username && touched.username &&
                  <div className={styles.errorLabel}>{errors.username}</div>}
                <button type="submit" className={(!errors.username && touched.username) ? styles.button : styles.buttonBlocked}>Далее</button>
              </Form>
            )}
          </Formik>}
          {(account.username && !account.name) &&
          <Formik
            initialValues={{ name: '' }}
            validationSchema={validationSchemaName}
            onSubmit={handleSubmitName}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={errors.name && touched.name ? `${styles.input} ${styles.error}` : `${styles.input}`}>
                  <div className={styles.label}>Введите имя пользователя</div>
                  <Field name="name">
                    {({ field }) => (
                      <input {...field} type="text" name="name" placeholder={`Ромаданов Владислав`} />
                    )}
                  </Field>
                </div>
                {errors.name && touched.name &&
                  <div className={styles.errorLabel}>{errors.name}</div>}
                <button type="submit" className={(!errors.name && touched.name) ? styles.button : styles.buttonBlocked}>Далее</button>
              </Form>
            )}
          </Formik>}
      </div>
    </div>
  );
}

export default LoadUserInfo;
