'use strict';

const request = require('request');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '<Subscription Key>';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase =
    'https://southeastasia.api.cognitive.microsoft.com/vision/v2.0/recognizeText?mode=Printed';

const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Atomist_quote_from_Democritus.png/338px-Atomist_quote_from_Democritus.png'

// Request parameters.
const params = {
    'language': 'unk',
    'detectOrientation': 'true',
};

const options = {
    uri: uriBase,
    qs: params,
    body: `{"url": "${imageUrl}"}`,
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
    }
};

request.post(options, (error, response, body) => {
    if (error) {
        console.log('Error: ', error);
        return;
    }

    //   console.log(response);
    let resultUrl = response.headers['operation-location'];
    console.log(resultUrl);

    let options = {
        uri: resultUrl,
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    };

    setTimeout(() => {
        request.get(options, (error, response, body) => {
            if (error) {
                console.log('Error: ', error);
                return;
            }

            let jsonResponse = JSON.parse(body);
            console.log(jsonResponse.recognitionResult.lines);
        })
    }, 4000);

});
