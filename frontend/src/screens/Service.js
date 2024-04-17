import styles from './styles/Service.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
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
  const { accessToken, refreshToken, why, why2 } = useMainContext();
  const [ select, setSelect ] = useState("check");
  const [ inputs2, setInputs2 ] = useState({
    "input1": {
      value: "1 - Республика Адыгея",
      isFocused: false,
      error: null,
      label: "Регион",
      type: "select",
      choices: [
        "1 - Республика Адыгея",
        "2 - Республика Башкортостан",
        "3 - Республика Бурятия",
        "4 - Республика Алтай",
        "5 - Республика Дагестан",
        "6 - Республика Ингушетия",
        "7 - Кабардино-Балкарская республика",
        "8 - Республика Калмыкия",
        "9 - Карачаево-Черкесская республика",
        "10 -	Республика Карелия",
        "11 -	Республика Коми",
        "12 -	Республика Марий Эл",
        "13 -	Республика Мордовия",
        "14 -	Республика Саха (Якутия)",
        "15 -	Республика Северная Осетия — Алания",
        "16 -	Республика Татарстан",
        "17 -	Республика Тыва",
        "18 -	Удмуртская республика",
        "19 -	Республика Хакасия",
        "20 -	Чеченская республика",
        "21 -	Чувашская республика",
        "22 -	Алтайский край",
        "23 -	Краснодарский край",
        "24 -	Красноярский край",
        "25 -	Приморский край",
        "26 -	Ставропольский край",
        "27 -	Хабаровский край",
        "28 -	Амурская область",
        "29 -	Архангельская область",
        "30 -	Астраханская область",
        "31 -	Белгородская область",
        "32 -	Брянская область",
        "33 -	Владимирская область",
        "34 -	Волгоградская область",
        "35 -	Вологодская область",
        "36 -	Воронежская область",
        "37	- Ивановская область",
        "38	- Иркутская область",
        "39	- Калининградская область",
        "40	- Калужская область",
        "41	- Камчатский край",
        "42	- Кемеровская область",
        "43	- Кировская область",
        "44	- Костромская область",
        "45	- Курганская область",
        "46 -	Курская область",
        "47 -	Ленинградская область",
        "48 -	Липецкая область",
        "49 -	Магаданская область",
        "50 -	Московская область",
        "51 -	Мурманская область",
        "52 -	Нижегородская область",
        "53 -	Новгородская область",
        "54 -	Новосибирская область",
        "55	- Омская область",
        "56	- Оренбургская область",
        "57	- Орловская область",
        "58	- Пензенская область",
        "59	- Пермский край",
        "60	- Псковская область",
        "61	- Ростовская область",
        "62	- Рязанская область",
        "63	- Самарская область",
        "64	- Саратовская область",
        "65	- Сахалинская область",
        "66	- Свердловская область",
        "67	- Смоленская область",
        "68	- Тамбовская область",
        "69	- Тверская область",
        "70	- Томская область",
        "71	- Тульская область",
        "72	- Тюменская область",
        "73	- Ульяновская область",
        "74	- Челябинская область",
        "75	- Забайкальский край",
        "76	- Ярославская область",
        "77	- Москва",
        "78	- Санкт-Петербург",
        "79	- Еврейская автономная область",
        "83	- Ненецкий автономный округ",
        "86	- Ханты-Мансийский автономный округ - Югра",
        "87	- Чукотский автономный округ",
        "89	- Ямало-Ненецкий автономный округ",
        "91	- Республика Крым",
        "92	- Севастополь",
      ]
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
      label: "Пробег",
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
      }),
      choices: [
        "км", "мили"
      ],
      selectChoice: "км"
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
      value: "Водительское удостоверение",
      error: null,
      label: "Документ",
      type: "select",
      choices: [
        "Водительское удостоверение",
        "Свидетельство о регистрации СТС"
      ]
    },
    "input2": {
      value: null,
      isFocused: false,
      error: null,
      label: "Номер документа",
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
      value: "1 - Республика Адыгея",
      isFocused: false,
      error: null,
      label: "Регион регистрации ТС",
      type: "select",
      choices: [
        "1 - Республика Адыгея",
        "2 - Республика Башкортостан",
        "3 - Республика Бурятия",
        "4 - Республика Алтай",
        "5 - Республика Дагестан",
        "6 - Республика Ингушетия",
        "7 - Кабардино-Балкарская республика",
        "8 - Республика Калмыкия",
        "9 - Карачаево-Черкесская республика",
        "10 -	Республика Карелия",
        "11 -	Республика Коми",
        "12 -	Республика Марий Эл",
        "13 -	Республика Мордовия",
        "14 -	Республика Саха (Якутия)",
        "15 -	Республика Северная Осетия — Алания",
        "16 -	Республика Татарстан",
        "17 -	Республика Тыва",
        "18 -	Удмуртская республика",
        "19 -	Республика Хакасия",
        "20 -	Чеченская республика",
        "21 -	Чувашская республика",
        "22 -	Алтайский край",
        "23 -	Краснодарский край",
        "24 -	Красноярский край",
        "25 -	Приморский край",
        "26 -	Ставропольский край",
        "27 -	Хабаровский край",
        "28 -	Амурская область",
        "29 -	Архангельская область",
        "30 -	Астраханская область",
        "31 -	Белгородская область",
        "32 -	Брянская область",
        "33 -	Владимирская область",
        "34 -	Волгоградская область",
        "35 -	Вологодская область",
        "36 -	Воронежская область",
        "37	- Ивановская область",
        "38	- Иркутская область",
        "39	- Калининградская область",
        "40	- Калужская область",
        "41	- Камчатский край",
        "42	- Кемеровская область",
        "43	- Кировская область",
        "44	- Костромская область",
        "45	- Курганская область",
        "46 -	Курская область",
        "47 -	Ленинградская область",
        "48 -	Липецкая область",
        "49 -	Магаданская область",
        "50 -	Московская область",
        "51 -	Мурманская область",
        "52 -	Нижегородская область",
        "53 -	Новгородская область",
        "54 -	Новосибирская область",
        "55	- Омская область",
        "56	- Оренбургская область",
        "57	- Орловская область",
        "58	- Пензенская область",
        "59	- Пермский край",
        "60	- Псковская область",
        "61	- Ростовская область",
        "62	- Рязанская область",
        "63	- Самарская область",
        "64	- Саратовская область",
        "65	- Сахалинская область",
        "66	- Свердловская область",
        "67	- Смоленская область",
        "68	- Тамбовская область",
        "69	- Тверская область",
        "70	- Томская область",
        "71	- Тульская область",
        "72	- Тюменская область",
        "73	- Ульяновская область",
        "74	- Челябинская область",
        "75	- Забайкальский край",
        "76	- Ярославская область",
        "77	- Москва",
        "78	- Санкт-Петербург",
        "79	- Еврейская автономная область",
        "83	- Ненецкий автономный округ",
        "86	- Ханты-Мансийский автономный округ - Югра",
        "87	- Чукотский автономный округ",
        "89	- Ямало-Ненецкий автономный округ",
        "91	- Республика Крым",
        "92	- Севастополь",
      ]
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
      value: why,
      isFocused: false,
      error: null,
      label: "Причина обращения",
      type: "text",
      handleClick: () => {
        navigate("/page/1");
      }
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
      value: "Отсутствует",
      isFocused: true,
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
      isFocused: false,
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
  const [ inputs7, setInputs7 ] = useState({
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
      label: "ФИО заявителя ",
      type: "text"
    },
    "input3": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата рождения",
      type: "text"
    },
    "input4": {
      value: null,
      isFocused: false,
      error: null,
      label: "Место рождения",
      type: "text"
    },
    "input5": {
      value: null,
      isFocused: false,
      error: null,
      label: "Адрес проживания",
      type: "text"
    },
    "input6": {
      value: "Паспорт",
      error: null,
      label: "Документ удостоверяющий личность (только для физ. лиц)",
      type: "select",
      choices: [
        "Паспорт"
      ]
    },
    "input7": {
      value: null,
      isFocused: false,
      error: null,
      label: "Серия, номер",
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
      label: "Дата выдачи",
      type: "text"
    },
    "input10": {
      value: null,
      isFocused: false,
      error: null,
      label: "Телефон",
      type: "text"
    },
    "input11": {
      value: null,
      isFocused: false,
      error: null,
      label: "СНИЛС",
      type: "text"
    },
    "input13": {
      value: null,
      isFocused: false,
      error: null,
      label: "Причина обращения",
      type: "text"
    },
    "input14": {
      value: why2,
      isFocused: false,
      error: null,
      label: "в/у в связи с",
      type: "text",
      handleClick: () => {
        navigate("/page/2");
      }
    },
    "input15": {
      value: null,
      isFocused: false,
      error: null,
      label: "К заявлению прилагаю",
      type: "text"
    },
    "input16": {
      value: null,
      isFocused: false,
      error: null,
      label: "Данные в/у",
      type: "text"
    },
    "input17": {
      value: null,
      isFocused: false,
      error: null,
      label: "Кем выдано в/у",
      type: "text"
    },
    "input18": {
      value: "B",
      isFocused: false,
      error: null,
      label: "Категория ТС",
      type: "select",
      choices: [
        "A", "B", "C", "D", "Прицеп"
      ]
    },
    "input19": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата выдачи в/у",
      type: "text"
    },
    "input20": {
      value: null,
      isFocused: false,
      error: null,
      label: "Особые отметки в/у",
      type: "text"
    },
  });
  const [ inputs8, setInputs8 ] = useState({
    "input1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Взамен ПТС 52 МС 531370",
      type: "text"
    },
    "input2": {
      value: null,
      isFocused: false,
      error: null,
      label: "Идентификационный номер (VIN)",
      type: "text"
    },
    "input3": {
      value: null,
      isFocused: false,
      error: null,
      label: "Марка ТС",
      type: "text"
    },
    "input4": {
      value: null,
      isFocused: false,
      error: null,
      label: "Модель ТС",
      type: "text"
    },
    "input5": {
      value: "Легковой",
      isFocused: false,
      error: null,
      label: "Наименование (тип ТС)",
      type: "select",
      choices: [
        "Легковой", "Грузовой"
      ]
    },
    "input6": {
      value: "B",
      isFocused: false,
      error: null,
      label: "Категория ТС",
      type: "select",
      choices: [
        "A", "B", "C", "D", "Прицеп"
      ]
    },
    "input7": {
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
    "input8": {
      value: null,
      isFocused: false,
      error: null,
      label: "Модель / № двигателя",
      type: "text"
    },
    "input9": {
      value: "Отсутствует",
      isFocused: true,
      error: null,
      label: "Шасси (рама) №",
      type: "text"
    },
    "input10": {
      value: null,
      isFocused: false,
      error: null,
      label: "Кузов (кабина, прицеп) №",
      type: "text"
    },
    "input11": {
      value: null,
      isFocused: false,
      error: null,
      label: "Цвет кузова (кабины, прицепа)",
      type: "text"
    },
    "input12": {
      value: null,
      isFocused: false,
      error: null,
      label: "Мощность двигателя",
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
      }),
      choices: [
        "л.с.", "кВт"
      ],
      selectChoice: "л.с."
    },
    "input13": {
      value: null,
      isFocused: false,
      error: null,
      label: "Объем двигателя",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' см3',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 9, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      }),
    },
    "input14": {
      value: "Дизельный",
      isFocused: false,
      error: null,
      label: "Тип двигателя",
      type: "select",
      choices: [
        "Дизельный", "Бензиновый", "Электрический"
      ]
    },
    "input15": {
      value: "Первый",
      isFocused: false,
      error: null,
      label: "Экологический класс",
      type: "select",
      choices: [
        "Первый", "Второй", "Третий"
      ]
    },
    "input16": {
      value: null,
      isFocused: false,
      error: null,
      label: "Разрешенная максимальная масса",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' кг',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 9, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      }),
    },
    "input17": {
      value: null,
      isFocused: false,
      error: null,
      label: "Масса без нагрузки",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' кг',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 9, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      }),
    },
    "input18": {
      value: null,
      isFocused: false,
      error: null,
      label: "Организация-изготовитель ТС (страна)",
      type: "text"
    },
    "input19": {
      value: null,
      isFocused: false,
      error: null,
      label: "Одобрение типа ТС №",
      type: "text"
    },
    "input20": {
      value: null,
      isFocused: false,
      error: null,
      label: "Страна вывоза ТС",
      type: "text"
    },
    "input21": {
      value: null,
      isFocused: false,
      error: null,
      label: "Серия, № ТД, ТПО",
      type: "text"
    },
    "input22": {
      value: null,
      isFocused: false,
      error: null,
      label: "Таможенные ограничения",
      type: "text"
    },
    "input23": {
      value: null,
      isFocused: false,
      error: null,
      label: "Наименование (ф.и.о.) собственника ТС",
      type: "text"
    },
    "input24": {
      value: null,
      isFocused: false,
      error: null,
      label: "Адрес",
      type: "text"
    },
    "input25": {
      value: null,
      isFocused: false,
      error: null,
      label: "Наименование организации, выдавшей паспорт",
      type: "text"
    },
    "input26": {
      value: null,
      isFocused: false,
      error: null,
      label: "Адрес",
      type: "text"
    },
    "input27": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата выдачи паспорта",
      type: "text"
    },
    "input28": {
      value: null,
      isFocused: false,
      error: null,
      label: "Взамен ПТС 52 МС 531370    (Узнать какие есть особые отметки)",
      type: "text"
    },
    "input29": {
      value: null,
      isFocused: false,
      error: null,
      label: "Наименование (ф.и.о.) собственника",
      type: "text"
    },
    "input30": {
      value: null,
      isFocused: false,
      error: null,
      label: "Адрес",
      type: "text"
    },
    "input31": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата продажи (передачи)",
      type: "text"
    },
    "input32": {
      value: null,
      isFocused: false,
      error: null,
      label: "Док-т на право собственности",
      type: "text"
    },
    "input33": {
      value: null,
      isFocused: false,
      error: null,
      label: "СТС серия / номер",
      type: "text"
    },
    "input34": {
      value: null,
      isFocused: false,
      error: null,
      label: "Государственный регистрационный знак",
      type: "text"
    },
    "input35": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата регистрации",
      type: "text"
    },
    "input36": {
      value: null,
      isFocused: false,
      error: null,
      label: "Выдано ГИБДД",
      type: "text"
    },
    "input37": {
      value: null,
      isFocused: false,
      error: null,
      label: "Отметка о снятии с учёта",
      type: "text"
    },
    "input38": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата снятия учёта",
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
  const [ saving, setSaving ] = useState(false);

  useEffect(() => {
    window.scrollTo({top: 0, smooth: "behavior"});
  }, [])

  useEffect(() => {
    setInputs6((prevState) => {
      return {
        ...prevState,
        "input3": {
          ...prevState["input3"],
          isFocused: prevState["input3"].value ? true : false
        },
      };
    });
  }, [why])

  useEffect(() => {
    setInputs7((prevState) => {
      return {
        ...prevState,
        "input14": {
          ...prevState["input14"],
          isFocused: prevState["input14"].value ? true : false
        },
      };
    });
  }, [why2])

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      navigate('/login', {replace: true});
    }
  }, [accessToken, refreshToken])

  const handleSubmit = (values) => {
    alert(JSON.stringify(values))
  }

  return (
    <div className={styles.view}>
      {id === "1" &&
      <div style={{display: "flex", flexFlow: "column", height: "100vh", justifyContent: "center"}}>
        <Title text={`Проверь истории автомобиля`}/>
        <div className={styles.vinsearch}>
          <img src={require("../components/images/search-input.svg").default} alt="search"/>
          <input type="text" placeholder="Укажите госномер, VIN или номер кузова" />
        </div>
        <span className={styles.example}>Пример отчёта</span>
        <Button text="Проверить авто" style={{marginTop: 20}} />
      </div>
      }
      {id === "2" &&
      <>
        <Title text="Оценка стоимости автомобиля"/>
        <Formik
          initialValues={{
            "input1": "1 - Республика Адыгея",
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
              <FormLIGHT inputs={Object.entries(inputs2).slice(1, 11)} setInputs={setInputs2} errors={errors} touched={touched} />
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
        {select == "check" &&
        <>
          <Button text="Выбрать автомобиль" small={true} style={{ margin: "20px 0 20px 0" }} />
          <Formik
            initialValues={{
              "input1": "Водительское удостоверение",
              "input2": "",
              "input3": ""
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
          {({ errors, touched, handleSubmit }) => (
            <Form>
              <div className={styles.flex20gap}>
                <FormLIGHT inputs={Object.entries(inputs4)} setInputs={setInputs4} errors={errors} touched={touched} />
                <Button text="Проверить штрафы" handleClick={handleSubmit} />
              </div>
              <ScrollToError/>
            </Form>
          )}
          </Formik>
        </>}
      </>
      }
      {id === "5" &&
      <>
        <Title text="Калькулятор транспортного налога"/>
        <Formik
          initialValues={{
            "input1": "1 - Республика Адыгея",
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
            "input3": why,
            "input12": "Отсутствует",
            "input45": "когда, кем выдана, номер",
            "input8": "Легковой", 
            "input10": "B", 
            "input13": "Левое", 
            "input22": "Cерия, номер, дата выдачи",
            "input30": "Мужской"
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, handleSubmit }) => (
          <Form>
            <div className={styles.flex20gap}>
              <FormLIGHT inputs={Object.entries(inputs6).slice(0, 3)} setInputs={setInputs6} errors={errors} touched={touched} />
              <FormLIGHT title="Информация о транспортном средстве (номерном агрегате)" inputs={Object.entries(inputs6).slice(3, 22)} setInputs={setInputs6} errors={errors} touched={touched} />
              <FormLIGHT title="Сведения владельца транспортного средства" inputs={Object.entries(inputs6).slice(22, 34)} setInputs={setInputs6} errors={errors} touched={touched} />
              <FormLIGHT title="Представитель владельца транспортного средства" inputs={Object.entries(inputs6).slice(34, 36)} setInputs={setInputs6} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs6).slice(36)} setInputs={setInputs6} errors={errors} touched={touched} />
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
      {id === "7" &&
      <>
        <Title text="Заявление на замену водительского удостоверения"/>
        <Formik
          initialValues={{
            "input1": "",
            "input14": why2,
            "input6": "Паспорт",
            "input18": "B"
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, handleSubmit }) => (
          <Form>
            <div className={styles.flex20gap} style={{marginTop: 10}}>
              <FormLIGHT inputs={Object.entries(inputs7).slice(0, 1)} setInputs={setInputs7} errors={errors} touched={touched} />
              <FormLIGHT title="Информация заявителя" inputs={Object.entries(inputs7).slice(1, 11)} setInputs={setInputs7} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs7).slice(11, 15)} setInputs={setInputs7} errors={errors} touched={touched} />
              <FormLIGHT title="Данные водительского удостоверения" inputs={Object.entries(inputs7).slice(15)} setInputs={setInputs7} errors={errors} touched={touched} />
              <Button text="Скачать заявление" />
            </div>
            <ScrollToError/>
          </Form>
        )}
        </Formik>
      </>
      }
      {id === "8" &&
      <>
        <Title text="Электронный ПТС"/>
        <Formik
          initialValues={{
            "input1": "",
            "input5": "Легковой",
            "input6": "B",
            "input14": "Дизельный",
            "input15": "Первый"
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, handleSubmit }) => (
          <Form>
            <div className={styles.flex20gap} style={{marginTop: 10}}>
              <FormLIGHT title="1-я Страница" inputs={[]} setInputs={setInputs8} errors={errors} touched={touched} />
              <FormLIGHT title="Особые метки" inputs={Object.entries(inputs8).slice(0,1)} setInputs={setInputs8} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs8).slice(1,27)} setInputs={setInputs8} errors={errors} touched={touched} />
              <FormLIGHT title="2, 3, 4-я Страница" inputs={[]} setInputs={setInputs8} errors={errors} touched={touched} />
              <FormLIGHT title="Место записи •1 •2 •3 •4" inputs={[]} setInputs={setInputs8} errors={errors} touched={touched} />
              <FormLIGHT title="Особые метки" inputs={Object.entries(inputs8).slice(27,28)} setInputs={setInputs8} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs8).slice(28, 32)} setInputs={setInputs8} errors={errors} touched={touched} />
              <FormLIGHT title="Свидетельство о регистрации ТС" inputs={Object.entries(inputs8).slice(32)} setInputs={setInputs8} errors={errors} touched={touched} />
              <Button text="Скачать" />
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
