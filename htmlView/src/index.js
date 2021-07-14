const fs = require('fs');
const { getAllFilenames } = require('../utils');
const env = require('../../constants')

module.exports.filenames = async () => await getAllFilenames(`./data/searchData`)

module.exports.getNumber = (x) => +x.split('.')[0] 

module.exports.fileProcessData = async (fileName) => {
  const rawData = require(`../../data/searchData/${fileName}`)
  // console.log(rawData)
  let tableData = []
  for (let announceId in rawData) {
    const headerData = {
      announceId,
      reqNumber: rawData[announceId].reqNumber,
      dateTimeTo: rawData[announceId]["Срок окончания приема заявок"]      
    }
    let lotData = rawData[announceId].lots
    annInfoIsVisible = true
    for (let lotId in lotData) {
      tableData = [
        ...tableData,
        {
          annInfoIsVisible,
          ...headerData,
          lotId,
          lotName: lotData[lotId]["Наименование"],
          lotAddFeature: lotData[lotId]["Дополнительная характеристика"],
          lotSum: lotData[lotId]["Сумма 1 год"],
          lotTechSpec: lotData[lotId].spec
        }
      ]
      annInfoIsVisible = false
    }
  }
  return tableData
}
