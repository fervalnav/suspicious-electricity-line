import { ElectricityReading } from "../electricity-reading";

export class SuspiciousElectricityReadingService {
  constructor(private readonly thresholdPercentage: number) {}

  public isSuspicious(reading: ElectricityReading, median: number): boolean {
    const threshold = this.calculateThreshold(median);
    const lowerLimit = median - threshold;
    const upperLimit = median + threshold;
    return reading.amount < lowerLimit || reading.amount > upperLimit;
  }

  private calculateThreshold(median: number): number {
    return median * (this.thresholdPercentage / 100);
  }
}
