/*
    Important:
        Update s_categories.json, s_categories_translations.json every time before import.

    Content of s_categories_translations.json should be result of this query: SELECT * FROM <your_db_name>.s_core_translations where objecttype='category';
*/

const path = require('path');
const fs = require('fs');
const csv = require('csvtojson')
const { saveToCSV, saveToFile } = require('../../lib/utils');
const { addKeywordsToProduct } = require('../data/keywords');
const { unserialize } = require('../data/unserializer');
const carrFour = require('../../config').carrFour;
const categoriesFilePath = path.resolve('./import/s_categories.json');
const index = 'test';
const categoriesTranslationsFilePath = path.resolve('./import/s_categories_translations.json');
const productFilPath = process.env.IMPORT || path.resolve(`./import/products_${index}.csv`);
const similarCategoriesFilPath = process.env.IMPORT_SIMILAR_CATEGORIES|| path.resolve('./import/similar_categories.csv');
const imageFolder = path.resolve('./alfa_images');
const oldCategories = require(categoriesFilePath);
const oldCategoriesTranslations = require(categoriesTranslationsFilePath);
const rootCategoryID = 2760;
const categoryStart = 1300;
let productImgList = [];
const categoryTranslationDefaults = {
    external: '',
    externalTarget: '',
    imagePath: '',
    cmsheadline: '',
    cmstext: '',
    metatitle: '',
    metadescription: '',
    metakeywords: ''
};

const getProductImageList = (cb) => {
    fs.readdir(imageFolder, (err, list) => {
        cb(list.map(imagePath => {
            if(imagePath.includes(' ')) {
                const newPath = imagePath.replace(/ /g, '_')
                fs.renameSync(`${imageFolder}/${imagePath}`, `${imageFolder}/${newPath}`);
                imagePath = newPath;
            }
            return `file://${imageFolder}/${imagePath}`
        }));
    });
};

const parsCSV = (filPath, cb) => {
    csv().fromFile(filPath).then(cb);
};

parsCSV(productFilPath, (list) => {
    const categories = generateCategoryTree(list);
    getProductImageList(imageList =>{
        const products = generateProducts(list, categories, imageList);
    });

    // generateSimilarCategories(sql =>{
    // });
});

const getProductImages = (product, imageList) => {
    const imageName = product.suppliernumber.replace(/ /g, '_');
    const imgList = imageList.filter(imagePath =>  imagePath.includes(`_${imageName}.`) ||
        imagePath.includes(`_${imageName}_`) ||
        imagePath.includes(`_${imageName}-`) ||
        imagePath.includes(`${imageName}`) ||
        imagePath.includes(`/${imageName}-`));
    productImgList = [...productImgList, ...imgList];
    return imgList;
};

const getParents = (categories, category, parents = []) => {
    if(category.parent === rootCategoryID) {
        return parents;
    }
    const parent = categories.find(item => item.id === category.parent);
    parents.push(parent);
    return getParents(categories, parent, parents);
};

const generateTree = (categories) => {
    const categoriesTranslations = {};
    oldCategoriesTranslations.forEach(categoryTranslation => {
        const categoryId = categoryTranslation.objectkey;
        const categoryTranslations = categoriesTranslations[categoryId] || {};
        if (categoryTranslation.objectlanguage === '4') {
            categoryTranslations.rus = categoryTranslation;
        } else if (categoryTranslation.objectlanguage === '3') {
            categoryTranslations.eng = categoryTranslation;
        }
        categoriesTranslations[categoryId] = categoryTranslations;
    })
    const tree = {};
    categories.forEach(category => {
        const parents = getParents(categories, category);
        parents.reverse();
        let categoryPath = '';
        parents.forEach((parent, index) => {
            if (categoriesTranslations[parent.id]) {
                category[`categories_Rus-${index+1}`] = unserialize(categoriesTranslations[parent.id].rus.objectdata).description;
                category[`categories_Eng-${index+1}`] = unserialize(categoriesTranslations[parent.id].eng.objectdata).description;
            }
            categoryPath = `${categoryPath}_${parent.description.toLocaleLowerCase()}`;
        });
        if (categoriesTranslations[category.id]) {
            category[`categories_Rus-${parents.length+1}`] = unserialize(categoriesTranslations[category.id].rus.objectdata).description;
            category[`categories_Eng-${parents.length+1}`] = unserialize(categoriesTranslations[category.id].eng.objectdata).description;
        }
        categoryPath = `${categoryPath}_${category.description.toLocaleLowerCase()}`;
        tree[categoryPath] = category;
    });
    return tree;
}

const generateCategoryTree = (list) => {
    const carrFourOldCategories = oldCategories.filter(category => category.path.includes(`|${rootCategoryID}|2|`));
    const oldCategoryTree = generateTree(carrFourOldCategories);
    let lastCategoryId = categoryStart + 1;
    const categories = {};
    const categoryTranslations = [];
    list.forEach((item) => {
        let parentId = rootCategoryID;
        let categoryPath = '';
        ['categories', 'categories', 'categories'].forEach((key, index) => {
            const propName = `${key}_Arm-${index+1}`
            let name = item[propName];
            if (!name) {
                return;
            }
            categoryPath = `${categoryPath}_${name.toLocaleLowerCase()}`;
            let category = categories[categoryPath];
            if (!category) {
                category = {
                    name: name,
                    categoryId: lastCategoryId,
                    parentID: parentId
                };
                categories[categoryPath] = category;
                let translate = item[ `${key}_Rus-${index+1}`] || item[`${key}`] || item[`${key}_Eng-${index+1}`];
                categoryTranslations.push({ ...categoryTranslationDefaults, description: translate, categoryId: lastCategoryId, languageId: 4 })
                translate = item[ `${key}_Eng-${index+1}`] || item[`${key}`] || item[`${key}_Rus-${index+1}`];
                categoryTranslations.push({ ...categoryTranslationDefaults, description: translate, categoryId: lastCategoryId, languageId: 3 })
                lastCategoryId++;
            }
            parentId = category.categoryId
        });
    });

    saveToCSV(categoryTranslations, 'new_categories_translations');
    saveToCSV(Object.values(categories), 'new_categories');

    return oldCategoryTree;
};

const getKeyWords = (product) => {
    return {
        keywords: `${product.keywords_1 || ''}, ${product.supplier_1 || ''}`,
        keywords_3: `${product.keywords_3 || ''}, ${product.supplier_3 || ''}`,
        keywords_4: `${product.keywords_4 || ''}, ${product.supplier_4 || ''}`
    }
};

const formatDescription = (text) => {
    if(!text) {
        return '';
    }
    const lines = text.split('\n');
    const description = [];
    lines.forEach(item => {
        description.push(`<p>${item}</p>`);
    });
    return description.join('\n');
};

const generateProperties = (product) => {
    const country = product.countryName_1 || product.countryName_3 || product.countryName_4;
    const brand = product.brandName_1 || product.brandName_3 || product.brandName_4;
    const department = product['Ենթաբաժին'] || product['categories_Arm-3'] || product['categories_Arm-2'] || product['categories_Arm-1'] || 'այլ';
    let properties = `Ենթաբաժին:${department}`;
    if(country && country != '#N/A') {
        properties = `${properties}|Արտադրման երկիր:${country}`;
    }
    if(brand && brand != '#N/A') {
        properties = `${properties}|Բրենդ:${brand}`;
    }
    if(product.proteins && product.proteins != '#N/A') {
        properties = `${properties}|Սպիտակուցներ:${product.proteins}`;
    }
    if(product.carbohydrates && product.carbohydrates != '#N/A') {
        properties = `${properties}|Ածխաջրեր:${product.carbohydrates}`;
    }
    if(product.fat && product.fat != '#N/A') {
        properties = `${properties}|Յուղայնություն:${product.fat}`;
    }
    if(product.kcal && product.kcal != '#N/A') {
        properties = `${properties}|Կիլոկալորիա:${product.kcal}`;
    }
    if(product['categories_Arm-2'] ) {
        properties = `${properties}|Բաժին:${product['categories_Arm-2'] }`;
    }
    if(product['Series']) {
        properties = `${properties}|Սերիա:${product['Series']}`;
    }
    if(product['Խումբ']) {
        properties = `${properties}|Խումբ:${product['Խումբ']}`;
    }
    if(product['EnergyClass']) {
        properties = `${properties}|EnergyClass:${product['EnergyClass']}`;
    }
    if(product['TempErature']) {
        properties = `${properties}|TempErature:${product['TempErature']}`;
    }
    if(product['Current']) {
        properties = `${properties}|Current:${product['Current']}`;
    }
    if(product['WarrantyAM']) {
        properties = `${properties}|Warranty:${product['WarrantyAM']}`;
    }
    if(product['OS']) {
        properties = `${properties}|OS:${product['OS']}`;
    }
    if(product['ColorAM']) {
        properties = `${properties}|Color:${product['ColorAM']}`;
    }
    if(product['Resolution']) {
        properties = `${properties}|Resolution:${product['Resolution']}`;
    }
    if(product['Diagonal']) {
        properties = `${properties}|Diagonal:${product['Diagonal']}`;
    }
    if(product['CPU']) {
        properties = `${properties}|CPU:${product['CPU']}`;
    }
    if(product['RAM']) {
        properties = `${properties}|RAM:${product['RAM']}`;
    }
    if(product['HDD']) {
        properties = `${properties}|HDD:${product['HDD']}`;
    }
    if(product['VGA']) {
        properties = `${properties}|VGA:${product['VGA']}`;
    }
    if(product['Power']) {
        properties = `${properties}|Power:${product['Power']}`;
    }
    if(product['Noise']) {
        properties = `${properties}|Noise:${product['Noise']}`;
    }
    if(product['ThermoRegulator']) {
        properties = `${properties}|ThermoRegulator:${product['ThermoRegulator']}`;
    }
    if(product['WM_Load']) {
        properties = `${properties}|WM Load:${product['WM_Load']}`;
    }
    if(product['WM_RPM']) {
        properties = `${properties}|WM RPM:${product['WM_RPM']}`;
    }
    if(product['Year']) {
        properties = `${properties}|Year:${product['Year']}`;
    }
    if(product['Активные ингредиенты']) {
        properties = `${properties}|Активные ингредиенты:${product['Активные ингредиенты']}`;
    }
    return properties;
};

const getProductCategory = (product, categories) => {
    let categoryPath = '';
    if(!product['categories_Arm-1']) {
        return '';
    }
    categoryPath = `${categoryPath}_${product['categories_Arm-1'].toLocaleLowerCase()}`;
    if(product['categories_Arm-2']) {
        categoryPath = `${categoryPath}_${product['categories_Arm-2'].toLocaleLowerCase()}`;
    }
    if(product['categories_Arm-3']) {
        categoryPath = `${categoryPath}_${product['categories_Arm-3'].toLocaleLowerCase()}`;
    }
    if(!categories[categoryPath]) {
        categories[categoryPath] = {id:99999};
        console.log(`${product['categories_Arm-1']}->${product['categories_Arm-2']}->${product['categories_Arm-3']}`)
    }
    return categories[categoryPath];
};

const sortProductImages = (list, product) => {
    if(list.length < 2) {
        return list;
    }
    list.sort((a, b) => {
        const ordernumber = String(product.suppliernumber);
        const searchStar = `_${ordernumber}`
        const sortStr1 = a.substr(a.indexOf(searchStar) + searchStar.length);
        const sortStr2 = b.substr(b.indexOf(searchStar) + searchStar.length);
        return sortStr1 != '.jpg' && sortStr1 > sortStr2;
    });

    return list;
};

const generateProducts = (list, categories, imageList) => {
    const multipleImagesProduct = [];
    const products = list.map(product => {
        // var categoryField = product['Կատեգորիա'] || product['Category'];
        // var customCategories = categoryField.split('\n');
        // customCategories.splice(0, 2);
        // product['categories_Arm-1'] = customCategories[0];
        // product['categories_Arm-2'] = customCategories[1];
        // product['categories_Arm-3'] = customCategories[2];
        const category = getProductCategory(product, categories);
        // customCategories.forEach((categoryArm, index) => {
        //     product[`categories_Rus-${index+1}`] = category[`categories_Rus-${index+1}`];
        //     product[`categories_Eng-${index+1}`] = category[`categories_Eng-${index+1}`];
        // });
        const measurement = String(product.Unit).toLowerCase() || carrFour.units.unit;
        const images = sortProductImages(getProductImages(product, imageList), product);
        const productData = {
            ...product,
            ordernumber: "AP-" + product.suppliernumber,
            mainnumber: "AP-" + product.suppliernumber,
            categories: category.id,
            supplier: product.supplier_1 || product.supplier_3 || product.supplier_4 || 'Ալֆա Ֆարմ',
            tax: "0,00",
            pricegroupID: 1,
            description_long: formatDescription(product.description_long),
            descriptionLong_3: formatDescription(product.descriptionLong_3 || product.descriptionlong_3),
            descriptionLong_4: formatDescription(product.descriptionLong_4 || product.descriptionlong_4),
            description: product.description ? formatDescription(product.description) : formatDescription(product.description_long),
            metatitle: product.name,
            active: 0,
            suppliernumber: product.suppliernumber,
            instock: product.InStock.replace(',', '').replace('.', '') || 1000,
            price_EK: parseInt(product['Price'].replace(',00', '').replace('.', '')) || Math.round(Math.random() * 1000) || 1000,
            unitID: carrFour.mapping[String(measurement)],
            maxpurchase: product.maxpurchase || 100000,
            minpurchase: measurement === carrFour.units.kg ? (product.minCount || product.weightStep || 100) : 1,
            purchasesteps: measurement === carrFour.units.kg ? (product.weightStep || product.minCount || 100) : 1,
            propertyValueName: generateProperties(product),
            propertyGroupName: product.propertyGroupName || "Buy.am defaults",
            imageUrl: images.join('|'),
            weight: '',
            width: '',
            ean: product['ЕАН'],
            // purchasePrice: parseInt(product['Purchase price'].replace(',', '')) || Math.round(Math.random() * 1000) || 1000,
            laststock: 1,
            __old: product,
        }
        delete productData['Կատեգորիա'];
        delete productData['Category'];
        delete productData['Image'];
        delete productData['EnergyClass'];
        delete productData['TempErature'];
        delete productData['Current'];
        delete productData['WarrantyAM'];
        delete productData['OS'];
        delete productData['ColorAM'];
        delete productData['Resolution'];
        delete productData['Diagonal'];
        delete productData['CPU'];
        delete productData['RAM'];
        delete productData['HDD'];
        delete productData['VGA'];
        delete productData['Power'];
        delete productData['Noise'];
        delete productData['ThermoRegulator'];
        delete productData['WM_Load'];
        delete productData['WM_RPM'];
        delete productData['Year'];
        delete productData['WarrantyRU'];
        delete productData['ColorEN'];
        addKeywordsToProduct(productData);
        if(images.length > 1) {
            multipleImagesProduct.push(productData);
        }
        return productData;
    });
    const filtered = productImgList.filter((img, index, arr) => (arr.indexOf(img) === index));
    console.log(imageList.filter(img => !filtered.includes(img)))
    translateProperties(products.reverse().filter(product => !!product.imageUrl));
    // const departments = generateDepartments(products.reverse().filter(product => !!product.imageUrl));

    // saveToCSV(departments, `departments_for_carrefour`);

    saveToCSV(products.reverse().filter(product => !!product.imageUrl).map(product => {
        delete product.__old;
        return product;
    }), `new_products_${index}`);
};

const formatProduct = (list) => {
    return list.map(product => {
        return {
            ordernumber: product.ordernumber,
            name: product.name,
            ean: product.ean,
            brand: product.__old.brandName_1,
            'categories_Arm-1': product.__old['categories_Arm-1'],
            'categories_Arm-2': product.__old['categories_Arm-2'],
            'categories_Arm-3': product.__old['categories_Arm-3']
        }
    })
};

/*
    This function creates file (translate_properties.sql) with SQl query.
    You should run this SQl query to add translations of properties to s_core_translations table.
    Important: If translations of some properties are already exists in s_core_translations table, this query will override them.
    Return value of this function is the created query.
*/
const translateProperties = (products) => {
    const translated = [];
    let sql = '';
    products.forEach(product => {
        product = product.__old;
        const country = product.countryName_1;
        const brand = product.brandName_1;
        const department = product['categories_Arm-3'];
        const subDepartment = product['categories_Arm-2'];
        const group = product['Խումբ'];
        const translations = [];
        if (country && !translated.includes(country)) {
            translated.push(country);
            translations.push({
                original: country,
                ru: product.countryName_4 || country,
                en: product.countryName_3 || country
            });
        }
        if (department && !translated.includes(department) && department != 'Այլ') {
            translated.push(department);
            translations.push({
                original: department,
                ru: product['categories_Rus-3'] || department,
                en: product['categories_Eng-3'] || department
            });
        }
        if (brand && !translated.includes(brand)) {
            translated.push(brand);
            translations.push({
                original: brand,
                ru:product.brandName_4 || product.brandName_1,
                en: product.brandName_3 || product.brandName_1
            });
        }
        if (subDepartment && !translated.includes(subDepartment)) {
            translated.push(subDepartment);
            translations.push({
                original: subDepartment,
                ru: product['categories_Rus-2'] || subDepartment,
                en: product['categories_Eng-2'] || subDepartment
            });
        }
        if (group && !translated.includes(group)) {
            translated.push(group);
            translations.push({
                original: group,
                ru: product['Группа'] || group,
                en: product['Group'] || group
            });
        }
        translations.forEach(translation => {
            sql += `
            DELETE FROM s_core_translations  WHERE objectkey = (SELECT id FROM s_filter_values where value="${translation.original}" limit 1) and
            objecttype="propertyvalue" and id > 0 ;
            INSERT INTO s_core_translations (objecttype, objectdata, objectkey, objectlanguage, dirty) VALUES
            ('propertyvalue', "a:1:{s:11:\\"optionValue\\";s:${Buffer.from(translation.en).length}:\\"${translation.en}\\";}" ,
            (SELECT id FROM s_filter_values where value="${translation.original}" limit 1),
            3, 1 ),
            ('propertyvalue', "a:1:{s:11:\\"optionValue\\";s:${Buffer.from(translation.ru).length}:\\"${translation.ru}\\";}" ,
            (SELECT id FROM s_filter_values where value="${translation.original}" limit 1),
            4, 1 );\n`;
        });
    })

    saveToFile(sql, 'translate_properties.sql', (err, filePath) => {
        console.log(`translations save at: ${filePath}`)
    });

    return sql;
};

const generateDepartments = (products) => {
    const departments = [];
    products.forEach(product => {
        const department = product['categories_Arm-3'] || product['categories_Arm-2'] || product['categories_Arm-1'] || 'այլ';
        // let properties = `Ենթաբաժին:${department}`;
        // const department = product.__old['categories_Arm-2'];
        const { ordernumber } = product;
        departments.push({
            ordernumber,
            mainnumber: ordernumber,
            propertyGroupName: 'Buy.am defaults',
            propertyValueName: `Ենթաբաժին:${department}|Բաժին:${product['categories_Arm-2']}`
        });
    });
    return departments;
};

const generateSimilarCategories = (cb) => {
    parsCSV(similarCategoriesFilPath, (list) =>{
        console.log(list[0]);process.exit()
    });
};
