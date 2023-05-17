const express = require('express')
const app = express()

// '/'にアクセスされたときは、index.htmlを返す。
app.get('/', (req, res) => {
  return res.sendFile(`${__dirname}/index.html`)
})

// '/(任意の文字列)'にアクセスされたときは、(任意の文字列).htmlを返す。
app.get('/:route', (req, res) => {
  return res.sendFile(`${__dirname}/${req.params.route}.html`)
})

// '/images/(任意の文字列)'にアクセスされたときは、images/(任意の文字列)を返す。
app.get('/images/:img', (req, res) => {
  return res.sendFile(`${__dirname}/images/${req.params.img}`)
})

// '/styles/(任意の文字列)'にアクセスされたときは、styles/(任意の文字列)を返す。
app.get('/styles/:css', (req, res) => {
  return res.sendFile(`${__dirname}/styles/${req.params.css}`)
})

// '/scripts/(任意の文字列)'にアクセスされたときは、scripts/(任意の文字列)を返す。
app.get('/scripts/:js', (req, res) => {
  return res.sendFile(`${__dirname}/scripts/${req.params.js}`)
})

// ポート8080番でリクエストを受け付けるようなサーバを立ち上げる。
const port = 8080
app.listen(port, () => console.log(`Listening to port ${port}`))
