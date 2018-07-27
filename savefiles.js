const fs = require('fs')

function mkdir_p(_dir) {
  console.log(_dir)
  if (!fs.existsSync(_dir)) {
    fs.mkdirSync(_dir)
  }
}

module.exports = {
  _initCalled: false,  
  _outputDir: 'outputs',
  init: (_dir) => {
    if (_dir !== undefined) module.exports._outputDir = _dir
    mkdir_p(module.exports._outputDir)
    module.exports._initCalled = true
  },
  nextFileWritestream: (prefix) => {
    if (module.exports._initCalled) {
      if (typeof prefix === 'undefined') prefix = ''
      else if (prefix !== '') prefix += '_'

      let i = 0
      let current_files = fs.readdirSync(module.exports._outputDir)
      while(current_files.indexOf(`${prefix}${i}.json`) >= 0) i++
      let filename = `${prefix}${i}.json`
      
      let ws = fs.createWriteStream('./output')
      ws.on('error', err => {
        console.log(err)
      })
      return ws
    }
  },
  nextFile: (data, prefix) => {
    if (module.exports._initCalled)
    {
      if (typeof prefix === 'undefined') prefix = ''
      else if (prefix !== '') prefix += '_'
  
      let i = 0
      let current_files = fs.readdirSync(module.exports._outputDir)
      while(current_files.indexOf(`${prefix}${i}.json`) >= 0) i++
      let filename = `${prefix}${i}.json`
      fs.writeFile(`${module.exports._outputDir}/${filename}`, JSON.stringify(data), (err) => {
        if (err) console.log("Error writing to file")
      })
      return i
    }
  }
}
