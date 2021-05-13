const express = require('express')
const memberService = require('./')
const app = express()
 

app.post('/api/addMember', function (req, res) {
    let memberServiceObj = new memberService(req, res)
    memberServiceObj.getMember()
  })
  
  app.get('/api/getMember', function (req, res) {
    let memberServiceObj = new memberService(req, res)
    memberServiceObj.addMember()
  })
 
app.listen(3000, () => console.log('blog server running on port 3000!'))