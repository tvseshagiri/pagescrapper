const functions = require('@google-cloud/functions-framework')
const getPageInfo = require('./pageinfoextractor')

functions.http('pageInfoExtractor', async (req, resp) => {
    switch (req.method) {
        case 'POST': {
            ({siteUrl} = req.body)

            if (!siteUrl) {
                resp.status(400).send({message:"Empty URL"})
            }

            const pageInfo = await getPageInfo(siteUrl)
            resp.status(200).send(pageInfo)
        }
        default: {
            resp.status(405).send({message:"Method not supported"})
        }
    }
})