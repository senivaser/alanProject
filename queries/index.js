const headers = {
  "Host": "www.goszakup.gov.kz",
  "Connection": "keep-alive",
  "Cache-Control": "max-age=0",
  "sec-ch-ua": `"Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"`,
  "sec-ch-ua-mobile": "?0",
  "Upgrade-Insecure-Requests": "1",
  "DNT": "1",
  "User-Agent": "Chrome/91.0.4472.77 ",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-User": "?1",
  "Sec-Fetch-Dest": "document",
  "Referer": "https://www.goszakup.gov.kz/",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "ru-KZ,ru-RU;q=0.9,ru;q=0.8,en-US;q=0.7,en;q=0.6"
  
}


const env = require('../constants')

module.exports.getAnnouncesList = {
  rejectUnauthorized: false,
  method: 'GET',
  baseURL: '',
  url: 'http://www.goszakup.gov.kz' + env.ANNOUNCE_SEARCH_URL,
  headers
}

module.exports.getAnnounceData = {
  rejectUnauthorized: false,
  method: 'GET',
  baseURL: 'http://www.goszakup.gov.kz',
  url: env.ANNOUNCE_URL,
  headers
}

module.exports.getTechSpec = {
  rejectUnauthorized: false,
  method: 'GET',
  baseURL: 'http://www.goszakup.gov.kz',
  url: env.ANNOUNCE_FILES_URL,
  headers
}