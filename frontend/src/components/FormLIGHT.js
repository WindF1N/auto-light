import styles from './styles/FormLIGHT.module.css';
import { Field, useFormikContext } from 'formik';
import { useEffect } from 'react';
import MaskedInput from 'react-text-mask';

function FormLIGHT({ title, inputs, setInputs, errors, touched }) {

  const { setFieldValue } = useFormikContext();

  const handleFocus = (id) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          isFocused: true
        },
      };
    });
  };

  const handleBlur = (id, value) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          isFocused: value ? true : false
        },
      };
    });
  };

  return (
    <div>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.inputs}>
        {inputs.map(([key, value]) => (
          <>
            {value.type === "text" &&
            <div className={styles.input} key={key}>
              <Field name={key}>
                {({ field }) => (
                  <>
                    <label htmlFor={key} className={value.isFocused ? styles.focused : null}>{value.label}</label>
                    {value.mask ?
                      <MaskedInput {...field} type="text"
                                              inputMode='decimal'
                                              mask={value.mask}
                                              onFocus={() => handleFocus(key)}
                                              onBlur={() => handleBlur(key, field.value)}
                                              className={value.error || (errors[key] && touched[key]) ? styles.error : null}
                                              value={field.value}
                      />
                      : <input {...field} type="text"
                                          onFocus={() => handleFocus(key)}
                                          onBlur={() => handleBlur(key, field.value)}
                                          className={value.error || (errors[key] && touched[key]) ? styles.error : null}
                                          value={field.value}
                        />}

                  </>
                )}
              </Field>
              {value.error || (errors[key] && touched[key]) && (
                <div className={styles.errorLabel}>
                    {value.error || errors[key]}
                </div>
              )}
            </div>}
            {value.type === "select" &&
            <Field name={key}>
              {({ field }) => (
                <div className={`${styles.input} ${styles.select} ${value.error || (errors[key] && touched[key]) ? styles.error : null}`} key={key} onClick={() => {
                  document.getElementById(`select${key}`).focus()
                }}>
                  <label htmlFor={key}>{value.label}</label>
                  <div className={field.value === "Не выбрано" ? styles.valueGray : styles.value}>
                    {field.value}
                    <img src={require("./images/arrow-right.svg").default} alt="" />
                  </div>
                  <select {...field} id={`select${key}`}>
                    {value.choices?.map((val, index) => (
                      <option value={val} key={`select${key}${index}`}>{val}</option>
                    ))}
                  </select>
                  {value.error || (errors[key] && touched[key]) && (
                    <div className={styles.errorLabel}>
                        {value.error || errors[key]}
                    </div>
                  )}
                </div>)}
            </Field>}
            {value.type === "radio" &&
            <div className={`${styles.input} ${styles.radio} ${value.error || (errors[key] && touched[key]) ? styles.error : null}`} onClick={(e) => {
              e.stopPropagation();
              document.getElementById(key).click()
            }}>
              <Field name={key}>
                {({ field }) => (
                  <>
                    <label htmlFor={key}>{value.label}</label>
                    <input
                      {...field}
                      id={key}
                      type="checkbox"
                      value={field.value}
                    />
                  </>
                )}
              </Field>
            </div>}
            {value.type === "textarea" &&
            <div className={`${styles.input} ${styles.textarea} ${value.error || (errors[key] && touched[key]) ? styles.error : null}`}>
              <Field name={key}>
                {({ field }) => (
                  <>
                    <label htmlFor={key} className={value.isFocused ? styles.focused : null}>{value.label}</label>
                    <textarea
                      {...field}
                      id={key}
                      onFocus={() => handleFocus(key)}
                      onBlur={() => handleBlur(key, field.value)}
                    >
                    </textarea>
                  </>
                )}
              </Field>
              {value.error || (errors[key] && touched[key]) && (
                <div className={styles.errorLabel}>
                    {value.error || errors[key]}
                </div>
              )}
            </div>}
          </>
        ))}
      </div>
    </div>
  );
}

export default FormLIGHT;
