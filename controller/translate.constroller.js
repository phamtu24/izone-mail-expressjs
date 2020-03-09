const {Translate} = require('@google-cloud/translate').v2;
const axios = require('axios');
const querystring = require('querystring');

module.exports.googleTranslate = async (req, res) => {

    const googleTranslate = new Translate({
        　projectId: 'SwiftBase',
        　key: 'AIzaSyCq0_ljwf7C0uBf6yaL8h3vDvlzHVTi2OI',
        });
      
        const text = req.body.sourceText;
      // The target language
      const target = 'vi';
      const options = {
          from: req.body.sourceLang,
          to: target
      }
      
      // Translates some text into Russian
      googleTranslate.translate(text, options)
       .then(results => {
        const translation = results[0];
      
        res.send(translation)
        })
       .catch(err => {
        res.send(err)
      });
}

module.exports.papagoTranslate = async (req, res) => {
    const requestBody = {
        source: req.body.sourceLang === 'ko' ? 'ko' : 'ja',
        target: req.body.sourceLang === 'ko' ? 'vi' : 'en',
        text: req.body.sourceText
    };

    const papago = 'https://openapi.naver.com/v1/papago/n2mt';

    axios({
        method: "POST",
        url: papago,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Naver-Client-Id': 'kP_gjVo2xaKlgL23Uetb',
            'X-Naver-Client-Secret': 'Gl5ltWKYKR'
        },
        data: querystring.stringify(requestBody)
    }).then(result => {
        let a = result.data.message.result.translatedText
        res.send(a)
    }).catch(err => {
        res.send(err)
    })
}