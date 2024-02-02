import { readFileSync } from "fs";
import { ElectricityReading } from "../../domain/electricity-reading";
import { ElectricityReadingRepository } from "../../domain/electricity-reading.repository";
import { XMLParser } from "fast-xml-parser";

interface XMlReadingLine {
  "#text": string;
  "@_clientID": string;
  "@_period": string;
}

export class XMLElectricityReadingRepository
  implements ElectricityReadingRepository
{
  private readings: ElectricityReading[] = [];
  constructor(filePath: string) {
    const parser = new XMLParser({ ignoreAttributes: false });
    const xml = readFileSync(filePath, "utf-8");
    const json = parser.parse(xml);
    const readings = json["readings"]["reading"];
    readings.forEach((reading: XMlReadingLine) =>
      this.readings.push(this.mappingFromDB(reading))
    );
  }

  findAll(): ElectricityReading[] {
    return this.readings;
  }

  findAllByYear(year: number): ElectricityReading[] {
    return this.readings.filter((reading) => reading.period.year === year);
  }

  private mappingFromDB(xmlLine: XMlReadingLine): ElectricityReading {
    const {
      "#text": amount,
      "@_clientID": clientId,
      "@_period": period,
    } = xmlLine;

    const [year, month] = period.split("-").map((value) => parseInt(value));
    return new ElectricityReading(clientId, { year, month }, parseInt(amount));
  }
}
