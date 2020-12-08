const gdal = require('../lib/gdal.js')

console.log('GDAL Version:', gdal.version)

// gc tracing
try {
  gdal.startLogging(`${__dirname}/artifacts/log.txt`)
} catch (e) {
  /* ignore */
}

// seg fault handler
let SegfaultHandler
try {
  SegfaultHandler = require('segfault-handler')
  SegfaultHandler.registerHandler()
} catch (err) {
  /* ignore */
}
