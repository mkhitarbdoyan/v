const fs = require('fs');
const path = require('path');
const Json2csvParser = require('json2csv').Parser;
const generatePassword = require('password-generator');
const bcrypt = require('bcrypt');
const {
    passwordOptions,
    outputDir
} = require('../config');
const characterMap = require('../config/characterMap.json');
const characterMapV2 = require('../config/characterMapV2.json');

const saveToCSV = (list: any[], name: string, filterKey: string): void | boolean => {
    if (filterKey) {
        list = list.filter(item => !!item[filterKey]);
    }

    if (!list.length) {
        return false;
    }

    const fields: string[] = Object.keys(list[0]);
    const parser = new Json2csvParser({
        fields,
        delimiter: ';'
    });

    const csv: string[] = parser.parse(list);
    saveToFile(csv, `${name}.csv`, (err, filePath: string) => {
        if (err) throw err;
        console.log(`The ${name} file has been saved! Rows count ${list.length} at ${filePath}`);
    });
};

const transformToObject = (list: string[]) => {
    const keys: string[] = Object.keys(list[0]);
    return list.map((row) => {
        const productObj = {};
        keys.forEach(key => {
            productObj[key] = row[key];
            if ('number' !== typeof productObj[key] && productObj[key]) {
                productObj[key] = productObj[key].toString();
            }
        });
        return productObj;
    });
};

const getPassword = () => {
    return generatePassword(passwordOptions.length, false);
};

const hashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const translateCharacters = (str: string, lang: string = 'en'): string => {
    const mapping = characterMap[lang];
    Object.keys(mapping).forEach((character) => {
        const index = str.indexOf(character);
        if (index >= 0) {
            let changeKey = ('object' === typeof mapping[character]) ? mapping[character].$ : mapping[character];
            if (('object' === typeof mapping[character]) && mapping[character][String(index)]) {
                str = str.replace(new RegExp(`${character}`), mapping[character][String(index)]);
            }
            str = str.replace(new RegExp(`${character}`, 'g'), changeKey);
        }
    });
    return str;
};

const translateCharactersV2 = (str: string, lang: string = 'en'): string[] => {
    const mapping: string = characterMapV2[lang];
    let translations: string[] = [str.toLowerCase()];
    Object.keys(mapping).forEach((character) => {
        let tmp: null | string[] = null
        translations.forEach(translation => {
            const index: number = translation.indexOf(character);
            if (index >= 0) {
                tmp = tmp || [];
                if (Array.isArray(mapping[character])) {
                    mapping[character].forEach(changeKey => {
                        tmp.push(translation.replace(new RegExp(`${character}`, 'g'), changeKey));
                    });
                } else {
                    let changeKey = ('object' === typeof mapping[character]) ? mapping[character].$ : mapping[character];
                    if (('object' === typeof mapping[character]) && mapping[character][String(index)]) {
                        translation = translation.replace(new RegExp(`${character}`), mapping[character][String(index)]);
                    }
                    translation = translation.replace(new RegExp(`${character}`, 'g'), changeKey);
                    tmp.push(translation);
                }
            }
        })
        translations = tmp || translations;
    });
    return translations;
};

const saveToFile = (data: string[], name: string, cb): void => {
    const filePath = path.resolve(outputDir, name);
    fs.writeFile(filePath, data, 'utf8', (err) => cb(err, filePath));
};

const generateRandom = (length: number): number => {
    return Math.round(Math.random() * Math.pow(10, length));
}

const uniqueArray = (array: any[]) => {
    return array.filter((img, index, self) => (self.indexOf(img) === index))
};

module.exports = {
    saveToCSV,
    transformToObject,
    getPassword,
    hashPassword,
    translateCharacters,
    translateCharactersV2,
    saveToFile,
    generateRandom,
    uniqueArray
};