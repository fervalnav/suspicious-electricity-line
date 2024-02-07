import { ElectricityReading } from "../electricity-reading";

export class SuspiciousElectricityReadingService {
  private whiteListClient: Array<string> = ["583ef6329d916"];
  constructor(private readonly thresholdPercentage: number) {}

  public isSuspicious(reading: ElectricityReading, value: number): boolean {
    if (this.whiteListClient.includes(reading.clientId)) {
      return false;
    }

    const threshold = this.calculateThreshold(value);
    const lowerLimit = value - threshold;
    const upperLimit = value + threshold;
    return reading.amount < lowerLimit || reading.amount > upperLimit;
  }

  private calculateThreshold(median: number): number {
    return median * (this.thresholdPercentage / 100);
  }
}
