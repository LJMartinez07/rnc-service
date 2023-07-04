const request = require("request");
const StreamZip = require("node-stream-zip");
const fs = require("fs");
const { ObjectId } = require('mongodb');
const entityModel = require("../models/entity.model");
const readline = require("readline");
class rncService {
  constructor() {
    this.url = "http://dgii.gov.do/app/WebApps/Consultas/RNC/DGII_RNC.zip";
    this.public = "public/";
    this.output = `${this.public}DGII_RNC.zip`;
    this.zip = null;
    this.batchSize = 1000;
  }

  async readFile() {
    try {

      await entityModel.deleteMany({});
      const fileStream = fs.createReadStream(this.public + "DGII_RNC.TXT");
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

     
      console.time('read');
      let batch = [];
      let batchCount = 0;
      for await (const line of rl) {
        var res = line.split("|");
        batch.push({
          rnc: res[0],
          nombre: res[1],
          nombre_comercial: res[2],
          actividad_economica: res[3],
          regimen_de_pagos: res[10],
          estado: res[9],
        });

        batchCount++;

        if (batchCount === this.batchSize) {
          await entityModel.insertMany(batch);
          batch = [];
          batchCount = 0;
        }
      }
        

      if (batchCount > 0) {
        await entityModel.insertMany(batch);
      }


      console.timeEnd('read');

     

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
        response.on("close", async function () {
          console.log("success getting zip");
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
