const Handlebars = require("handlebars");
const pdf = require("html-pdf");

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

const create = async function (document, options) {
  return new Promise((resolve, reject) => {
    if (!document || !document.html || !document.data) {
      reject(new Error("Some, or all, options are missing."));
    }

    // Fix nodejs > 14
    if (!options) {
      options = {
        childProcessOptions: {
          env: {
            OPENSSL_CONF: "/dev/null",
          }
        }
      }
    } else {
      options.childProcessOptions = {
        env: {
          OPENSSL_CONF: "/dev/null",
        }
      }
    }

    // Compiles a template
    const html = Handlebars.compile(document.html)(document.data);

    // Create PDF from html template generated by handlebars
    // Output will be PDF file

    switch (document.type) {
      case "buffer":
        pdf.create(html, options).toBuffer((err, res) => {
          if (!err) resolve(res);
          else reject(err);
        });
        break;

      case "stream":
        pdf.create(html, options).toStream((err, res) => {
          if (!err) resolve(res);
          else reject(err);
        });
        break;

      default:
        pdf.create(html, options).toFile(document.path, (err, res) => {
          if (!err) resolve(res);
          else reject(err);
        });
        break;
    }
  });
};

module.exports.create = create;
