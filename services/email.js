const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(
  "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"
);

const sendWelcomeEmail = (email)=>{
sgMail.send({
  to : email,
  from : 'anshuman@apptunix.com',
  subject: 'Thanks for joining in..',
  text : 'Welcome to the app'
})
}

module.exports = {
  sendWelcomeEmail
}