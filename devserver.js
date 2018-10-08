const spawn = require('child_process').spawn
const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

spawn('flask', ['run'])

let bundler = new Bundler('src/index.js', {
  outFile: 'main.js',
  outDir: 'app/static',
  cache: false,
})

let server = express()

server.use(bundler.middleware())

server.use(
  '*',
  proxy({
    target: 'http://localhost:5000'
  })
)

server.listen(Number(process.env.PORT || 1234))
