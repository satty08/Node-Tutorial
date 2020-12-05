const sgmail = require('@sendgrid/mail')

sgmail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'satyambhardawaj@gmail.com',
        subject: 'Thanks for joining us!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'satyambhardawaj@gmail.com',
        subject: 'Cancelation Email',
        text: `We apologies ${name} for you disconnecting with us!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}