const { getAnnounceData } = require('../queries');
const {query, getDocument} = require('../utils');
const { getTechSpec } = require('./getTechSpec');
const env = require('../constants')
const randomMathDelay = require('../utils/randomMathDelay') 

module.exports.getAnnounceData = async (announceId, announceMethod) => {

  const methods = env.METHODS

  const config = {...getAnnounceData}
  config.url += announceId
  config.params = {
    tab: 'lots'
  }
  // console.log(config.url )
  const delay = randomMathDelay(env.CD_DATA)
  const res = await query(config, delay)

  const document = await getDocument(res, false)

  // console.log(document.body.innerHTML)
  const JSONData = {}

  const annLabel = document.querySelector('.panel-footer .label.label-info')
  const reqNumber = +annLabel.textContent.split(':')[1].trim() | 'нет данных'
  const annPanel = document.querySelector('.content-block > .panel.panel-default')
  const lotsPanel =  document.querySelector('.content-block > .panel:not(.panel-default)')
    .querySelector('.panel.panel-default')
    .querySelector('.table-responsive')

  JSONData.reqNumber = reqNumber

  // console.log(annPanel.querySelectorAll('.form-group'))
  
  for (let field of annPanel.querySelectorAll('.form-group')) {
    let label = field.querySelector('label').textContent
    const input = field.querySelector('input')
    if (input) {
      let value = input.value
      JSONData[label] = value
    }   
  }
  const groupId = methods[announceMethod] || null
  // console.log("group", groupId, announceMethod, methods)
  let techSpecData = []
  if (groupId) {
    techSpecData = await getTechSpec(groupId, announceId)
  }


  const headers = lotsPanel.querySelectorAll('tr')[0].querySelectorAll('th')

  const headerData = {}
  for (let num of Object.keys(headers)) {
    headerData[num] = headers[num].textContent 
  }
  // console.log(headerData)
  const table = [...lotsPanel.querySelectorAll('tr')]
  table.shift()

  let tableData = {}
  // console.log(techSpecData)
  for (let row of table) {
    let cells = row.querySelectorAll('td')
    let lotId = cells['1'].textContent.trim() 
    // console.log(lotId)
    tableData[lotId] = {}
    const lotTechSpec = techSpecData.find(el => el[0] === lotId)
    if (lotTechSpec) {      
      tableData[lotId].spec = lotTechSpec[1]
      // console.log(tableData[lotId].spec)
    } else {
      tableData[lotId].spec = null
    }    
    for (let index of Object.keys(cells)) {
      tableData[lotId][headerData[index]] = cells[index].textContent.trim() 
    }
  }

  const unsignedLots = techSpecData.filter(el => 
    !Object.keys(tableData).find(lotId => lotId === el[0])
  )

  // console.log('uns:',unsignedLots)
  for (let lot of unsignedLots) {
    // console.log(lot)
    tableData[lot[0]] = {}
    tableData[lot[0]].spec = lot[1]
  } 

  JSONData.lots = tableData

  // console.log(tableData)

  // console.log(headerData)

  // console.log(JSONData)

  
  // console.log('ANNPANNEL\n\n')
  // console.log(annPanel.innerHTML)
  // console.log( '==========\n\n')
  // console.log('LOTSPANEL\n\n')
  // console.log(lotsPanel.innerHTML)

  return(JSONData)
}