import { ElectricityReading } from "../src/electricity-reading/domain/electricity-reading";
import { SuspiciousElectricityReadingService } from "../src/electricity-reading/domain/services/suspicious-electricity-reading.service";

describe("Suspicious electricity reading tests", () => {
  const service = new SuspiciousElectricityReadingService(50);

  it("should return true when the reading is suspicious", () => {
    const reading = new ElectricityReading(
      "1",
      { year: 2016, month: 1 },
      100000
    );
    const suspicious = service.isSuspicious(reading, 50000);
    expect(suspicious).toBe(true);
  });
});
