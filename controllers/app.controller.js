/// VERADARCNUM E POPOXUTYNNNER@
module.exports = getUpdates = (arr1, arr2) => {
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
// /////// veradardznum e ayn apranqnery vorpnq kan pahesyeum
// exports = returnGoodsInStock = (jsonObjs) => jsonObjs.filter(e => +e.Qty)


// /////sortavorum e aprannwne@ id neov

// exports =  sortById = (jsonObjs) => jsonObjs.sort((a, b) => a.BARCOD - b.BARCOD)
