require('ssl-root-cas')
  .inject();

require('dotenv').config()

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const env = require('./constants')

const { getAnnouncesList, getAnnounceData } = require('./stages');
const { output, clearJSONData, getTimeDifferenseHMS, deleteFile, getFilesizeInBytes, readJSONFromFile } = require('./utils');
const { timeout } = require('./utils/timeout');

const main = async () => {
  await output('./data/qq', '')
  let annList = 'start'
  let page = 0
  let annNum = 0
  const dateStart = new Date().getTime()
  await clearJSONData('./data/searchData')
  console.log('Номер Объявления | Количество Объявлений || Количество Запросов | Время работы парсера')
  while (annList !== null) {
    page += 1
    annList = await getAnnouncesList(page)
    if(annList === null) {
      break
    }
    await output('./data/announces.json', JSON.stringify(annList))

    const announces = JSON.parse(await readJSONFromFile('./data/announces.json') )
    // console.log(announces)

    let searchData = {}
    for (let announce of announces) {
      annNum += 1
      let announceId = Object.keys(announce)[0]
      // console.log(announce, announce[announceId])
      // let methodRow = {
      //   [env.METHOD_HEADER]:announce[announceId]
      // }
      // console.log(methodRow)
      // let announceData = await getAnnounceData(announceId)
      // const announceDataFull = {...methodRow, ...announceData}
      // console.log(announceDataFull)
      searchData[announceId] = {[env.METHOD_HEADER]:announce[announceId], ...await getAnnounceData(announceId, announce[announceId])}
      let dateNow = new Date().getTime()
      
      console.log(announceId, '|  ', annNum, '|| ', await getFilesizeInBytes('./data/qq'), '|  ', getTimeDifferenseHMS(dateStart, dateNow))
    }
    await output(`./data/searchData/${page}.json`, JSON.stringify(searchData))
    
    
  }
}

main()