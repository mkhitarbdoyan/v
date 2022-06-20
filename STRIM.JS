const fs = require('fs')
const axios = require('axios');
const csv = require('csvtojson')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const converter = require('json-2-csv')

const data = []

function getData(phat = 'https://b2b.hogart.ru/api/v1/product') {
    console.log(data.length)
    try {
        axios({
            method: 'get',
            url: phat,
            params: {
                "per-page":500 
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer  n3OnA1tBTP9MXoq1p-q4Uk3ecx4thhjO"
            },
            body: {
                "phone": "+70000000056",
                "password": "gZSYNyWf"
            }

        })
            .then((res) => {
                const nex = res.data.links.next
                if (nex) {
                    getData(res.data.links.next.href)
                    data.push(...res.data.items)  
                } else {
                    console.log(data);
                    csvWriter(data)
                }
            });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleAxiosError(error);
        } else {
            handleUnexpectedError(error);
        }
    }
}
getData()



// function csvWriter(data, path = "../files/outputFile/hog.csv") {
//     try {
//         const csvWriter = createCsvWriter({
//             path: path,
//             header: [
//                 { id: 'defaultPrice:', title: 'defaultPrice:' },
//                 { id: 'id', title: 'id' },
//                 { id: 'isModel', title: 'isModel' },
//                 { id: 'type', title: 'type' },
//                 { id: 'article', title: 'article' },
//                 { id: 'articleHtml', title: 'articleHtml' },
//                 { id: 'manufacturerCode', title: 'manufacturerCode' },
//                 { id: 'name', title: 'name' },
//                 { id: 'shortName', title: 'shortName' },



//             ]
//         });
//         csvWriter
//             .writeRecords(data)
//             .then(() => console.log('The CSV file was written successfully'));

//     } catch (error) {
//         console.log(error);
//     }
// }


function csvWriter(data, path = "../files/outputFile/Hogart.csv") {
    converter.json2csv(data, (err, csv) => {
        if (err) {
            throw err;
        }
        fs.writeFile(path, csv, (err) => {
            if (err) return console.log(err);
            console.log('The CSV file was written successfully');
        })
    });

}