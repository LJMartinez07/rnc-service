const request = require("request");
const StreamZip = require("node-stream-zip");
const fs = require("fs");
const entityModel = require("../models/entity.model");
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
      for await (const line of rl) {
        var res = line.split("|");
        const entity = await entityModel.updateOne(
          {
            rnc: res[0].toString(),
          },
          {
            $set: {
              nombre: res[1],
              nombre_comercial: res[2],
              actividad_economica: res[3],
              regimen_de_pagos: res[10],
              estado: res[9],
            },
          },
          { upsert: true }
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  getRncZip() {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("getting zip");
        let response = await request(this.url);
        response = await response.pipe(fs.createWriteStream(this.output));
        response.on("close", function () {
          console.log("success zip");
          resolve(true); // ¡Todo salió bien!
        });
      } catch (e) {
        reject(false);
      }
    });
  }

  async extractFile() {
    return new Promise((resolve, reject) => {
      try {
        console.log("extract zip");
        this.zip = new StreamZip({
          file: this.output,
          storeEntries: true,
        });
        this.zip.on("ready", () => {
          this.zip.extract("TMP/DGII_RNC.TXT", this.public, (err) => {
            console.log(err ? "Extract error" : "Extracted");
            resolve(true);
            this.zip.close();
          });
        });
      } catch (e) {
        reject(false);
      }
    });
  }
}

module.exports = new rncService();
