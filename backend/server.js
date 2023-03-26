const dotenv = require('dotenv').config()
const express = require('express')

const app = express()

app.get('/', (_, res) => {
  res.send('Project MERN')
})

const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})
