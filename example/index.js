const { readFileSync, writeFileSync } = require("fs");
const { create } = require("../dist/index");

const html = readFileSync(__dirname + "/example.html", "utf8");

const options = {
  format: "A4",
  orientation: "portrait",
  border: "10mm"
};

const document = {
  html: html,
  data: {
    customer: {customerCode: '12345', name: 'Francesco', surname: 'Clementi', fiscalCode: '123456678'},
  },
  type: "buffer"
}

async function generate(){
  try {
    const doc = await create(document, options);
    writeFileSync(__dirname + '/test.pdf', doc);
  } catch(err) {
    console.error(err);
    throw new Error(err);
  }
}

generate();
