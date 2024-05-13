import styles from './styles/Add.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useMainContext } from '../context';
import FixedButton from '../components/FixedButton';
import Slider from '../components/Slider';
import MiniSlider from '../components/MiniSlider';
import Title from '../components/Title';
import FormLIGHT from '../components/FormLIGHT';
import CarView from '../components/CarView';
import FlexVariables from '../components/FlexVariables';
import Button from '../components/Button';
import LoadingHover from '../components/LoadingHover';
import ScrollToError from '../components/ScrollToError';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const validationSchema = Yup.object().shape({
  "input1": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input2": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input3": Yup.string()
    .max(350, 'Макс. длина 350')
    .required("Обязательное поле"),
  "input5": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
});

function AddService() {

  const navigate = useNavigate();

  const { state, setState, accessToken, refreshToken, sendMessage, setLoading, postId, setPostId, message, setMessage } = useMainContext();

  const [ more, setMore ] = useState(false);
  const [ countLoadedImages, setCountLoadedImages ] = useState(null);
  const imagesDivRef = useRef();
  const [ images, setImages ] = useState([]);
  const [ activeImage, setActiveImage ] = useState(0);
  const [ photosError, setPhotosError ] = useState(null);
  const [ images2, setImages2 ] = useState([]);
  const [ activeImage2, setActiveImage2 ] = useState(null);
  const [ photosError2, setPhotosError2 ] = useState(null);
  const [ inputs, setInputs ] = useState({
    "input1": {
      value: null,
      error: null,
      label: "Категория",
      type: "select",
      choices: [
        "Не выбрано",
        "Деньги под залог ПТС",
        "Лизинг автомобилей",
        "Автоюрист бесплатная консультация",
        "Срочная продажа автомобиля",
        "Электронный полис е-ОСАГО",
        "Техническая гарантия на автомобили с пробегом",
        "Автокредит онлайн без первого взноса",
        "Автомобили в рассрочку",
        "Подбор автомобиля",
        "Обмен автомобиля",
        "Выкуп автомобиля",
        "Помощь на дороге",
        "Оформление переоборудования автомобилей",
        "Аукцион автомобилей с пробегом",
        "Диагностическая карта онлайн",
        "Автозапчасти",
        "Онлайн показ автомобиля",
        "Лизинг авто с пробегом",
        "Продажа с гарантией и обеспечительным платежём",
        "Онлайн комиссия",
        "ДТП Онлайн",
        "Комиссионная продажа",
        "Снятие запретов и ограничений",
        "Помощь в покупке",
        "Восстановление КБМ"
      ]
    },
    "input2": {
      value: null,
      isFocused: false,
      error: null,
      label: "Название",
      type: "text",
    },
    "input3": {
      value: null,
      isFocused: false,
      error: null,
      label: "Описание",
      type: "textarea"
    },
    "input4": {
      value: null,
      isFocused: false,
      error: null,
      label: "Адрес предоставления услуг",
      type: "text"
    },
    "input5": {
      value: null,
      isFocused: false,
      error: null,
      label: "Стоимость",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' ₽',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ' ',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 12, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    }
  });
  const [ saving, setSaving ] = useState(false);

  useEffect(() => {
    window.scrollTo({top: 0, smooth: "behavior"});
  }, [])

  useEffect(() => {
    if (!postId) {
      setLoading(true);
      sendMessage(JSON.stringify(["posts", "create"]));
    }
  }, [postId])

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      navigate('/login', {replace: true});
    }
  }, [accessToken, refreshToken])

  const handleSubmit = (values) => {
    if (images.length === 0) {
      setPhotosError("Добавьте хотя бы 1 фотографию");
      return
    }
    images.forEach((image, index) => {
      sendMessage(JSON.stringify(["images", "add", postId, image.file, "main", index]));
    });
    images2.forEach((image, index) => {
      sendMessage(JSON.stringify(["images", "add", postId, image.file, "body", index]));
    });
    sendMessage(JSON.stringify(["posts", "update", postId, {...values, status: 1}]));
    setSaving(true);
  }

  useEffect(() => {
    if (message) {
      if (message[0] === 'posts') {
        if (message[1] === 'new') {
          navigate("/posts/" + postId, {replace: true});
        }
      }
      setMessage(null);
    };
  }, [message]);

  return (
    <div className="view">
      <div className={styles.wrapper} style={{marginBottom: 20}}>
        <Slider images={images}
                imagesDivRef={imagesDivRef}
                setActiveImage={setActiveImage}
                canAdd={true}
                activeImage={activeImage}
                setImages={setImages}
                maxImagesCount={10}
                photosError={photosError}
                setPhotosError={setPhotosError}
                />
        {images.length > 0 &&
          <MiniSlider images={images}
                      imagesDivRef={imagesDivRef}
                      activeImage={activeImage}
                      canAdd={true}
                      setImages={setImages}
                      maxImagesCount={10}
                      />}
      </div>
      <Formik
        initialValues={{
          "input1": "",
          "input2": "",
          "input3": "",
          "input4": "",
          "input5": ""
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
      {({ errors, touched, handleSubmit, values }) => (
        <Form>
          <div className={styles.flex20gap}>
            <FormLIGHT inputs={Object.entries(inputs).slice(0, 1)} setInputs={setInputs} errors={errors} touched={touched} />
            <FormLIGHT inputs={Object.entries(inputs).slice(1, 2)} setInputs={setInputs} errors={errors} touched={touched} />
            <FormLIGHT inputs={Object.entries(inputs).slice(2, 3)} setInputs={setInputs} errors={errors} touched={touched} />
            <FormLIGHT inputs={Object.entries(inputs).slice(3)} setInputs={setInputs} errors={errors} touched={touched} />
            <Button text="Разместить" handleClick={handleSubmit} />
          </div>
          <ScrollToError/>
        </Form>
      )}
      </Formik>
      <FixedButton />
      {saving && <LoadingHover />}
    </div>
  );
}

export default AddService;
