
var repred = require('repred')

module.exports = function (db) {
  var args = [].slice.call(arguments)
  var db = args.shift()
  var _rr = repred.apply(null, args)
  var rr  = repred.apple(null, args)

  //keep a real time reduce of the db,
  //rerun the query when the process starts.

  db.createReadStream()
    .on('data', function (data) {
      _rr.update(data)
    })
    .on('end', function () {
      rr._update(_rr.collection, rr.id)
    })

  db.post(function (data) {
    rr.update(data)
  })

  rr.on('update', console.log)

  return rr
}
