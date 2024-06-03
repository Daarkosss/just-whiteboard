var express = require('express');
var cors = require('cors')
var axios = require('axios');

const app = express();

require('dotenv').config()

app.use(cors());

app.post('/login',async (req, res) => {
  var accessToken = req.body.accessToken;
  try{
    await axios({
      method: 'get',
      url: 'https://www.googleapis.com/oauth2/v3/tokeninfo',
      params: { id_token: accessToken }
    }).then((response) => {
      if (response.data.aud && response.data.exp) {
        //Sprawdź czy jest user w bazie, jeśli nie to dodaj i cos tam se zrob
      } else{
        res.status(401).json({message: 'Invalid token'});
      }
    });
  } catch(e){
    console.log(e);
  }
});
// Logout route

module.exports = app;