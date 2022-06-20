const csv = require('csvtojson')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const _1 = './files/outputFile/o1.csv'
const _2 = "./files/outputFile/o2.csv"


csvToJson(_1, _2)


/// VERADARCNUM E POPOXUTYNNNER@
const getUpdates = (arr1, arr2) => {
  const res = []
  const mapElem = {}
  for (let i = 0; i < arr1.length; i++) {
    mapElem[arr1[i]["BARCOD"]] = arr1[i]
  }
  arr2.forEach(e => {
    if (JSON.stringify(mapElem[e["BARCOD"]]) !== JSON.stringify(e) || !mapElem[e["BARCOD"]]) {
      res.push(e)
    }
  })
  return res
}

function csvToJson(_1, _2) {
  try {
    csv()
      .fromFile(_1)
      .then((jsonObj1) => {
        csv().fromFile(_2)
          .then((jsonObj2) => {
            const updates = getUpdates(jsonObj1, jsonObj2)
            console.log(updates)
            noRep(jsonObj2)
            console.log(jsonObj2)
          })
      })
  } catch (error) {
    console.log(error);
  }
}
///////VERADARCNUM E CKRKNVOX ELEMENTNER@ 
function noRep(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (JSON.stringify(arr[i]) === JSON.stringify(arr[i - 1])) {
      arr.splice(i, 1);
      i--
    }
  }
  return arr
}



module.exports = getUpdates

