import styles from './styles/Service.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useMainContext } from '../context';
import FixedButton from '../components/FixedButton';
import Title from '../components/Title';
import FormLIGHT from '../components/FormLIGHT';
import Button from '../components/Button';
import Items from '../components/Items';
import LoadingHover from '../components/LoadingHover';
import ScrollToError from '../components/ScrollToError';
import FlexVariables from '../components/FlexVariables';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const validationSchema = Yup.object().shape({
  "input1": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
});

function Service() {

  const navigate = useNavigate();
  const { id } = useParams();

  const { state, setState, accessToken, refreshToken, sendMessage, setLoading, postId, setPostId, message, setMessage } = useMainContext();
  const [ select, setSelect ] = useState("check");
  const [ more, setMore ] = useState(false);
  const imagesDivRef = useRef();
  const [ images, setImages ] = useState([]);
  const [ activeImage, setActiveImage ] = useState(0);
  const [ photosError, setPhotosError ] = useState(null);
  const [ images2, setImages2 ] = useState([]);
  const [ activeImage2, setActiveImage2 ] = useState(null);
  const [ photosError2, setPhotosError2 ] = useState(null);
  const [ inputs2, setInputs2 ] = useState({
    "input1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Регион",
      type: "text"
    },
    "input2": {
      value: null,
      isFocused: false,
      error: null,
      label: "VIN или номер кузова",
      type: "text"
    },
    "input3": {
      value: null,
      isFocused: false,
      error: null,
      label: "Госномер",
      type: "text"
    },
    "input4": {
      value: null,
      isFocused: false,
      error: null,
      label: "Марка",
      type: "text"
    },
    "input5": {
      value: null,
      isFocused: false,
      error: null,
      label: "Модель",
      type: "text"
    },
    "input6": {
      value: null,
      isFocused: false,
      error: null,
      label: "Год выпуска",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' г',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 4, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
    "input7": {
      value: null,
      isFocused: false,
      error: null,
      label: "Поколение",
      type: "text"
    },
    "input8": {
      value: null,
      isFocused: false,
      error: null,
      label: "Модификация",
      type: "text"
    },
    "input9": {
      value: "Седан",
      isFocused: false,
      error: null,
      label: "Кузов",
      type: "select",
      choices: [
        "Седан", "Универсал", "Хэтчбек", "Лифтбек", "Купе", "Лимузин", "Кабриолет"
      ]
    },
    "input10": {
      value: "Левый",
      isFocused: false,
      error: null,
      label: "Руль",
      type: "select",
      choices: [
        "Левый", "Правый"
      ]
    },
    "input11": {
      value: null,
      isFocused: false,
      error: null,
      label: "Пробег, км",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' км',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 4, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
    "input12": {
      value: "Оригинал",
      isFocused: false,
      error: null,
      label: "ПТС",
      type: "select",
      choices: [
        "Оригинал", "Электронный", "Дубликат", "Нет ПТС"
      ]
    },
    "input13": {
      value: null,
      isFocused: false,
      error: null,
      label: "Владельцев по ПТС",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 4, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
  });
  const [ inputs3, setInputs3 ] = useState({
    "input1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Место составления",
      type: "text"
    },
    "input2": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата составления",
      type: "text"
    },
    "input3": {
      value: null,
      isFocused: false,
      error: null,
      label: "Номер телефона",
      type: "text"
    },
    "input4": {
      value: null,
      isFocused: false,
      error: null,
      label: "ФИО",
      type: "text"
    },
    "input5": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата рождения",
      type: "text"
    },
    "input6": {
      value: null,
      isFocused: false,
      error: null,
      label: "Паспорт серия / номер",
      type: "text"
    },
    "input7": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата выдачи",
      type: "text"
    },
    "input8": {
      value: null,
      isFocused: false,
      error: null,
      label: "Кем выдан",
      type: "text"
    },
    "input9": {
      value: null,
      isFocused: false,
      error: null,
      label: "Адрес регистрации",
      type: "text"
    },
    "input10": {
      value: null,
      isFocused: false,
      error: null,
      label: "Номер телефона",
      type: "text"
    },
    "input11": {
      value: null,
      isFocused: false,
      error: null,
      label: "ФИО",
      type: "text"
    },
    "input12": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата рождения",
      type: "text"
    },
    "input13": {
      value: null,
      isFocused: false,
      error: null,
      label: "Паспорт серия / номер",
      type: "text"
    },
    "input14": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата выдачи",
      type: "text"
    },
    "input15": {
      value: null,
      isFocused: false,
      error: null,
      label: "Кем выдан",
      type: "text"
    },
    "input16": {
      value: null,
      isFocused: false,
      error: null,
      label: "Адрес регистрации",
      type: "text"
    },
    "input17": {
      value: "Легковой",
      isFocused: false,
      error: null,
      label: "Тип ТС",
      type: "select",
      choices: [
        "Легковой", "Грузовой"
      ]
    },
    "input18": {
      value: null,
      isFocused: false,
      error: null,
      label: "VIN номер",
      type: "text"
    },
    "input19": {
      value: null,
      isFocused: false,
      error: null,
      label: "Марка",
      type: "text"
    },
    "input20": {
      value: null,
      isFocused: false,
      error: null,
      label: "Модель",
      type: "text"
    },
    "input21": {
      value: null,
      isFocused: false,
      error: null,
      label: "Год выпуска",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' г',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 4, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
    "input22": {
      value: null,
      isFocused: false,
      error: null,
      label: "Пробег, км",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' км',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 4, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
    "input23": {
      value: null,
      isFocused: false,
      error: null,
      label: "Модель / номер двигателя",
      type: "text"
    },
    "input24": {
      value: null,
      isFocused: false,
      error: null,
      label: "Мощность, л.с.",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' л.с.',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 4, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
    "input25": {
      value: null,
      isFocused: false,
      error: null,
      label: "Объём, л",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' л',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 4, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
    "input26": {
      value: null,
      isFocused: false,
      error: null,
      label: "Номер шасси, рамы",
      type: "text"
    },
    "input27": {
      value: null,
      isFocused: false,
      error: null,
      label: "Номер кузова",
      type: "text"
    },
    "input28": {
      value: "Седан",
      isFocused: false,
      error: null,
      label: "Кузов",
      type: "select",
      choices: [
        "Седан", "Универсал", "Хэтчбек", "Лифтбек", "Купе", "Лимузин", "Кабриолет"
      ]
    },
    "input29": {
      value: null,
      isFocused: false,
      error: null,
      label: "Цвет",
      type: "text"
    },
    "input30": {
      value: null,
      isFocused: false,
      error: null,
      label: "ПТС серия / номер",
      type: "text"
    },
    "input31": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата выдачи",
      type: "text"
    },
    "input32": {
      value: null,
      isFocused: false,
      error: null,
      label: "Кем выдан",
      type: "text"
    },
    "input33": {
      value: null,
      isFocused: false,
      error: null,
      label: "Госномер",
      type: "text"
    },
    "input34": {
      value: null,
      isFocused: false,
      error: null,
      label: "СТС серия / номер",
      type: "text"
    },
    "input35": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата выдачи",
      type: "text"
    },
    "input36": {
      value: null,
      isFocused: false,
      error: null,
      label: "Кем выдан",
      type: "text"
    },
    "input37": {
      value: null,
      isFocused: false,
      error: null,
      label: "Стоимость ТС",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' ₽',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 4, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
    "input38": {
      value: "13.04.2023",
      isFocused: true,
      error: null,
      label: "к Договору купли-продажи автомобиля от",
      type: "text"
    },
    "input39": {
      value: "Паспорт транспортного средства",
      isFocused: false,
      error: null,
      label: "Паспорт транспортного средства",
      type: "radio"
    },
    "input40": {
      value: "СТС",
      isFocused: false,
      error: null,
      label: "СТС",
      type: "radio"
    },
    "input41": {
      value: "Сервисная книжка",
      isFocused: false,
      error: null,
      label: "Сервисная книжка",
      type: "radio"
    },
    "input42": {
      value: "Страховка",
      isFocused: false,
      error: null,
      label: "Страховка",
      type: "radio"
    },
    "input43": {
      value: null,
      isFocused: false,
      error: null,
      label: "",
      type: "text"
    },
  });
  const [ inputs4, setInputs4 ] = useState({
    "input1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Водительское удостоверение",
      type: "text"
    },
    "input2": {
      value: null,
      isFocused: false,
      error: null,
      label: "Номер документа",
      type: "text"
    },
    "input3": {
      value: null,
      isFocused: false,
      error: null,
      label: "Свидетельство о регистрации СТС",
      type: "text"
    },
    "input4": {
      value: null,
      isFocused: false,
      error: null,
      label: "Номер свидетельства",
      type: "text"
    },
    "input5": {
      value: null,
      isFocused: false,
      error: null,
      label: "Гос. номер",
      type: "text"
    },
  });
  const [ inputs5, setInputs5 ] = useState({
    "input1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Регион регистрации ТС",
      type: "text"
    },
    "input2": {
      value: "Не выбрано",
      error: null,
      label: "Вид транспортного средства",
      type: "select",
      choices: [
        "Не выбрано", "Легковые", "Грузовые"
      ]
    },
    "input3": {
      value: null,
      isFocused: false,
      error: null,
      label: "Мощность л.с",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' л.с.',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 4, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
    "input4": {
      value: null,
      isFocused: false,
      error: null,
      label: "Период владения, мес.",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' мес.',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 4, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
    "input5": {
      value: "Не выбрано",
      error: null,
      label: "Повышающий коэффициент на дорогие автомобили",
      type: "select",
      choices: [
        "Не выбрано", "Коэфициент не применяется", "Коэфициент применяется"
      ]
    },
  });
  const [ inputs6, setInputs6 ] = useState({
    "input1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Наименование подразделения ГИБДД",
      type: "text"
    },
    "input2": {
      value: null,
      isFocused: false,
      error: null,
      label: "ФИО заявителя (или его представителя по доверенности)",
      type: "text"
    },
    "input3": {
      value: null,
      isFocused: false,
      error: null,
      label: "Причина обращения",
      type: "text"
    },
    "input4": {
      value: null,
      isFocused: false,
      error: null,
      label: "Государственный регистрационный знак № (при наличии)",
      type: "text"
    },
    "input5": {
      value: null,
      isFocused: false,
      error: null,
      label: "Идентификационный номер (VIN)",
      type: "text"
    },
    "input6": {
      value: null,
      isFocused: false,
      error: null,
      label: "Марка ТС",
      type: "text"
    },
    "input7": {
      value: null,
      isFocused: false,
      error: null,
      label: "Модель ТС",
      type: "text"
    },
    "input8": {
      value: "Легковой",
      isFocused: false,
      error: null,
      label: "Наименование (тип ТС)",
      type: "select",
      choices: [
        "Легковой", "Грузовой"
      ]
    },
    "input9": {
      value: null,
      isFocused: false,
      error: null,
      label: "Цвет кузова",
      type: "text"
    },
    "input10": {
      value: "B",
      isFocused: false,
      error: null,
      label: "Категория ТС",
      type: "select",
      choices: [
        "A", "B", "C", "D", "Прицеп"
      ]
    },
    "input11": {
      value: null,
      isFocused: false,
      error: null,
      label: "Год изготовления ТС",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' г',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 4, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
    "input12": {
      value: null,
      isFocused: false,
      error: null,
      label: "Шасси (рама) №",
      type: "text"
    },
    "input13": {
      value: "Левый",
      isFocused: false,
      error: null,
      label: "Рулевое расположение",
      type: "select",
      choices: [
        "Левое", "Правое"
      ]
    },
    "input14": {
      value: null,
      isFocused: false,
      error: null,
      label: "Кузов (кабина, прицеп) №",
      type: "text"
    },
    "input15": {
      value: null,
      isFocused: false,
      error: null,
      label: "Тип привода",
      type: "text"
    },
    "input16": {
      value: null,
      isFocused: false,
      error: null,
      label: "Тип двигателя",
      type: "text"
    },
    "input17": {
      value: null,
      isFocused: false,
      error: null,
      label: "Тип трансмиссии",
      type: "text"
    },
    "input18": {
      value: null,
      isFocused: false,
      error: null,
      label: "Разрешённая максимальная масса",
      type: "text"
    },
    "input19": {
      value: null,
      isFocused: false,
      error: null,
      label: "Масса без нагрузки",
      type: "text"
    },
    "input20": {
      value: null,
      isFocused: false,
      error: null,
      label: "Паспорт ТС, серия / номер",
      type: "text"
    },
    "input21": {
      value: null,
      isFocused: false,
      error: null,
      label: "Паспорт ТС, дата выдачи",
      type: "text"
    },
    "input22": {
      value: "Cерия, номер, дата выдачи",
      isFocused: true,
      error: null,
      label: "Регистрационный документ ТС (СТС)",
      type: "text"
    },
    "input23": {
      value: null,
      isFocused: true,
      error: null,
      label: "ФИО заявителя или наименование юридического лица",
      type: "text"
    },
    "input24": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата и место рождения или дата регистрации юридического лица",
      type: "text"
    },
    "input25": {
      value: null,
      isFocused: false,
      error: null,
      label: "Документ удостоверяющий личность (только для физ. лиц)",
      type: "text"
    },
    "input26": {
      value: null,
      isFocused: false,
      error: null,
      label: "Серия / номер",
      type: "text"
    },
    "input27": {
      value: null,
      isFocused: false,
      error: null,
      label: "Кем выдан",
      type: "text"
    },
    "input28": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата выдачи",
      type: "text"
    },
    "input29": {
      value: null,
      isFocused: false,
      error: null,
      label: "Гражданство",
      type: "text"
    },
    "input30": {
      value: "Мужской",
      isFocused: false,
      error: null,
      label: "Пол",
      type: "select",
      choices: [
        "Мужской", "Женский"
      ]
    },
    "input31": {
      value: null,
      isFocused: false,
      error: null,
      label: "ИНН",
      type: "text"
    },
    "input32": {
      value: null,
      isFocused: false,
      error: null,
      label: "Адрес места жительства или адрес регистрации юридического лица",
      type: "text"
    },
    "input33": {
      value: null,
      isFocused: false,
      error: null,
      label: "Телефон",
      type: "text"
    },
    "input34": {
      value: null,
      isFocused: false,
      error: null,
      label: "Еmail",
      type: "text"
    },
    "input35": {
      value: "Без представителя, заявление подаётся собственником лично",
      isFocused: false,
      error: null,
      label: "Без представителя, заявление подаётся собственником лично",
      type: "radio"
    },
    "input36": {
      value: "Используется представитель",
      isFocused: false,
      error: null,
      label: "Используется представитель",
      type: "radio"
    },
    "input37": {
      value: null,
      isFocused: false,
      error: null,
      label: "ФИО представителя или наименование юридического лица",
      type: "text"
    },
    "input38": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата рождения представителя или дата регистрации юридического лица",
      type: "text"
    },
    "input39": {
      value: null,
      isFocused: false,
      error: null,
      label: "Документ удостоверяющий личность (только для физ. лиц)",
      type: "text"
    },
    "input40": {
      value: null,
      isFocused: false,
      error: null,
      label: "Серия / номер",
      type: "text"
    },
    "input41": {
      value: null,
      isFocused: false,
      error: null,
      label: "Кем выдан",
      type: "text"
    },
    "input42": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата выдачи",
      type: "text"
    },
    "input43": {
      value: null,
      isFocused: false,
      error: null,
      label: "Адрес места жительства представителя или адрес юр. лица",
      type: "text"
    },
    "input44": {
      value: null,
      isFocused: false,
      error: null,
      label: "Телефон представителя",
      type: "text"
    },
    "input45": {
      value: "когда, кем выдана, номер",
      isFocused: true,
      error: null,
      label: "Данные доверенности",
      type: "text"
    },
  });
  const [variables, setVariables] = useState([
    {
      value: "check",
      label: "Проверить"
    },
    {
      value: "pay",
      label: "Оплатить"
    }
  ]);
  const [ damages, setDamages ] = useState([]);
  const [ saving, setSaving ] = useState(false);

  useEffect(() => {
    window.scrollTo({top: 0, smooth: "behavior"});
  }, [])

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      navigate('/login', {replace: true});
    }
  }, [accessToken, refreshToken])

  const handleSubmit = (values) => {
    alert(JSON.stringify(values))
  }

  const showMore = () => {

  }

  return (
    <div className={styles.view}>
      {id === "1" &&
      <>
        <Title text="Проверка истории автомобиля"/>
        <div className={styles.vinsearch}>
          <img src={require("../components/images/search-input.svg").default} alt="search"/>
          <input type="text" placeholder="Укажите госномер, VIN или номер кузова" />
        </div>
        <span className={styles.example}>Пример отчёта</span>
        <Button text="Проверить авто" style={{marginTop: 20}} />
      </>
      }
      {id === "2" &&
      <>
        <Title text="Оценка стоимости автомобиля"/>
        <Formik
          initialValues={{
            "input1": "",
            "input2": "",
            "input3": "",
            "input4": "",
            "input5": "",
            "input6": "",
            "input7": "",
            "input8": "",
            "input9": "Седан",
            "input10": "Левый",
            "input11": "",
            "input12": "Оригинал",
            "input13": ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, handleSubmit }) => (
          <Form>
            <div className={styles.flex20gap}>
              <FormLIGHT inputs={Object.entries(inputs2).slice(0, 1)} setInputs={setInputs2} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs2).slice(1, 2)} setInputs={setInputs2} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs2).slice(2, 11)} setInputs={setInputs2} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs2).slice(11)} setInputs={setInputs2} errors={errors} touched={touched} />
              <Items items={[
                {
                  label: "Оценка автомобиля",
                  value: "450 000 - 520 000 ₽"
                },
                {
                  label: "Средняя стоимость",
                  value: "499 000 ₽"
                },
              ]} />
            </div>
            <ScrollToError/>
          </Form>
        )}
        </Formik>
      </>
      }
      {id === "3" &&
      <>
        <Title text="Договор купли-продажи"/>
        <Formik
          initialValues={{
            "input1": "",
            "input2": "",
            "input3": "",
            "input4": "",
            "input5": "",
            "input6": "",
            "input7": "",
            "input8": "",
            "input9": "",
            "input10": "",
            "input11": "",
            "input12": "",
            "input13": "",
            "input14": "",
            "input15": "",
            "input16": "",
            "input17": "Легковой",
            "input18": "",
            "input19": "",
            "input20": "",
            "input21": "",
            "input22": "",
            "input23": "",
            "input24": "",
            "input25": "",
            "input26": "",
            "input27": "",
            "input28": "Седан",
            "input29": "",
            "input30": "",
            "input31": "",
            "input32": "",
            "input33": "",
            "input34": "",
            "input35": "",
            "input36": "",
            "input37": "",
            "input38": "13.04.2023",
            "input39": "",
            "input40": "",
            "input41": "",
            "input42": "",
            "input43": "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, handleSubmit }) => (
          <Form>
            <div className={styles.flex20gap}>
              <Button text="Скачать пустой бланк" small={true} />
              <FormLIGHT title="Дата и место составления" inputs={Object.entries(inputs3).slice(0, 2)} setInputs={setInputs3} errors={errors} touched={touched} />
              <FormLIGHT title="Текущий владелец транспортного средства" inputs={Object.entries(inputs3).slice(2, 9)} setInputs={setInputs3} errors={errors} touched={touched} />
              <FormLIGHT title="Покупатель транспортного средства" inputs={Object.entries(inputs3).slice(9, 16)} setInputs={setInputs3} errors={errors} touched={touched} />
              <FormLIGHT title="Транспортное средство" inputs={Object.entries(inputs3).slice(16, 22)} setInputs={setInputs3} errors={errors} touched={touched} />
              <FormLIGHT title="Двигатель" inputs={Object.entries(inputs3).slice(22, 25)} setInputs={setInputs3} errors={errors} touched={touched} />
              <FormLIGHT title="Кузов" inputs={Object.entries(inputs3).slice(25, 29)} setInputs={setInputs3} errors={errors} touched={touched} />
              <FormLIGHT title="Паспорт транспортного средства ПТС" inputs={Object.entries(inputs3).slice(29, 33)} setInputs={setInputs3} errors={errors} touched={touched} />
              <FormLIGHT title="Свидетельство регистрации СТС" inputs={Object.entries(inputs3).slice(33, 36)} setInputs={setInputs3} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs3).slice(36, 37)} setInputs={setInputs3} errors={errors} touched={touched} />
            </div>
            <div style={{marginTop: 20}}>
              <Title text="Акт приёма-передачи"/>
            </div>
            <div className={styles.flex20gap}>
              <FormLIGHT inputs={Object.entries(inputs3).slice(37, 38)} setInputs={setInputs3} errors={errors} touched={touched} />
              <FormLIGHT title="Одновременно с автомобилем, Продавец передал, а покупатель принял следующие документы на автомобиль" inputs={Object.entries(inputs3).slice(38, 42)} setInputs={setInputs3} errors={errors} touched={touched} />
              <FormLIGHT title="А так же следующие запасные части и аксессуары автомобиля" inputs={Object.entries(inputs3).slice(42)} setInputs={setInputs3} errors={errors} touched={touched} />
              <div style={{
                display: "flex",
                alignItems: "center",
                marginTop: -15
              }}>
                <img src={require("../components/images/plus.svg").default} alt="plus" />
                <span style={{fontSize: 13, fontWeight: 300}}>Добавить строку</span>
              </div>
              <div style={{display: "flex", gap: "10px"}}>
                <Button text="Скачать пустой бланк" />
                <Button text="Скачать договор" />
              </div>
            </div>
            <ScrollToError/>
          </Form>
        )}
        </Formik>
      </>
      }
      {id === "4" &&
      <>
        <Title text="Проверить и оплатить штрафы ГИБДД"/>
        <FlexVariables variables={variables} select={select} setSelect={setSelect} />
        <Button text="Выбрать автомобиль" small={true} style={{ margin: "20px 0 20px 0" }} />
        <Formik
          initialValues={{
            "input1": "",
            "input2": "",
            "input3": "",
            "input4": "",
            "input5": "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, handleSubmit }) => (
          <Form>
            <div className={styles.flex20gap}>
              <FormLIGHT inputs={Object.entries(inputs4).slice(0, 2)} setInputs={setInputs4} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs4).slice(2, 5)} setInputs={setInputs4} errors={errors} touched={touched} />
              <Button text="Проверить штрафы" handleClick={handleSubmit} />
            </div>
            <ScrollToError/>
          </Form>
        )}
        </Formik>
      </>
      }
      {id === "5" &&
      <>
        <Title text="Калькулятор транспортного налога"/>
        <Formik
          initialValues={{
            "input1": "",
            "input2": "Не выбрано",
            "input3": "",
            "input4": "",
            "input5": "Не выбрано",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, handleSubmit }) => (
          <Form>
            <div className={styles.flex20gap}>
              <FormLIGHT inputs={Object.entries(inputs5).slice(0, 5)} setInputs={setInputs5} errors={errors} touched={touched} />
              <Button text="Рассчитать" handleClick={handleSubmit} />
              <Items items={[
                {
                  label: "Налоговая ставка",
                  value: "150,00 руб/л.с."
                },
                {
                  label: "Сумма налога",
                  value: "39 900,00 ₽"
                },
              ]} />
            </div>
            <ScrollToError/>
          </Form>
        )}
        </Formik>
      </>
      }
      {id === "6" &&
      <>
        <Title text="Заявление в ГИБДД"/>
        <Formik
          initialValues={{
            "input1": "",
            "input45": "когда, кем выдана, номер",
            "input8": "Легковой", 
            "input10": "B", 
            "input13": "Левое", 
            "input30": "Мужской"
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, handleSubmit }) => (
          <Form>
            <div className={styles.flex20gap}>
              <FormLIGHT inputs={Object.entries(inputs6).slice(0, 3)} setInputs={setInputs6} errors={errors} touched={touched} />
              <FormLIGHT title="Информация о транспортном средстве (номерном агрегате)" inputs={Object.entries(inputs6).slice(3, 3)} setInputs={setInputs6} errors={errors} touched={touched} />
              <div>Бланк заявления в ГИБДД печатайте обязательно на одном листе А4 с двух сторон</div>
              <div style={{display: "flex", gap: "10px"}}>
                <Button text="Скачать заявление" />
                <Button text="Сохранить" />
              </div>
            </div>
            <ScrollToError/>
          </Form>
        )}
        </Formik>
      </>
      }
      <FixedButton />
      {saving && <LoadingHover />}
    </div>
  );
}

export default Service;
