module.exports = {
  DATE_END_FROM: process.env.DATE_END_FROM,
  DATE_END_TO: process.env.DATE_END_TO,
  SUM_FROM: process.env.SUM_FROM,
  SUM_TO: process.env.SUM_TO,
  COUNT_RECORD: process.env.COUNT_RECORD,
  ANNOUNCE_ID_HEADER: process.env.ANNOUNCE_ID_HEADER,
  METHOD_HEADER: process.env.METHOD_HEADER,
  LOT_HEADER: process.env.LOT_HEADER,
  SPEC_HEADER: process.env.SPEC_HEADER,
  ANNOUNCE_URL: process.env.ANNOUNCE_URL,
  ANNOUNCE_SEARCH_URL: process.env.ANNOUNCE_SEARCH_URL,
  ANNOUNCE_FILES_URL: process.env.ANNOUNCE_FILES_URL,
  CD_LIST: +process.env.CD_LIST,
  CD_DATA: +process.env.CD_DATA,
  CD_TECHSPEC: +process.env.CD_TECHSPEC,
  CD_CAPTCHA: +process.env.CD_CAPTCHA,
  METHODS: {
    'Запрос ценовых предложений': process.env.METHOD_ZCP,
    'Открытый конкурс': process.env.METHOD_OK,
    'Аукцион': process.env.METHOD_A,
    'Запрос ценовых предложений (не ГЗ new)': process.env.METHOD_ZCP_NONGZ,
    'Аукцион (не ГЗ)': process.env.METHOD_A_NONGZ
  }

}