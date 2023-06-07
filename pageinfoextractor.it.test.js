const supertest = require('supertest');

const { getTestServer } = require('@google-cloud/functions-framework/testing');

require('./index.js')

describe('Intergration Testing::getPageInfo', () => {

    it('getPageInfo with valid url get page details', async () => {
        const server = getTestServer('pageInfoExtractor');
        await supertest(server)
            .post("/")
            .send({ siteUrl: "https://www.google.com/" })
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect({ "title": "Google", "desc": "", "keywords": "", siteUrl: 'https://www.google.com/' });
    })

    it('getPageInfo with invalid Page gets 404 error', async () => {
        const server = getTestServer('pageInfoExtractor');
        await supertest(server)
            .post("/")
            .send({ siteUrl: "https://www.google.com/dfdfdf.html" })
            .set('Content-Type', 'application/json')
            .expect(404)
            .expect("Request failed with status code 404");
    })

    it('getPageInfo with invalid URL gets 400 error', async () => {
        const server = getTestServer('pageInfoExtractor');
        await supertest(server)
            .post("/")
            .send({ siteUrl: "https://www.nositexists.com/dfdfdf.html" })
            .set('Content-Type', 'application/json')
            .expect(400)
            .expect("getaddrinfo ENOTFOUND www.nositexists.com");
    })

    it('getPageInfo without URL gets 400 error', async () => {
        const server = getTestServer('pageInfoExtractor');
        await supertest(server)
            .post("/")
            .set('Content-Type', 'application/json')
            .expect(400)
            .expect("Bad Request with Empty URL");
    })

    it('getPageInfo with invalid method gets 405 error', async () => {
        const server = getTestServer('pageInfoExtractor');
        await supertest(server)
            .get("/")
            .expect(405)
            .expect("Method not supported");
    })

})
