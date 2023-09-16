
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
    const l = value.length;
    if (value.length === value2.length) {
        for (let i = 0; i < l; i++) {
            if (value[i] != value2[i]) { return false }
        }
        return true;
    }
    return false;
}

/**
 * Являются ли длины массивов одинаковыми. Так же можно сравнить массив с числом, выдаст равны ли они
 * @param {array|number} value Первый массив или число
 * @param {array|number} value2 Второй массив или число
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
 * Являются ли длины массивов одинаковыми. Так же можно сравнить массив с числом, выдаст равны ли они
 * @param {array|numeric} value Первый массив или число
 * @param {array|numeric} value2 Второй массив или число
 * @return {boolean} возвращает, являются ли одинаковыми длины массивов
 */
function if__eqLength(value, value2) {
    let l = itter__length(value);
    let l2 = itter__length(value2);

    if (l === l2) { return true; }
    return false;
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
 * По функционалу это копипаста с Array.map, но ничего не возвращает. Проходит функцией по массиву
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
    if__eqArrLength,
    if__eqLength,

    itter__length,

    convert__stringToBoolean,

    for__simple,
    for__CashArr,
    for2__simple,
    for2__CashArr,

    func__compose,
};