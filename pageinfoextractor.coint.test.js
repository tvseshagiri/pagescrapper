const getPageInfo = require('./pageinfoextractor')


describe("Component IT::Page Info Fetcher", () => {

    it('Google Page Info should have title', async () => {
        const resp = await getPageInfo('https://www.google.com/');
        expect(resp).not.toBeNull();
        expect(resp.title).toBe('Google');
    });

    it('Amazon Page must have keywords and desc', async () => {
        const resp = await getPageInfo('https://www.amazon.in/');
        expect(resp).not.toBeNull();
        expect(resp.desc).not.toBeNull();
        expect(resp.keywords).not.toBe('');
    });

    it('Amazon unknown Page must return error message with 404', async () => {
        const err = await getPageInfo('https://www.amazon.in/dfdfdfdf');
        expect(err).not.toBeNull();
        expect(err.status).toBe(404);
    })

    it('Unknown Site must return error message with 400', async () => {
        const err = await getPageInfo('https://www.amdddazon.in/dfdfdfdf');
        expect(err).not.toBeNull();
        expect(err.status).toBe(400);
        expect(err.message).toEqual(expect.stringContaining('ENOTFOUND'));
    })

    it('Empty URL must return message with 400', async () => {
        const err = await getPageInfo();
        expect(err).not.toBeNull();
        expect(err.status).toBe(400);
        expect(err.message).toBe("Invalid url 'undefined'");
    })
})
