
const SUCCES = { result: "succes" };
const FAIL = { result: "fail" };

/**
 * Условие, является ли null
 * @param {} value Значение которое проверяем
 * @return {boolean} возвращает, является ли значение null
 */
function if__null(value) {
    return value == null;
}

/**
 * Условие, является ли true
 * @param {} value Значение которое проверяем
 * @return {boolean} возвращает, является ли значение true
 */
function if__true(value) {
    return value === true;
}

/**
 * Условие, является ли false
 * @param {} value Значение которое проверяем
 * @return {boolean} возвращает, является ли значение false
 */
function if__false(value) {
    return value === false;
}

/**
 * Условие, являются ли ПРИМИТИВНЫЕ значения эквивалентными
 * @param {array} value Первое значение которое проверяем
 * @param {array} value2 Второе значение которое проверяем
 * @return {boolean} возвращает, являются ли значения равными
 */
function if__eqPrim(value, value2) {
    return value === value2;
}

/**
 * Условие, являются ли массивы из примитивных знаений эквивалентными
 * @param {array} value Первый массив
 * @param {array} value2 Второй массив
 * @return {boolean} возвращает, являются ли значения массивов одинаковыми
 */
function if__eqArrOfPrim(value, value2) {
    if (value == value2) { return true; }
    if (value == null || value2 == null) { return false; }
    if (value.length != value2.length) { return false; }

    for (let i = 0; i < value.length; i++) {
        if (value[i] != value2[i]) { return false }
    }

    return true;
}

/**
 * Условие, являются ли массивы(рекурсивно) эквивалентными
 * @param {array} value Первый массив
 * @param {array} value2 Второй массив
 * @return {boolean} возвращает, являются ли значения массивов одинаковыми
 */
function if__eqArr(value, value2) {
    if (value == value2) { return true; }
    if (value == null && value2 == null) { return false; }
    if (value.length != value2.length) { return false; }

    for (let i = 0; i < value.length; i++) {
        const el = value[i], el2 = value2[i];
        const isArr_el = Array.isArray(el), isArr_el2 = Array.isArray(el2);

        if (isArr_el != isArr_el2) { return false; }
        if ((isArr_el == isArr_el2 && isArr_el == false) && el != el2) { return false; }
        if ((isArr_el == isArr_el2 && isArr_el == true) && if__eqArr(el, el2) == false) { return false; }
    }

    return true;
}

/**
 * Условие, являются ли объекты(рекурсивно) эквивалентными. Через JSON.stringify
 * @param {array} value Первый объект
 * @param {array} value2 Второй объект
 * @return {boolean} возвращает, являются ли объекты одинаковыми
 */
function if__eqObjFast(value, value2) {
    if (value == value2) { return true; }
    if (value == null && value2 == null) { return false; }

    return JSON.stringify(value) === JSON.stringify(value2);
}

/**
 * Условие, являются ли объекты(рекурсивно) эквивалентными. Только для enumerable свойств
 * @param {array} value Первый объект
 * @param {array} value2 Второй объект
 * @return {boolean} возвращает, являются ли объекты одинаковыми
 */
function if__eqObj(value, value2) {
    if (value == value2) { return true; }
    if (value == null && value2 == null) { return false; }

    const objKeys = Object.keys(value), objKeys2 = Object.keys(value2);
    if (objKeys.length != objKeys2.length) { return false; }
    for (let i = 0; i < objKeys.length; i++) {
        const prop = value[objKeys[i]], prop2 = value2[objKeys[i]];
        let res = true;

        if (prop != prop2) { res = false; }
        if (typeof prop === 'object') { res = if__eqObj(prop, prop2); }
        if (res == false) { return false; }
    }
    return true;
}

/**
 * Являются ли длины массивов одинаковыми. Так же можно сравнить массив с числом, выдаст равны ли они
 * @param {array|number} value Первый массив/число
 * @param {array|number} value2 Второй массив/число
 * @return {boolean} возвращает, являются ли одинаковыми длины массивов
 */
function if__eqArrLength(value, value2) {
    const l = Array.isArray(value) ? value.length : value;
    const l2 = Array.isArray(value2) ? value2.length : value2;
    if (l === l2) {
        return true;
    }
    return false;
}

/**
 * Являются ли объекты коллекций одной длины. Так же можно сравнить с числом, выдаст равны ли они
 * @param {array|numeric} value Первая коллекция/число
 * @param {array|numeric} value2 Вторая коллекция/число
 * @return {boolean} возвращает, являются ли одинаковыми длины массивов
 */
function if__eqLength(value, value2) {
    let l = itter__length(value);
    let l2 = itter__length(value2);

    if (l === l2) { return true; }
    return false;
}

/**
 * Условие, являются ли строкой
 * @param {array} value Проверяем значение
 * @return {boolean} Являются ли строкой
 */
function if__isString(value) {
    return typeof value === 'string';
}

/**
 * Условие, являются ли не пустой строкой
 * @param {array} value Проверяем значение
 * @return {boolean} Являются ли не пустой строкой
 */
function if__isStringContent(value) {
    return typeof value === 'string' && value != '';
}

/**
 * Является ли символ числом
 * @param {String} str Строка из которой берем символ
 * @param {Number} [index] Индекс символа в строке, который проверяем. По умолчанию 0
 * @return {boolean} Является ли символ числовым
 */
function if__isStringNumeric(str, index = 0) {
    const s = str.charCodeAt(index);
    // return s >= "0".charCodeAt(0) && s <= "9".charCodeAt(0);
    return s >= 48 && s <= 57;
}

/**
 * Получить числовую последовательность символов
 * @param {String} str Строка из которой берем символ
 * @param {Number} [index] Индекс начиная с которого смотрим. По умолчанию 0
 * @return {String} Подстрока, в которой число
 */
function string__getNumeric(str, index = 0) {
    let i = index;
    for (let s = str[i]; i < str.length && if__isStringNumeric(s); i++, s = str[i]) { }
    return str.slice(index, i);
}

/**
 * Получить длину числовой последовательности символов
 * @param {String} str Строка из которой берем символ
 * @param {Number} [index] Индекс начиная с которого смотрим. По умолчанию 0
 * @return {Number} Длина числовой последовательности
 */
function string__getNumericLength(str, index = 0) {
    let i = index;
    for (let s = str[i]; i < str.length && if__isStringNumeric(s); i++, s = str[i]) { }
    return i - index;
}

/**
 * Получить конец числовой последовательности символов
 * @param {String} str Строка из которой берем символ
 * @param {Number} [index] Индекс начиная с которого смотрим. По умолчанию 0
 * @return {Number} Индекс следущего символа после числовой последовательности
 */
function string__getNumericEnd(str, index = 0) {
    let i = index;
    for (let s = str[i]; i < str.length && if__isStringNumeric(s); i++, s = str[i]) { }
    return i;
}

/**
 * Длина иттерируемого объекта. Для числа число
 * @param {object|array|numeric} value Первый массив или число
 * @param {boolean} enumerable Если false вернет число свойств, без учета скрытых
 * @return {numeric} Длина
 */
function itter__length(value, enumerable = false) {
    const t = typeof value;
    if (t === "number") { return value; }
    if (t === "string") { return value.length; }
    if (t === "object") {
        if (Array.isArray(value) === true) { return value.length; }
        if (enumerable === false) { return Object.keys(value).length; }
        if (enumerable === true) { Object.getOwnPropertyNames(value).length; }
    }
    return FAIL;
}

/**
 * Переводит "true" в true, "false" в false, в остальных случаях стандартный Boolean от строки
 * @param {} value Переводимое значение
 * @return {boolean} возвращает, являются ли значения "true"
 */
function convert__stringToBoolean(value) {
    if (value === "false") {
        return false;
    }
    return Boolean(value);
}

/**
 * Коллбэк для циклов
 * 
 * @callback forCb
 * @param {numeric} i индекс текущего элемента в массиве
 * @param {} el текущий элемент массива
 * @param {[]} arr массив по которому проходимся
 */

/**
 * По функционалу это копипаста с Array.forEach, но ничего не возвращает. Проходит функцией по массиву
 * @param {[]} arr Массив по которому проходимся
 * @param {forCb} func Функция принимающая индекс, текущий элемент, весь массив
 */
function for__simple(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        func(i, arr[i], arr);
    };
    return SUCCES;
}

/**
 * По функционалу это копипаста с Array.map. Проходит функцией по массиву
 * @param {[]} arr Массив по которому проходимся
 * @param {forCb} func Функция принимающая индекс, текущий элемент, весь массив
 * @return {[]} Массив из значений которые вернула функция
 */
function for__CashArr(arr, func) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(func(i, arr[i], arr));
    };
    return res;
}

/**
 * Коллбэк для 2-уровневых циклов
 * 
 * @callback forCb
 * @param {numeric} i индекс текущего элемента в массиве
 * @param {numeric} j индекс текущего элемента во 2-ом массиве
 * @param {} el текущий элемент массива
 * @param {} el2 текущий элемент 2-ого массива
 * @param {[]} arr массив по которому проходимся
 * @param {[]} arr2 2-ой массив по которому проходимся
 */

/**
 * Проходим сразу два массива. Ничего не возвращает
 * @param {[]} arr Первый массив, по которому проходимся
 * @param {[]} arr2 Второй массив, по которому проходимся
 * @param {forCb} func Функция принимающая i, j, el, el2, arr, arr2
 */
function for2__simple(arr, arr2, func) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            el = arr[i];
            func(i, j, el, el2, arr, arr2);
        }
    };
    return res;
}

/**
 * Проходим сразу два массива
 * @param {[]} arr Первый массив, по которому проходимся
 * @param {[]} arr2 Второй массив, по которому проходимся
 * @param {forCb} func Функция принимающая i, j, el, el2, arr, arr2
 * @return {[]} Массив из значений которые вернула функция
 */
function for2__CashArr(arr, arr2, func) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            el = arr[i];
            res.push(func(i, j, el, el2, arr, arr2));
        }
    };
    return res;
}

/**
 * Коллбэк для композиции
 * 
 * @callback funcComposerCb
 * @param {} initValue Входное значение для композиции
 * @return {} Выходное значение функции
 */
/**
 * Композиция функций. Короче x(y(z(f(initVal))))
 * @param {[]} funcs Массив функций. Все должны принимать ОДИН аргумент
 * @return {funcComposerCb} Функцию принимающую один аргумент
 */
function func__compose(...funcs) {
    return (initValue) => funcs.reduce((result, func) => func(result), initValue);
}

/**
 * Карирование. Вместо f(x, y, z), можно вызвать f2=func__curry(f), а потом f2(x)(y,z) или f2(x,y)(x) или f2(x,y,z)
 * @param { function } func Любая функция
 * @return {} Каррированную функцию
 */
function func__curry(func) {
    return function curring(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return (...args2) => {
                return curring.apply(this, args.concat(args2));
            }
        }
    }
}

module.exports = {
    if__null,
    if__true,
    if__false,
    if__eqPrim,
    if__eqArrOfPrim,
    if__eqArr,
    if__eqObjFast,
    if__eqObj,
    if__eqArrLength,
    if__eqLength,

    if__isString,
    if__isStringContent,
    if__isStringNumeric,

    string__getNumeric,
    string__getNumericLength,
    string__getNumericEnd,

    itter__length,

    convert__stringToBoolean,

    for__simple,
    for__CashArr,
    for2__simple,
    for2__CashArr,

    func__compose,
    func__curry,
};