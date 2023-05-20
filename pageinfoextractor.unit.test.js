const getPageInfo = require('./pageinfoextractor')
const axios = require('axios')


jest.mock('axios')

describe('Unit Testing:: pageinfoextractor', () => {

    it('Google Page Info should have title', async () => {
        axios.get.mockResolvedValueOnce({data:"<html><head><title>Google</title></head></html>"});
        const resp = await getPageInfo('https://www.google.com/');
        expect(axios.get).toHaveBeenCalledWith('https://www.google.com/')
        expect(resp).not.toBeNull();
        expect(resp.title).toBe('Google');
    });

    it('Amazon Page must have keywords and desc', async () => {
        axios.get.mockResolvedValueOnce({data:"<html><head>"+
                                         "<meta name='description' content='amazon shopping'>"+
                                         "<meta name='keywords' content='amazon, shopping'>"+
                                         "</head></html>"});
        const resp = await getPageInfo('https://www.amazon.in/');
        expect(axios.get).toHaveBeenCalledWith('https://www.amazon.in/')
        expect(resp).not.toBeNull();
        expect(resp.desc).not.toBeNull();
        expect(resp.keywords).toBe('amazon, shopping');
    });

    it('Unknown Page must return error message with 404', async () => {
        axios.get.mockReturnValueOnce(Promise.reject({message: 'Request failed with status code 404', response: {status:404}}));
        const err = await getPageInfo('https://www.google.com/dfdfdfdf');
        expect(err).not.toBeNull();
        expect(err.status).toBe(404);
    })

   it('Unknown Site must return error message with 400', async () => {
        axios.get.mockReturnValueOnce(Promise.reject({message: 'ENOTFOUND', response: {status:400}}));
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
});