const express = require("express");
const cors = require("cors");
const request = require("request");
const cheerio = require("cheerio");
const path = require('path');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API);



const app = express();
const PORT = process.env.PORT | 3001;

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));


app.post("/spam-check", async function (req, res) {
  const options = {
    url: `https://app.mailgenius.com/spam-test/${req.body.slug}`,
    method: "GET",
  };
  request(options, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let htmlTag = $("html");
      htmlTag.each(function () {
        var result = JSON.parse(
          $(this).find("div").attr("data-inbound_email_audit_json")
        );
        res.json(result.mailTesterProps);
      });
    } else {
      console.log("Error scraping site, please try again");
    }
  });
});

// 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 - Sendgrid API

app.post("/add-email", async function (req, res) {
  res.json({ status: true });
});

app.post("/send-email", async function (req, res) {
  const { emailTemplate, userEmail, toEmail, emailSubject } = req.body;
  const msg = {
    to: toEmail,
    from: userEmail,
    subject: emailSubject,
    html: emailTemplate,
  };
  sgMail.send(msg).then(success=>{
      res.send(true)
  }).catch(err=>{
    console.log(err)
      res.status(404).send(false)
  })
});

app.post("/send-email-spam", async function (req, res) {
  const { emailTemplate, slug, userEmail, emailSubject } = req.body;
  const msg = {
    to: `test-${slug}@test.mailgenius.com`,
    from: userEmail,
    subject: emailSubject,
    html: emailTemplate,
  };
  sgMail.send(msg).then(success=>{
      res.send(true)
  }).catch(err=>{
      res.status(404).send(false)
  })
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
