const { query, getDocument } = require("../utils")
const randomMathDelay = require("../utils/randomMathDelay")
const { timeout } = require("../utils/timeout")
const env = require('../constants')


module.exports.getDocSafe = async (delay, config) => {
  const _thisDelay = randomMathDelay(delay)
  const res = await query(config, _thisDelay)
  if (res.response && res.response.request.path === '/ru/captcha') {
    console.log(`captcha ${env.CD_CAPTCHA}`)
    await timeout(env.CD_CAPTCHA)
    return await this.getDocSafe(delay, config)
  }
  // console.log('res', res)
  return await getDocument(res)
}