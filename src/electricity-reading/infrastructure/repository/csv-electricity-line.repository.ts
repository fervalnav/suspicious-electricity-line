import { readFileSync } from "fs";
import { ElectricityReading } from "../../domain/electricity-reading";
import { ElectricityReadingRepository } from "../../domain/electricity-reading.repository";

export class CSVElectricityReadingRepository
  implements ElectricityReadingRepository
{
  private readings: ElectricityReading[] = [];
  constructor(filePath: string) {
    readFileSync(filePath, "utf-8")
      .split("\n")
      .filter((line: string) => line !== "")
      .slice(1)
      .forEach((line: string) => this.readings.push(this.mappingFromDB(line)));
  }

  findAll(): ElectricityReading[] {
    return this.readings;
  }

  findAllByYear(year: number): ElectricityReading[] {
    return this.readings.filter((reading) => reading.period.year === year);
  }
  private mappingFromDB(csvLine: string): ElectricityReading {
    const [clientId, periodString, amount] = csvLine.split(",");
    const [year, month] = periodString
      .split("-")
      .map((value) => parseInt(value));
    return new ElectricityReading(clientId, { year, month }, parseInt(amount));
  }
}
