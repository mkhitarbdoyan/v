var fs = require('fs');
var path = require('path');
var Json2csvParser = require('json2csv').Parser;
var generatePassword = require('password-generator');
var bcrypt = require('bcrypt');
var _a = require('../config'), passwordOptions = _a.passwordOptions, outputDir = _a.outputDir;
var characterMap = require('../config/characterMap.json');
var characterMapV2 = require('../config/characterMapV2.json');
var saveToCSV = function (list, name, filterKey) {
    if (filterKey) {
        list = list.filter(function (item) { return !!item[filterKey]; });
    }
    if (!list.length) {
        return false;
    }
    var fields = Object.keys(list[0]);
    var parser = new Json2csvParser({
        fields: fields,
        delimiter: ';'
    });
    var csv = parser.parse(list);
    saveToFile(csv, "".concat(name, ".csv"), function (err, filePath) {
        if (err)
            throw err;
        console.log("The ".concat(name, " file has been saved! Rows count ").concat(list.length, " at ").concat(filePath));
    });
};
var transformToObject = function (list) {
    var keys = Object.keys(list[0]);
    return list.map(function (row) {
        var productObj = {};
        keys.forEach(function (key) {
            productObj[key] = row[key];
            if ('number' !== typeof productObj[key] && productObj[key]) {
                productObj[key] = productObj[key].toString();
            }
        });
        return productObj;
    });
};
var getPassword = function () {
    return generatePassword(passwordOptions.length, false);
};
var hashPassword = function (password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};
var translateCharacters = function (str, lang) {
    if (lang === void 0) { lang = 'en'; }
    var mapping = characterMap[lang];
    Object.keys(mapping).forEach(function (character) {
        var index = str.indexOf(character);
        if (index >= 0) {
            var changeKey = ('object' === typeof mapping[character]) ? mapping[character].$ : mapping[character];
            if (('object' === typeof mapping[character]) && mapping[character][String(index)]) {
                str = str.replace(new RegExp("".concat(character)), mapping[character][String(index)]);
            }
            str = str.replace(new RegExp("".concat(character), 'g'), changeKey);
        }
    });
    return str;
};
var translateCharactersV2 = function (str, lang) {
    if (lang === void 0) { lang = 'en'; }
    var mapping = characterMapV2[lang];
    var translations = [str.toLowerCase()];
    Object.keys(mapping).forEach(function (character) {
        var tmp = null;
        translations.forEach(function (translation) {
            var index = translation.indexOf(character);
            if (index >= 0) {
                tmp = tmp || [];
                if (Array.isArray(mapping[character])) {
                    mapping[character].forEach(function (changeKey) {
                        tmp.push(translation.replace(new RegExp("".concat(character), 'g'), changeKey));
                    });
                }
                else {
                    var changeKey = ('object' === typeof mapping[character]) ? mapping[character].$ : mapping[character];
                    if (('object' === typeof mapping[character]) && mapping[character][String(index)]) {
                        translation = translation.replace(new RegExp("".concat(character)), mapping[character][String(index)]);
                    }
                    translation = translation.replace(new RegExp("".concat(character), 'g'), changeKey);
                    tmp.push(translation);
                }
            }
        });
        translations = tmp || translations;
    });
    return translations;
};
var saveToFile = function (data, name, cb) {
    var filePath = path.resolve(outputDir, name);
    fs.writeFile(filePath, data, 'utf8', function (err) { return cb(err, filePath); });
};
var generateRandom = function (length) {
    return Math.round(Math.random() * Math.pow(10, length));
};
var uniqueArray = function (array) {
    return array.filter(function (img, index, self) { return (self.indexOf(img) === index); });
};
module.exports = {
    saveToCSV: saveToCSV,
    transformToObject: transformToObject,
    getPassword: getPassword,
    hashPassword: hashPassword,
    translateCharacters: translateCharacters,
    translateCharactersV2: translateCharactersV2,
    saveToFile: saveToFile,
    generateRandom: generateRandom,
    uniqueArray: uniqueArray
};
