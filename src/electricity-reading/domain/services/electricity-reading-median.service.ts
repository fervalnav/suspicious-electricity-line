import { Statistic } from "../../../shared/application/statistic";
import { ElectricityReadingRepository } from "../electricity-reading.repository";

export class ElectricityReadingMedianService {
  private medians: { [ley: number]: number } = {};
  constructor(private readonly repository: ElectricityReadingRepository) {}

  public getMedianByYear(year: number): number {
    if (this.medians[year]) {
      return this.medians[year];
    }

    const readings = this.repository.findAllByYear(year);
    const median = Statistic.median(readings.map((r) => r.amount));
    this.medians[year] = median;
    return median;
  }
}
