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
import Button from '../components/Button';
import LoadingHover from '../components/LoadingHover';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const validationSchema = Yup.object().shape({
  "input1": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input7": Yup.string()
    .max(10, 'Макс. длина 10')
    .required("Обязательное поле"),
  "input8": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input17": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input21": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input13": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input11": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input10": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input19": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input18": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input14": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input9": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input16": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input15": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input2": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input5": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input6": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
  "input39": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле"),
});

function Add() {

  const navigate = useNavigate();

  const { state, setState, accessToken, refreshToken, sendMessage, setLoading, postId, setPostId, message, setMessage } = useMainContext();

  const [ more, setMore ] = useState(false);
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
      isFocused: false,
      error: null,
      label: "Категория",
      type: "select",
      choices: [
        "Автомобили"
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
      label: "Ссылка с источника",
      type: "text"
    },
    "input5": {
      value: null,
      isFocused: false,
      error: null,
      label: "Марка",
      type: "text"
    },
    "input6": {
      value: null,
      isFocused: false,
      error: null,
      label: "Модель",
      type: "text"
    },
    "input7": {
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
    "input8": {
      value: null,
      isFocused: false,
      error: null,
      label: "Поколение",
      type: "text"
    },
    "input9": {
      value: null,
      isFocused: false,
      error: null,
      label: "Кузов",
      type: "select",
      choices: [
        "Седан", "Универсал", "Хэтчбек", "Лифтбек", "Купе", "Лимузин", "Кабриолет"
      ]
    },
    "input10": {
      value: null,
      isFocused: false,
      error: null,
      label: "Двигатель",
      type: "select",
      choices: [
        "Бензин", "Дизель", "Гибрид", "Электро"
      ]
    },
    "input11": {
      value: null,
      isFocused: false,
      error: null,
      label: "Объём л.",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' л',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '',
        allowDecimal: true,
        decimalSymbol: ',',
        decimalLimit: 2, // количество знаков после запятой
        integerLimit: 4, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
    "input12": {
      value: null,
      isFocused: false,
      error: null,
      label: "Мощность (л.с.)",
      type: "text"
    },
    "input13": {
      value: null,
      isFocused: false,
      error: null,
      label: "Модификация",
      type: "text"
    },
    "input14": {
      value: null,
      isFocused: false,
      error: null,
      label: "Комплектация",
      type: "text"
    },
    "input15": {
      value: null,
      isFocused: false,
      error: null,
      label: "Руль",
      type: "select",
      choices: [
        "Левый", "Правый"
      ]
    },
    "input16": {
      value: null,
      isFocused: false,
      error: null,
      label: "Цвет",
      type: "text"
    },
    "input17": {
      value: null,
      isFocused: false,
      error: null,
      label: "Пробег, км",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' км',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ' ',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 12, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
    "input18": {
      value: null,
      isFocused: false,
      error: null,
      label: "Привод",
      type: "select",
      choices: [
        "Передний", "Задний", "Полный", "Гибридный"
      ]
    },
    "input19": {
      value: null,
      isFocused: false,
      error: null,
      label: "Коробка",
      type: "select",
      choices: [
        "Механика", "Автомат"
      ]
    },
    "input20": {
      value: null,
      isFocused: false,
      error: null,
      label: "ПТС",
      type: "radio"
    },
    "input21": {
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
    "input22": {
      value: "СТС",
      isFocused: false,
      error: null,
      label: "СТС",
      type: "radio"
    },
    "input23": {
      value: "Не выбрано",
      error: null,
      label: "Страховка",
      type: "select",
      choices: [
        "Не выбрано", "Отсутствует", "ОСАГО", "КАСКО"
      ]
    },
    "input24": {
      value: "Сервисная книжка",
      isFocused: false,
      error: null,
      label: "Сервисная книжка",
      type: "radio"
    },
    "input25": {
      value: null,
      isFocused: false,
      error: null,
      label: "Статус",
      type: "text"
    },
    "input26": {
      value: "Без пробега по РФ",
      isFocused: false,
      error: null,
      label: "Без пробега по РФ",
      type: "radio"
    },
    "input27": {
      value: "Авто не на учёте в РФ",
      isFocused: false,
      error: null,
      label: "Авто не на учёте в РФ",
      type: "radio"
    },
    "input28": {
      value: "Документы с проблемами",
      isFocused: false,
      error: null,
      label: "Документы с проблемами",
      type: "radio"
    },
    "input29": {
      value: "Требует ремонт или не находу",
      isFocused: false,
      error: null,
      label: "Требует ремонт или не находу",
      type: "radio"
    },
    "input30": {
      value: "На гарантии",
      isFocused: false,
      error: null,
      label: "На гарантии",
      type: "radio"
    },
    "input31": {
      value: "Обслуживался у дилера",
      isFocused: false,
      error: null,
      label: "Обслуживался у дилера",
      type: "radio"
    },
    "input32": {
      value: null,
      isFocused: false,
      error: null,
      label: "Описание",
      type: "textarea"
    },
    "input33": {
      value: "Онлайн показ",
      isFocused: false,
      error: null,
      label: "Онлайн показ",
      type: "radio"
    },
    "input34": {
      value: "Обмен возможен",
      isFocused: false,
      error: null,
      label: "Обмен возможен",
      type: "radio"
    },
    "input35": {
      value: null,
      isFocused: false,
      error: null,
      label: "Цена клиента/Выкупа",
      type: "text"
    },
    "input36": {
      value: null,
      isFocused: false,
      error: null,
      label: "Подготовка",
      type: "text"
    },
    "input37": {
      value: null,
      isFocused: false,
      error: null,
      label: "Затраты",
      type: "text"
    },
    "input38": {
      value: null,
      isFocused: false,
      error: null,
      label: "Рекомендуемая цена продажи",
      type: "text"
    },
    "input39": {
      value: null,
      isFocused: false,
      error: null,
      label: "Согласованная цена продажи",
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
    },
    "input40": {
      value: null,
      isFocused: false,
      error: null,
      label: "Маржа",
      type: "text"
    },
    "input41": {
      value: null,
      isFocused: false,
      error: null,
      label: "Скорость продажи",
      type: "text"
    },
    "input42": {
      value: null,
      isFocused: false,
      error: null,
      label: "Просмотров в сутки",
      type: "text"
    },
    "input43": {
      value: null,
      isFocused: false,
      error: null,
      label: "Вид объявления",
      type: "text"
    },
    "input44": {
      value: "Собственник",
      isFocused: false,
      error: null,
      label: "Собственник",
      type: "radio"
    },
    "input45": {
      value: "Частник",
      isFocused: false,
      error: null,
      label: "Частник",
      type: "radio"
    },
    "input46": {
      value: "Компания",
      isFocused: false,
      error: null,
      label: "Компания",
      type: "radio"
    },
    "input47": {
      value: "Авито",
      isFocused: false,
      error: null,
      label: "Авито",
      type: "radio"
    },
    "input48": {
      value: "Дром",
      isFocused: false,
      error: null,
      label: "Дром",
      type: "radio"
    },
    "input49": {
      value: "Авто.ру",
      isFocused: false,
      error: null,
      label: "Дром",
      type: "radio"
    },
    "input50": {
      value: null,
      isFocused: false,
      error: null,
      label: "Город",
      type: "text"
    },
    "input51": {
      value: null,
      isFocused: false,
      error: null,
      label: "Место осмотра",
      type: "text"
    },
    "input52": {
      value: null,
      isFocused: false,
      error: null,
      label: "Дата и время составления",
      type: "text"
    },
    "input53": {
      value: null,
      isFocused: false,
      error: null,
      label: "Контактное лицо / Собственник",
      type: "text"
    },
    "input54": {
      value: null,
      isFocused: false,
      error: null,
      label: "Телефон",
      type: "text"
    },
    "input55": {
      value: null,
      isFocused: false,
      error: null,
      label: "Ответственный, ФИО",
      type: "text"
    },

    "input1-1": {
      value: "ABS Антиблокировочная система",
      isFocused: false,
      error: null,
      label: "ABS Антиблокировочная система",
      type: "radio"
    },
    "input2-1": {
      value: "EBD Распределения усилия тормоза",
      isFocused: false,
      error: null,
      label: "EBD Распределения усилия тормоза",
      type: "radio"
    },
    "input3-1": {
      value: "BAS Вспомогательное торможение",
      isFocused: false,
      error: null,
      label: "BAS Вспомогательное торможение",
      type: "radio"
    },
    "input4-1": {
      value: "DMS Система выбора режима движения",
      isFocused: false,
      error: null,
      label: "DMS Система выбора режима движения",
      type: "radio"
    },
    "input5-1": {
      value: "ESP Система стабилизации",
      isFocused: false,
      error: null,
      label: "ESP Система стабилизации",
      type: "radio"
    },
    "input6-1": {
      value: "ТСS Антипробуксовочная система",
      isFocused: false,
      error: null,
      label: "ТСS Антипробуксовочная система",
      type: "radio"
    },
    "input7-1": {
      value: "Не выбрано",
      error: null,
      label: "Круиз-контроль",
      type: "select",
      choices: [
        "Не выбрано", "Пассивный", "Адаптивный"
      ]
    },
    "input8-1": {
      value: "Система помощи при парковке",
      isFocused: false,
      error: null,
      label: "Система помощи при парковке",
      type: "radio"
    },
    "input9-1": {
      value: "Камера",
      isFocused: false,
      error: null,
      label: "Камера",
      type: "radio"
    },
    "input10-1": {
      value: "Система автомотической парковки",
      isFocused: false,
      error: null,
      label: "Система автомотической парковки",
      type: "radio"
    },
    "input11-1": {
      value: "Автопилот",
      isFocused: false,
      error: null,
      label: "Автопилот",
      type: "radio"
    },
    "input12-1": {
      value: "Помощь при старте в гору",
      isFocused: false,
      error: null,
      label: "Помощь при старте в гору",
      type: "radio"
    },
    "input13-1": {
      value: "Помощь при спуске",
      isFocused: false,
      error: null,
      label: "Помощь при спуске",
      type: "radio"
    },
    "input14-1": {
      value: "Контроль за полосой движения",
      isFocused: false,
      error: null,
      label: "Контроль за полосой движения",
      type: "radio"
    },
    "input15-1": {
      value: "Контроль слепых зон",
      isFocused: false,
      error: null,
      label: "Контроль слепых зон",
      type: "radio"
    },
    "input16-1": {
      value: "Распознавание дорожных знаков",
      isFocused: false,
      error: null,
      label: "Распознавание дорожных знаков",
      type: "radio"
    },
    "input17-1": {
      value: "Предотвращения столкновения",
      isFocused: false,
      error: null,
      label: "Предотвращения столкновения",
      type: "radio"
    },
    "input18-1": {
      value: "Датчик усталости водителя",
      isFocused: false,
      error: null,
      label: "Датчик усталости водителя",
      type: "radio"
    },
    "input19-1": {
      value: "Система Ночного видения",
      isFocused: false,
      error: null,
      label: "Система Ночного видения",
      type: "radio"
    },
    "input20-1": {
      value: "Обнаружение пешеходов",
      isFocused: false,
      error: null,
      label: "Обнаружение пешеходов",
      type: "radio"
    },
    "input21-1": {
      value: "Датчик дождя",
      isFocused: false,
      error: null,
      label: "Датчик дождя",
      type: "radio"
    },
    "input22-1": {
      value: "Бортовой компьютер",
      isFocused: false,
      error: null,
      label: "Бортовой компьютер",
      type: "radio"
    },
    "input23-1": {
      value: "Не выбрано",
      error: null,
      label: "Фары",
      type: "select",
      choices: [
        "Не выбрано", "Галогеновые", "Светодиодные", "Ксеноновые", "Биксеноновые", "Лазерные"
      ]
    },
    "input24-1": {
      value: "Противотуманные фары",
      isFocused: false,
      error: null,
      label: "Противотуманные фары",
      type: "radio"
    },
    "input25-1": {
      value: "Дневные ходовые огни",
      isFocused: false,
      error: null,
      label: "Дневные ходовые огни",
      type: "radio"
    },
    "input26-1": {
      value: "Датчик света",
      isFocused: false,
      error: null,
      label: "Датчик света",
      type: "radio"
    },
    "input27-1": {
      value: "Автоматический дальний свет",
      isFocused: false,
      error: null,
      label: "Автоматический дальний свет",
      type: "radio"
    },
    "input28-1": {
      value: "Адаптивное освещение",
      isFocused: false,
      error: null,
      label: "Адаптивное освещение",
      type: "radio"
    },
    "input29-1": {
      value: "Автоматический корректор фар",
      isFocused: false,
      error: null,
      label: "Автоматический корректор фар",
      type: "radio"
    },
    "input30-1": {
      value: "Омыватели фар",
      isFocused: false,
      error: null,
      label: "Омыватели фар",
      type: "radio"
    },
    "input31-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Материал салона",
      type: "text"
    },
    "input32-1": {
      value: "Салон перетянут",
      isFocused: false,
      error: null,
      label: "Салон перетянут",
      type: "radio"
    },
    "input33-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Состояние салона",
      type: "text"
    },
    "input34-1": {
      value: "Наличие люка",
      isFocused: false,
      error: null,
      label: "Наличие люка",
      type: "radio"
    },
    "input35-1": {
      value: "Панорамная крыша",
      isFocused: false,
      error: null,
      label: "Панорамная крыша",
      type: "radio"
    },
    "input36-1": {
      value: "Управление климатом",
      isFocused: false,
      error: null,
      label: "Управление климатом",
      type: "radio"
    },
    "input37-1": {
      value: "Отделка потолка в чёрный цвет",
      isFocused: false,
      error: null,
      label: "Отделка потолка в чёрный цвет",
      type: "radio"
    },
    "input38-1": {
      value: "Сиденья с массажем",
      isFocused: false,
      error: null,
      label: "Сиденья с массажем",
      type: "radio"
    },
    "input39-1": {
      value: "Третий ряд сидений",
      isFocused: false,
      error: null,
      label: "Третий ряд сидений",
      type: "radio"
    },
    "input40-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Количество мест",
      type: "text"
    },
    "input41-1": {
      value: "Вентиляция сидений",
      isFocused: false,
      error: null,
      label: "Вентиляция сидений",
      type: "radio"
    },
    "input42-1": {
      value: "Электроподогрев",
      isFocused: false,
      error: null,
      label: "Электроподогрев",
      type: "radio"
    },
    "input43-1": {
      value: "Электропривод",
      isFocused: false,
      error: null,
      label: "Электропривод",
      type: "radio"
    },
    "input44-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Память настроек",
      type: "radio"
    },
    "input45-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Доводчик дверей",
      type: "radio"
    },
    "input46-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Розетка 220V",
      type: "radio"
    },
    "input47-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Открытие багажника без помощи рук",
      type: "radio"
    },
    "input48-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Зеркала в цвет кузова",
      type: "radio"
    },
    "input49-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Зеркало с повторением поворота",
      type: "radio"
    },
    "input50-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Электроподогрев зеркал",
      type: "radio"
    },
    "input51-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Память настроек зеркал",
      type: "radio"
    },
    "input52-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Остекление с защитой от ультрафиолета",
      type: "radio"
    },
    "input53-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Подогрев лобового стекла",
      type: "radio"
    },
    "input54-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Подогрев заднего стекла",
      type: "radio"
    },
    "input55-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Тонировка",
      type: "radio"
    },
    "input56-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Электрические стеклоподьемники",
      type: "radio"
    },
    "input57-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Электроподогрев зоны стеклоочистителей",
      type: "radio"
    },
    "input58-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Электроподогрев форсунок стеклоомывателей",
      type: "radio"
    },
    "input59-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Кожаный руль",
      type: "radio"
    },
    "input60-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Усилитель руля",
      type: "radio"
    },
    "input61-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Регулировка руля",
      type: "radio"
    },
    "input62-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Память настроек рулевой колонки",
      type: "radio"
    },
    "input63-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Управление на руле",
      type: "radio"
    },
    "input64-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Подрулевые лепестки",
      type: "radio"
    },
    "input65-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Электроподогрев руля",
      type: "radio"
    },
    "input66-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Электронная приборная панель",
      type: "radio"
    },
    "input67-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Проекционный дисплей",
      type: "radio"
    },
    "input68-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Система “старт-стоп”",
      type: "radio"
    },
    "input69-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Многофункциональный дисплей",
      type: "radio"
    },
    "input70-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Встроенная навигация",
      type: "radio"
    },
    "input71-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Видео-регистартор",
      type: "radio"
    },
    "input72-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Комплектация ключей",
      type: "radio"
    },
    "input73-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Центральный замок",
      type: "radio"
    },
    "input74-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Сигнализация",
      type: "radio"
    },
    "input75-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Бесключевой доступ",
      type: "radio"
    },
    "input76-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "ЭРА-ГЛОНАСС",
      type: "radio"
    },
    "input77-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "CarPlay",
      type: "radio"
    },
    "input78-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Android Auto",
      type: "radio"
    },
    "input79-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Яндекс Авто",
      type: "radio"
    },
    "input80-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Мультимедиа система с ЖК-экраном",
      type: "radio"
    },
    "input81-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Мультимедиа система для задних пассажиров",
      type: "radio"
    },
    "input82-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Беспроводная зарядка для смартфона",
      type: "radio"
    },
    "input83-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Навигационная система",
      type: "radio"
    },
    "input84-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Голосовое управление",
      type: "radio"
    },
    "input85-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "USB",
      type: "radio"
    },
    "input86-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "AUX",
      type: "radio"
    },
    "input87-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Bluetooth",
      type: "radio"
    },
    "input88-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Радио",
      type: "radio"
    },
    "input89-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Аудиосистема",
      type: "radio"
    },
    "input90-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Савбуфер",
      type: "radio"
    },
    "input91-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Фаркоп",
      type: "radio"
    },
    "input92-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Защита картера",
      type: "radio"
    },
    "input93-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Рейлинги на крыше",
      type: "radio"
    },
    "input94-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Обвес кузова",
      type: "radio"
    },
    "input95-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Бронированный кузов",
      type: "radio"
    },
    "input96-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Подвеска",
      type: "radio"
    },
    "input97-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Тип дисков",
      type: "text"
    },
    "input98-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Радиус дисков",
      type: "text"
    },
    "input99-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Тип резины",
      type: "text"
    },
    "input100-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Профиль шин",
      type: "text"
    },
    "input101-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Износ резины высота протектора",
      type: "text"
    },
    "input102-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Запасное колесо",
      type: "radio"
    },
    "input103-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Датчик давления в шинах",
      type: "radio"
    },
    "input104-1": {
      value: null,
      isFocused: false,
      error: null,
      label: "Зимние шины в комплекте",
      type: "radio"
    },
  });
  const [ damages, setDamages ] = useState([]);
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
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
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

  const showMore = () => {

  }

  return (
    <div className="view">
      <div className={styles.wrapper}>
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
      <Title text="Автомобиль" />
        <Formik
          initialValues={{
            "input1": "Автомобили",
            "input2": "",
            "input3": "",
            "input4": "",
            "input5": "",
            "input6": "",
            "input7": "",
            "input8": "",
            "input9": "Седан",
            "input10": "Бензин",
            "input11": "",
            "input12": "",
            "input13": "",
            "input14": "",
            "input15": "Левый",
            "input16": "",
            "input17": "",
            "input18": "Передний",
            "input19": "Механика",
            "input20": "",
            "input21": "",
            "input22": "",
            "input23": "Не выбрано",
            "input24": "",
            "input25": "",
            "input26": "",
            "input27": "",
            "input28": "",
            "input29": "",
            "input30": "",
            "input31": "",
            "input32": "",
            "input33": "",
            "input34": "",
            "input35": "",
            "input36": "",
            "input37": "",
            "input38": "",
            "input39": "",
            "input40": "",
            "input41": "",
            "input42": "",
            "input43": "",
            "input44": "",
            "input45": "",
            "input46": "",
            "input47": "",
            "input48": "",
            "input49": "",
            "input50": "",
            "input51": "",
            "input52": "",
            "input53": "",
            "input54": "",
            "input55": "",
            "input1-1": "",
            "input2-1": "",
            "input3-1": "",
            "input4-1": "",
            "input5-1": "",
            "input6-1": "",
            "input7-1": "Не выбрано",
            "input8-1": "",
            "input9-1": "",
            "input10-1": "",
            "input11-1": "",
            "input12-1": "",
            "input13-1": "",
            "input14-1": "",
            "input15-1": "",
            "input16-1": "",
            "input17-1": "",
            "input18-1": "",
            "input19-1": "",
            "input20-1": "",
            "input21-1": "",
            "input22-1": "",
            "input23-1": "Не выбрано",
            "input24-1": "",
            "input25-1": "",
            "input26-1": "",
            "input27-1": "",
            "input28-1": "",
            "input29-1": "",
            "input30-1": "",
            "input31-1": "",
            "input32-1": "",
            "input33-1": "",
            "input34-1": "",
            "input35-1": "",
            "input36-1": "",
            "input37-1": "",
            "input38-1": "",
            "input39-1": "",
            "input40-1": "",
            "input41-1": "",
            "input42-1": "",
            "input43-1": "",
            "input44-1": "",
            "input45-1": "",
            "input46-1": "",
            "input47-1": "",
            "input48-1": "",
            "input49-1": "",
            "input50-1": "",
            "input51-1": "",
            "input52-1": "",
            "input53-1": "",
            "input54-1": "",
            "input55-1": "",
            "input56-1": "",
            "input57-1": "",
            "input58-1": "",
            "input59-1": "",
            "input60-1": "",
            "input61-1": "",
            "input62-1": "",
            "input63-1": "",
            "input64-1": "",
            "input65-1": "",
            "input66-1": "",
            "input67-1": "",
            "input68-1": "",
            "input69-1": "",
            "input70-1": "",
            "input71-1": "",
            "input72-1": "",
            "input73-1": "",
            "input74-1": "",
            "input75-1": "",
            "input76-1": "",
            "input77-1": "",
            "input78-1": "",
            "input79-1": "",
            "input80-1": "",
            "input81-1": "",
            "input82-1": "",
            "input83-1": "",
            "input84-1": "",
            "input85-1": "",
            "input86-1": "",
            "input87-1": "",
            "input88-1": "",
            "input89-1": "",
            "input90-1": "",
            "input91-1": "",
            "input92-1": "",
            "input93-1": "",
            "input94-1": "",
            "input95-1": "",
            "input96-1": "",
            "input97-1": "",
            "input98-1": "",
            "input99-1": "",
            "input100-1": "",
            "input101-1": "",
            "input102-1": "",
            "input103-1": "",
            "input104-1": "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, handleSubmit }) => (
          <Form>
            <div className={styles.flex20gap}>
              <FormLIGHT inputs={Object.entries(inputs).slice(0, 4)} setInputs={setInputs} errors={errors} touched={touched} />
              <FormLIGHT title="Автомобиль" inputs={Object.entries(inputs).slice(4, 9)} setInputs={setInputs} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs).slice(9, 19)} setInputs={setInputs} errors={errors} touched={touched} />
              <FormLIGHT title="Комплект документов" inputs={Object.entries(inputs).slice(19, 24)} setInputs={setInputs} errors={errors} touched={touched} />
              <FormLIGHT title="Дополнительно" inputs={Object.entries(inputs).slice(24, 31)} setInputs={setInputs} errors={errors} touched={touched} />
              <CarView onlyView={true} carId="1234" damages={damages} />
              {damages.length > 0 &&
              <div>
                <div className={styles.title}>Повреждения кузова</div>
                <div className={styles.texts}>
                  <div className={styles.label}>
                    <div>Название детали</div>
                    <div>Повреждения</div>
                    <div>Ремонт</div>
                  </div>
                  {damages.map((damage, index) => (
                    <div className={styles.text} key={index}>
                      <div>{damage.type}</div>
                      <div>{damage.input1}</div>
                      <div>{damage.input3} {damage.input4} {damage.input5}</div>
                    </div>
                  ))}
                </div>
              </div>}
              <div>
                <div className={styles.title}>Фотографии кузова</div>
                <MiniSlider images={images2}
                            activeImage={activeImage2}
                            setActiveImage={setActiveImage2}
                            canAdd={true}
                            setImages={setImages2}
                            maxImagesCount={30}
                            canDelete={true}
                            style={{backgroundColor: "#000", padding: "5px 0 20px 0"}}
                            />
              </div>
              <div className={styles.strangeInput} onClick={() => setMore(true)}>
                <div>
                  Дополнительные опции
                </div>
                <div>
                  <img src={require("../components/images/arrow-right.svg").default} alt="" />
                </div>
              </div>
              <FormLIGHT inputs={Object.entries(inputs).slice(31, 32)} setInputs={setInputs} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs).slice(32, 34)} setInputs={setInputs} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs).slice(34, 42)} setInputs={setInputs} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs).slice(42, 43)} setInputs={setInputs} errors={errors} touched={touched} />
              <FormLIGHT title="Продавец" inputs={Object.entries(inputs).slice(43, 46)} setInputs={setInputs} errors={errors} touched={touched} />
              <FormLIGHT title="Размещено на сайтах" inputs={Object.entries(inputs).slice(46, 49)} setInputs={setInputs} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs).slice(49, 52)} setInputs={setInputs} errors={errors} touched={touched} />
              <FormLIGHT inputs={Object.entries(inputs).slice(52, 55)} setInputs={setInputs} errors={errors} touched={touched} />
              <Button text="Разместить" handleClick={handleSubmit} />
              {more &&
              <div className={styles.moreWrapper}>
                <div className={styles.more}>
                  <div className={styles.header}>
                    <div onClick={() => setMore(false)}>Отменить</div>
                    <div onClick={() => setMore(false)}>Готово</div>
                  </div>
                  <Title text="Дополнительные опции" />
                  <div className={styles.flex20gap}>
                    <FormLIGHT title="Вспомогательные системы" inputs={Object.entries(inputs).slice(55, 77)} setInputs={setInputs} errors={errors} touched={touched} />
                    <FormLIGHT title="Фары" inputs={Object.entries(inputs).slice(77, 85)} setInputs={setInputs} errors={errors} touched={touched} />
                    <FormLIGHT title="Салон" inputs={Object.entries(inputs).slice(85, 102)} setInputs={setInputs} errors={errors} touched={touched} />
                    <FormLIGHT title="Боковые зеркала" inputs={Object.entries(inputs).slice(102, 106)} setInputs={setInputs} errors={errors} touched={touched} />
                    <FormLIGHT title="Стёкла" inputs={Object.entries(inputs).slice(106, 113)} setInputs={setInputs} errors={errors} touched={touched} />
                    <FormLIGHT title="Руль и центральная панель" inputs={Object.entries(inputs).slice(113, 126)} setInputs={setInputs} errors={errors} touched={touched} />
                    <FormLIGHT title="Сохранность автомобиля" inputs={Object.entries(inputs).slice(126, 131)} setInputs={setInputs} errors={errors} touched={touched} />
                    <FormLIGHT title="Мультимедия" inputs={Object.entries(inputs).slice(131, 145)} setInputs={setInputs} errors={errors} touched={touched} />
                    <FormLIGHT title="Кузов" inputs={Object.entries(inputs).slice(145, 151)} setInputs={setInputs} errors={errors} touched={touched} />
                    <FormLIGHT title="Колёса" inputs={Object.entries(inputs).slice(151)} setInputs={setInputs} errors={errors} touched={touched} />
                  </div>
                </div>
              </div>}
            </div>
          </Form>
        )}
        </Formik>
      <FixedButton />
      {saving && <LoadingHover />}
    </div>
  );
}

export default Add;
