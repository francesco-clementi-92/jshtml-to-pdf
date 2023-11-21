const { readFileSync, writeFileSync } = require("fs");
const { create } = require("../index");

const html = readFileSync(__dirname + "/example.html", "utf8");

const document = {
  html: html,
  data: {
    customer: {customerCode: '12345', name: 'Francesco', surname: 'Clementi', fiscalCode: '123456678'},
  },
}

create(document).then(doc => writeFileSync(__dirname + '/test.pdf', doc));
