const express = require('express')
const nsq = require('nsqjs')
const app = express()
const port = 3000

const reader = new nsq.Reader('test', 'test', {
  lookupdHTTPAddresses: 'localhost:32768'
})

reader.connect()

reader.on('message', msg => {
  console.log('Received message [%s]: %s', msg.id, msg.body.toString())
  msg.finish()
})

reader.on('error', err => {
    console.log({err});
  })

app.listen(port, () => console.log(`NSQ Consumer is listening on port ${port}!`))