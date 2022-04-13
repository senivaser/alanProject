module.exports = {
  ...require('./getAnnouncesList'),
  ...require('./getAnnounceData')
}

module.exports.getDocSafe = async (config) => {
  const delay = randomMathDelay(delay)
  const res = await query(config, delay)
  if (res.response && res.response.request.path === '/ru/captcha') {
    console.log(`captcha ${env.CD_CAPTCHA}`)
    await timeout(env.CD_CAPTCHA)
    return this.detDocSafe(delay, config)
  }
  // console.log('res', res)
  return await getDocument(res)
}