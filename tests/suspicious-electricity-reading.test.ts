import { ElectricityReading } from "../src/electricity-reading/domain/electricity-reading";
import { SuspiciousElectricityReadingService } from "../src/electricity-reading/domain/services/suspicious-electricity-reading.service";

describe("SuspiciousElectricityReadingService", () => {
  const thresholdPercentage = 50;
  const service = new SuspiciousElectricityReadingService(thresholdPercentage);

  it("should return false when the reading is equal to the median", () => {
    const reading = new ElectricityReading(
      "1",
      { year: 2016, month: 1 },
      50000
    );
    const median = 50000;
    const suspicious = service.isSuspicious(reading, median);
    expect(suspicious).toBe(false);
  });

  it("should return true when the reading is less than the lower limit", () => {
    const reading = new ElectricityReading(
      "1",
      { year: 2016, month: 1 },
      20000
    );
    const median = 50000;
    const suspicious = service.isSuspicious(reading, median);
    expect(suspicious).toBe(true);
  });

  it("should return true when the reading is greater than the upper limit", () => {
    const reading = new ElectricityReading(
      "1",
      { year: 2016, month: 1 },
      80000
    );
    const median = 50000;
    const suspicious = service.isSuspicious(reading, median);
    expect(suspicious).toBe(true);
  });

  it("should return false when the reading is within the threshold", () => {
    const reading = new ElectricityReading(
      "1",
      { year: 2016, month: 1 },
      60000
    );
    const median = 50000;
    const suspicious = service.isSuspicious(reading, median);
    expect(suspicious).toBe(false);
  });

  it("should return false when the reading is same lower limit of the threshold", () => {
    const reading = new ElectricityReading(
      "1",
      { year: 2016, month: 1 },
      25000
    );
    const median = 50000;
    const suspicious = service.isSuspicious(reading, median);
    expect(suspicious).toBe(false);
  });

  it("should return false when the reading is same upper limit of the threshold", () => {
    const reading = new ElectricityReading(
      "1",
      { year: 2016, month: 1 },
      75000
    );
    const median = 50000;
    const suspicious = service.isSuspicious(reading, median);
    expect(suspicious).toBe(false);
  });
});
