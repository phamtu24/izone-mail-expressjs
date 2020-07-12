const puppeteer = require('puppeteer');

const ichartRank = async() => {

    // Mở trình duyệt mới và tới trang của kenh14
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.instiz.net/popup_ichart_change.htm?mode=0&song=환상동화&artist=아이즈원');

    // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
    const chartRank = await page.evaluate(() => {
        let listHtml = document.querySelectorAll('li')
        let siteNameList = []
        let chartNameList = []
        let rankList = []
        for (let i of listHtml) {
            if (i.style.cssText.includes('20')) {
                siteNameList.push(i.innerText)
            } else if (i.style.cssText.includes('40')) {
                chartNameList.push(i.innerText)
            } else if (i.style.cssText.includes('15')) {
                rankList.push(i.innerText)
            }
        }
        let result = ''
        for (let i = 0; i <= siteNameList.length-2;i++) {
            result += `${siteNameList[i]} - ${chartNameList[i]} - ${rankList[i]} \n \n`
        }
        return result;
    });

    await page.goto(`https://translate.google.com/#view=home&op=translate&sl=ko&tl=en&text=${chartRank}`)
    await page.waitForSelector('.tlid-translation', { timeout: 10000 })
  
    const translation = await page.evaluate(() => document.querySelector('.tlid-translation').textContent)
    await page.close()

    // In ra kết quả và đóng trình duyệt
    await browser.close();
    return translation
}

module.exports = ichartRank