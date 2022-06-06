class _APIHelper {
    async readApiKey () {
        try {
            let privateData = await import(/* webpackIgnore: true */ '../../private/privateData.js');

            if (privateData) {
                let { apiKey } = privateData;

                if (apiKey) {
                    this.key = apiKey
                    return true;
                }
            }
        }
        catch (err) {
            console.log(`Unable to read api key, sticking with test data.`);
        }

        return false;
    }
}

export const APIHelper = new _APIHelper();
