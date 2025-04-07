const FS = require('fs');
const Mailjet = require('node-mailjet');

async function sendEmail(fileName, newClasses) {
    const mailjet = Mailjet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE,
    );

    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: process.env.EMAIL,
                        Name: "CLASSPASS OPENINGS AUTO NOTIFY"
                    },
                    To: [
                        {
                            Email: process.env.EMAIL,
                            Name: process.env.NAME
                        }
                    ],
                    Subject: 'NEW CLASSES AVAILABLE',
                    TextPart: `Newly Available: ${newClasses.join(`\n`)}\n
                        \nAll Openings: ${JSON.stringify(FS.readFileSync(fileName), null, 2)}`
                    //HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
                }
            ]
        })

    request
        .then((result) => {
            console.log(result.body)
            return result.statusCode;
        })
        .catch((err) => {
            console.log(err.statusCode)
            return err.statusCode;
        })
}

module.exports = { sendEmail };