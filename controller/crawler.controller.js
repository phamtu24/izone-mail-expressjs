const gaonChart = require('../crawl/gaonCrawler')
const ichartChart = require('../crawl/ichartCrawler')

const crawler = async (req, res) => {
    try {
        switch (req.query.text) {
            case 'gaon': {
                let chart = await gaonChart()
                res.send(chart)
                return
            }
            case 'ichart': {
                let chart = await ichartChart()
                res.send(chart)
                return
            }
        }
        res.send('hello')
    } catch(err) {
        res.send('something wrong');
    }
}

module.exports = crawler