import { Statistic } from "../../../shared/application/statistic";
import { ElectricityReadingRepository } from "../electricity-reading.repository";

/**
 * This service probably should be in other domain, but for the sake of the example, I will leave it here
 */
export class ElectricityReadingMedianService {
  private mediansByYear: { [key: number]: number } = {};
  constructor(private readonly repository: ElectricityReadingRepository) {}

  public getMedianByYear(year: number): number {
    if (this.mediansByYear[year]) {
      return this.mediansByYear[year];
    }

    const readings = this.repository.findAllByYear(year);
    const median = Statistic.median(readings.map((r) => r.amount));
    this.mediansByYear[year] = median;
    return median;
  }
}
