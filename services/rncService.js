const request = require("request");
const StreamZip = require("node-stream-zip");
const fs = require("fs");
const readline = require("readline");
class rncService {
  constructor() {
    this.url = "http://dgii.gov.do/app/WebApps/Consultas/RNC/DGII_RNC.zip";
    this.public = "public/";
    this.output = `${this.public}DGII_RNC.zip`;
    this.zip = null;
  }

  async readFile() {
    try {
      const fileStream = fs.createReadStream(this.public + "DGII_RNC.TXT");
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });
      // Note: we use the crlfDelay option to recognize all instances of CR LF
      // ('\r\n') in input.txt as a single line break.

      for await (const line of rl) {
        var res = line.split("|");
        console.log(res);
        // Each line in input.txt will be successively available here as `line`.
        // console.log(`${line}`);
        return 0;
      }

      // fs.readFile(this.public + "DGII_RNC.TXT", "utf8", function (err, data) {
      //   if (err) throw err;
      //   console.log(data);
      // });
    } catch (e) {}
  }

  async getRncZip() {
    try {
      request(this.url)
        .pipe(fs.createWriteStream(this.output))
        .on("close", function () {
          console.log("File written!");
          return Promise.resolve;
          true;
        });
      return Promise.reject(false);
    } catch (e) {
      console.error(e);
    }
  }

  async extractFile() {
    try {
      this.zip = new StreamZip({
        file: this.output,
        storeEntries: true,
      });
      this.zip.on("ready", () => {
        this.zip.extract("TMP/DGII_RNC.TXT", this.public, (err) => {
          console.log(err ? "Extract error" : "Extracted");
          this.zip.close();
        });
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new rncService();
