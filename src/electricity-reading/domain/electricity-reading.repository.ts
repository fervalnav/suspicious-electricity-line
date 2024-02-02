import { ElectricityReading } from "./electricity-reading";

export interface ElectricityReadingRepository {
  findAll(): ElectricityReading[];
  findAllByYear(year: number): ElectricityReading[];
}
