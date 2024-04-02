import styles from './styles/SignIn.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMainContext } from '../context';
import FixedButton from '../components/FixedButton';
import Button from '../components/Button';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  code: Yup.number()
    .integer('Код должен быть целым числом')
    .max(999999, 'Код должен содержать ровно 6 цифр')
    .required('Обязательное поле')
});

function Verify() {

  const navigate = useNavigate();

  const { account, setAccount, verify, resendCode, loading, setLoading, verifyCodeId } = useMainContext();

  const [ timoutSendAgain, setTimeoutSendAgain ] = useState(60);

  const handleSubmit = async (values) => {
    setLoading(true);
    await verify({email: account?.email, code: Number(values.code), code_id: verifyCodeId}, navigate);
  }

  const sendCodeAgain = async () => {
    setTimeoutSendAgain(60);
    await resendCode({email: account?.email, code_id: verifyCodeId})
  }

  useEffect(() => {
    if (timoutSendAgain > 0) {
      setTimeout(() => {
        setTimeoutSendAgain(timoutSendAgain - 1);
      }, 1000)
    }
  }, [timoutSendAgain])

  return (
    <div className="view">
      <div className={styles.container}>
        <div className={styles.title}>Войти</div>
          <Formik
            initialValues={{ code: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={errors.code && touched.code ? `${styles.input} ${styles.error}` : `${styles.input}`}>
                  <div className={styles.label}>Введите 6-ти значный код, отправленный на <b>{account?.email}</b></div>
                  <Field name="code">
                    {({ field }) => (
                      <input {...field} type="text" name="code" placeholder="000000" inputMode="numeric" />
                    )}
                  </Field>
                </div>
                {errors.code && touched.code &&
                  <div className={styles.errorLabel}>{errors.code}</div>}
                <button type="submit" className={(!errors.code && touched.code) ? styles.button : styles.buttonBlocked}>Далее</button>
                {timoutSendAgain > 0 ?
                  <button type="button" className={styles.buttonBlocked}>Отправить код ещё раз {timoutSendAgain}</button>
                  : <button type="button" className={styles.button} onClick={sendCodeAgain}>Отправить код ещё раз</button>}
              </Form>
            )}
          </Formik>
      </div>
      <FixedButton />
    </div>
  );
}

export default Verify;
