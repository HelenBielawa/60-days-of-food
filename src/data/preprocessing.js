import fs from "fs";
import csvToJson from 'csvtojson';
import * as aq from "arquero";
import { stringify } from "querystring";
const { op } = aq;

const pathToCsv = "./60Days_data.csv"
const csvData= fs.readFileSync(pathToCsv, "utf8")

const jsonData = await csvToJson().fromFile(pathToCsv);

const jsonString = JSON.stringify(jsonData, null, 2)


fs.writeFileSync("foodData.json", jsonString, "utf8");