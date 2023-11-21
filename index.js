
const Handlebars = require("handlebars");
const pdf = require('html-pdf');


Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

const create = function (doc, options) {
  return new Promise(async (resolve, reject) => {
    if (!doc || !doc.html || !doc.data) {
      reject(new Error("Some, or all, options are missing."));
    }
    // Compiles a template
    const html = Handlebars.compile(doc.html)(doc.data);
    pdf.create(html).toBuffer(function(err, buffer){
      resolve(buffer);
    });
  })};


module.exports.create = create;