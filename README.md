# Handlebars Puppeteer PDF Generator

Generate PDF documents using html template and javascript.

## Installation

```
npm install jshtml-to-pdf
yarn install jshtml-to-pdf
```
## Usage example

```
const { readFileSync, writeFileSync } = require("fs");
const { create } = require("jshtml-to-pdf");

const html = readFileSync(__dirname + "/example.html", "utf8");

const document = {
  html: html,
  data: {
    customer: {customerCode: '12345', name: 'Francesco', surname: 'Clementi', fiscalCode: '123456678'},
  },
}

create(document).then(doc => writeFileSync(__dirname + '/test.pdf', doc));
```
