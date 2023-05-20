const functions = require('@google-cloud/functions-framework')
const getPageInfo = require('./pageinfoextractor')

functions.http('pageInfoExtractor', async (req, resp) => {
    switch (req.method) {
        case 'POST': {
            ({siteUrl} = req.body)

            if (!siteUrl) {
                resp.status(400).send("Bad Request with Empty URL")
            } else {
            const pageInfo = await getPageInfo(siteUrl)
            if (pageInfo.type == 'Error') {
                resp.status(pageInfo.status)
                .send(pageInfo.message)
            } else {
                resp.status(200).send(pageInfo)
            }
        }
            break;
        }
        default: {
            resp.status(405).send("Method not supported")
        }
    }
})