const { getAnnouncesList } = require('../queries');
const {query, getDocument} = require('../utils')
const env = require('../constants')
const randomMathDelay = require('../utils/randomMathDelay') 

module.exports.getAnnouncesList = async (page) => {
  const config = getAnnouncesList
  config.params = {
    'filter[end_date_from]': env.DATE_END_FROM,
    'filter[end_date_to]': env.DATE_END_TO,
    'filter[status]': ['210', '220', '240'],
    'filter[method]': ['3', '2', '7', '126','129'],
    'filter[trade_type]': 'g',
    count_record: env.COUNT_RECORD,
    page,
  }
  
  const delay = randomMathDelay(env.CD_LIST)
  const res = await query(config, delay)
  
  const document = await getDocument(res)

  const headers = document.querySelectorAll('#search-result > thead > tr > th')
  // console.log(headers[1].textContent)
  const headerData = {}
  for (num of Object.keys(headers)) {
    headerData[num] = headers[num].textContent.trim() 
  }
  const refTab = +Object.keys(headerData).find(key => headerData[key] === env.ANNOUNCE_ID_HEADER);
  const methodTab = +Object.keys(headerData).find(key => headerData[key] === env.METHOD_HEADER);

  // console.log(methodTab)

  const annRefs = document.querySelectorAll(`#search-result > tbody > tr > td:nth-child(${refTab+1}) > a`)
  const annMethods = document.querySelectorAll(`#search-result > tbody > tr > td:nth-child(${methodTab+1})`)

  // console.log(annRefs)
  // console.log(annMethods)
  
  // console.log(annRefs[0].href.split('/ru/announce/index/')[1])
  // Object.keys(annRefs[0])
  const announces = []
  if (annRefs.length) {
    let i = 0
    for (ref of annRefs) {
      let announceId = ref.href.split(env.ANNOUNCE_URL)[1]
      let method = annMethods[i].textContent
      announces.push({[announceId]: method})
    }
  } else {
    return null
  }
  
  
  // console.log(announces)
  return announces
}