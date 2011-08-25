fs     = require('fs')
url    = require('url');
server = require('node-router').getServer()
im     = require('imagemagick')

server.get("/favicon.ico", function(request, response){
  return ""
})

server.get("/recommend", function(request, response, match) {
  var urlObj = url.parse(request.url, true);
  var msg = '"' + urlObj.query.body + '"'

  var output = "/tmp/fuck-" + Math.floor(Math.random(10000000)*10000000) + '.jpg'
  
  var args = [
    "snoop.jpg",
    '-font', 'bello.ttf',
    '-pointsize', '64',
    '-gravity', 'center',
    '-resize', '475x',
    '-draw', 'rotate -7 text 3,104 ' + unescape(msg),
    '-fill', 'white',
    '-draw', 'rotate -7 text 0,100 ' + unescape(msg),
    '-fill', 'black',
    output
  ]

  im.convert(args, function(){
    fs.readFile(output, function (err, data) {
      if (err) throw err;
      response.writeHead(200, {'Content-Type': 'image/jpeg' })
      response.end(data)
    });
  })
})

server.listen(process.env.PORT || 8080, '0.0.0.0')
