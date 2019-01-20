const request = require('request');
const telegram = require('telegram-bot-api');

const channelId = ''; // telegram channel id
const categoryId = '5'; // boxes

var api = new telegram({
    token: '', // bot token
})

function getCat() { // get cat img

    return new Promise(function(resolve, reject) {

        const options = {
            method: 'GET',
            uri: 'https://api.thecatapi.com/v1/images/search?category_ids=' + categoryId,
            json: true
        };

        request(options, function(error, response, body) {

            if (error) return reject(err);

            try {
                var result = body[0]['url'];
                resolve(result);
            } catch(e) {
                reject(e);
            }

        })

    })

}

function sendImageToChannel() { // send cat img to channel

    getCat().then(function(result) {

        api.sendPhoto({
            chat_id: channelId,
            photo: result
        }).then(function(data) {
            console.log(data);
        })

    })

}

setInterval(sendImageToChannel, 3600000); // every hour