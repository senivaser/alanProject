const axios = require('axios');
const jsdom = require('jsdom')
const fs = require('fs');
const { execSync } = require("child_process");
const { timeout } = require('./timeout');
const env = require('../constants')


process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
module.exports.query = async (config, delay = 0) => {

  let response
  await timeout(delay)
  await this.appendToOutput(`./data/qq`, 'q')
  await axios(config)  
    .then( (res) => {response = {err:false, response:res, delay: delay}})
    .catch( (err) => {response = {err:true, message: err.message, code: err.code, response: (err.response) ? err.response: err, errBody: err, delay: delay}})    
  return response
} 

module.exports.htmlParse = async (data) => {
  return new jsdom.JSDOM(data)
}

module.exports.getDocument = async (res, output = false) => {
  try{
    // console.log(res.response.request.path, res.delay)
    // console.log(res.response)

    // if (res.response && res.response.request.path === '/ru/captcha') {
    //   console.log(`captcha ${env.CD_CAPTCHA}`)
    //   await timeout(env.CD_CAPTCHA)
    //   return this.getDocument(res, output)
   
    // }
     
    // await this.output('./response.json', JSON.stringify(res.response.data))
    const page = res.response.data
    if (output) {
      this.output('./output.html', page)
    }    
    const dom = await this.htmlParse(page) 
    return dom.window.document
  } catch(err) {
    if (err.message === "captcha error"){
      throw "captcha error"
    }
    console.log("PARSE_ERROR")
    console.log(err)
  }
}

module.exports.output = async (path, data) => {
  
  return fs.writeFileSync(path, data, {encoding: 'utf-8'}, async function(err) {
    if(err) {
        return console.log(err);
    }
  console.log("The file was saved!");
  }); 


}

module.exports.appendToOutput = async (path, data) => {
  return fs.appendFileSync(path, data, err => {
    if (err) throw("CANT APPEND DATA")
  })
}

module.exports.getAllFilenames = async (folder) => {
  return fs.readdirSync(folder, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    return files
  });
  
}

module.exports.readJSONFromFile = async (path) => {
  return fs.readFileSync(path, 'utf8', async function (err, data) {
    return JSON.parse(data);
  });
}


module.exports.deleteFile = async (path) => {
  try {
    return fs.unlinkSync(path, err => {
      if (err) throw "CANT CLEAR DATA";
    });
  } catch (err) {
    console.log(err)
  }
}

module.exports.getFilesizeInBytes = async(path) => {
  const stats = fs.statSync(path);
  return stats | stats.size;
}

module.exports.clearJSONData = async (folderPath) => {
  try{
    const filenames = await this.getAllFilenames(folderPath)
    for (let filename of filenames) {
      await this.deleteFile(`${folderPath}/${filename}`)
    } 
    //   return execSync(`rm -r ${folderPath}/*.json`, async function (error, stdout, stderr) {
    //     if (error) {
    //         console.log(`error: ${error.message}`);
    //         return;
    //     }
    //     if (stderr) {
    //         console.log(`stderr: ${stderr}`);
    //         return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    // })
  } catch(err) {
      throw err
  }  
}

module.exports.getTimeDifferenseHMS = (date1, date2) => {


  let dif = new Date(date2 - date1)
  let milliseconds = dif % 1000
  let timeDif = dif / 1000
  let seconds = Math.floor(timeDif) % 60
  let minutes = Math.floor(timeDif / 60) % 60
  let hours = Math.floor(timeDif / 3600)
      
  const formatTimeNum = (num) => {
    return (num.toString().split('').length === 1) ?
      ('0'+num): num
  }

  const formatMS = (num) => {
    const msLength = num.toString().split('').length
    let zeroRepeat
    if (msLength !== 3) {
      const zero = '0'
      zeroRepeat = zero.repeat(3 - msLength)
    }    
    return (msLength !== 3) ?
      (zeroRepeat+num): num
  }
      
  return `${formatTimeNum(hours)}:${formatTimeNum(minutes)}:${formatTimeNum(seconds)}.${formatMS(milliseconds)}`
}

// module.exports.query({
//   rejectUnauthorized: false,
//   method: 'GET',
//   baseURL: 'http://www.goszakup.gov.kz',
//   url: '/ru/announce/index',
//   // headers,
//   params: {
//     tab: "lots"
//   }
// }).then((res) => {this.getDocument(res)})

// module.exports.getFilesizeInBytes('./utils/txt.txt').then(res => console.log(res))