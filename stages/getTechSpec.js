const { getTechSpec } = require('../queries');
const {query, getDocument} = require('../utils')
const env = require('../constants')
const randomMathDelay = require('../utils/randomMathDelay') 

module.exports.getTechSpec = async (groupId, announceId) => {
  const config = {...getTechSpec}
  config.url += `${announceId}/${groupId}`
  // console.log(config.url)

  const delay = randomMathDelay(env.CD_TECHSPEC)
  const res = await query(config, delay)

  // console.log('res', res)
  const document = await getDocument(res)
  // console.log(document.innerHTML)

  const headers = document.querySelectorAll('th')
  // console.log(headers[1].textContent)
  const headerData = {}
  for (num of Object.keys(headers)) {
    headerData[num] = headers[num].textContent.trim() 
  }

  const idTab = +Object.keys(headerData).find(key => headerData[key] === env.LOT_HEADER);
  const specTab = +Object.keys(headerData).find(key => headerData[key] === env.SPEC_HEADER);

  const lotIds = document.querySelectorAll(`table > tbody > tr > td:nth-child(${idTab+1})`)
  const lotSpec = document.querySelectorAll(`table > tbody > tr > td:nth-child(${specTab+1})`)

  const tecSpecs = []
  // console.log(lotSpec)
  if (lotIds.length) {
    let i = 0
    for (lotId of lotIds) {      
      // console.log(lotSpec[i])
      tecSpecs.push([lotId.textContent.trim() || null, lotSpec[i].innerHTML.trim() || null])
      i+=1
    }
  } else {
    return null
  }

  // console.log(tecSpecs)

  return tecSpecs
}