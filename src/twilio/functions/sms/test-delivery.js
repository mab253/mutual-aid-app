exports.handler = function codeSms(context, event, callback) { // eslint-disable-line
  const Airtable = require("airtable"); // eslint-disable-line
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: context.AIRTABLE_API_KEY // eslint-disable-line
  });

  const base = Airtable.base("apppK7mrvMPcwtv6d");
  let code = event.Body;
  code = code.toUpperCase().trim();

  base("Requests")
    .select({
      view: "Only Delivery Needed",
      maxRecords: 1,
      filterByFormula: `({Code} = '${code}')`,
    })
    .firstPage(function seekRecords(err, records) {
      records.forEach(function getRecordInfo(record) {
        console.log("Retrieved", record.get("Code"));
        console.log("ID", record.id);
        const phone = record.get("Phone");
        const firstName = record.get("First Name");
        const list = record.get("Intake General Notes");
        const street1 = record.get("Cross Street #1");
        const street2 = record.get("Cross Street #2");
        console.log(list);

        const twilioClient = context.getTwilioClient();
        twilioClient.messages.create({
          to: event.From,
          from: event.To,
          body: `Thanks for taking on this delivery for ${firstName}!\nCODE = ${code}.\n\nTheir phone is ${phone}, you will need to get in touch with them about the full address. Their cross streets are ${street1} & ${street2}.\n\n${firstName}'s grocery list is: ${list}\n\n[INTAKE VOL], at [INTAKE PHONE], can help if you have any questions - they'll reach out to you to follow up and make sure the delivery goes 👍`,
        });
      });
    });

  callback();
};
