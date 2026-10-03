const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'
const EN_DIGITS = '0123456789'

export function toPersianDigits(value = '') {
    return String(value).replace(/[0-9]/g, (d) => FA_DIGITS[d])
}

export function toEnglishDigits(value = '') {
    return String(value)
        .replace(/[۰-۹]/g, (d) => EN_DIGITS[FA_DIGITS.indexOf(d)])
        .replace(/[٠-٩]/g, (d) => EN_DIGITS['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])
}