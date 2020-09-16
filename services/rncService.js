const request = require("request");
const StreamZip = require("node-stream-zip");
const fs = require("fs");
class rncService {
  constructor() {
    this.url = "http://dgii.gov.do/app/WebApps/Consultas/RNC/DGII_RNC.zip";
    this.public = "public/";
    this.output = `${this.public}DGII_RNC.zip`;
    this.zip = null;
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
