const axios = require('axios')
const cheerio = require('cheerio')

function getPageInfo(strUrl) {

    if (!strUrl || strUrl === 'undefined') {
        return {
            status: 400,
            message: `Invalid url '${strUrl}'`
        }
    }

    pageInfo = axios.get(strUrl).then(resp => {

        const $ = cheerio.load(resp.data);
        title = $('title').text()
        desc = $("meta[name='description']").attr('content') || $("meta[name='Description']").attr('content') || ''
        keywords = $("meta[name='keywords']").attr('content') || ''
        return {
            title, desc, keywords, siteUrl: strUrl
        }
    }).catch(err => {
        console.log(` Error %s`, err)

        errResp = { type: 'Error' }

        if (err.response) {
            errResp.status = err.response.status;
            errResp.message = err.message;
        } else {
            if (err.message.includes('ENOTFOUND'))
                errResp.message = err.message;
            errResp.status = 400
        }
        return errResp
    });

    return pageInfo;
}

module.exports = getPageInfo

//getPageInfo('https://www.google.com/').then(resp => console.log(resp))