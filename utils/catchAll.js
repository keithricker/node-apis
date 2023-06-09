function catchAll(app,staticPaths) {
  app.get('*', (req, res) => {
    let returnFile
    staticPaths.some(pth => {
      if (fs.existsSync(pth+req.url)) {
        returnFile = pth+req.url
        return true
      }
    })
    res.sendFile(returnFile)
  })
}
module.exports = catchAll