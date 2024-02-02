import { ElectricityReadingRepository } from "../domain/electricity-reading.repository";
import { ElectricityReadingMedianService } from "../domain/services/electricity-reading-median.service";
import { SuspiciousElectricityReadingService } from "../domain/services/suspicious-electricity-reading.service";

export class DetectSuspiciousReadingsUseCase {
  constructor(
    private readonly _repository: ElectricityReadingRepository,
    private readonly _suspiciousReadingService: SuspiciousElectricityReadingService,
    private readonly _electricityReadingMedianService: ElectricityReadingMedianService
  ) {}

  execute(): void {
    console.log(`| Client    \t\t | Month \t | Suspicious \t | Median \t |`);
    console.log(
      ` ----------------------------------------------------------------------- `
    );

    const readings = this._repository.findAll();
    readings.forEach((reading) => {
      const median = this._electricityReadingMedianService.getMedianByYear(
        reading.period.year
      );

      if (this._suspiciousReadingService.isSuspicious(reading, median)) {
        console.log(
          `| ${reading.clientId} \t | ${reading.period.month} \t\t | ${reading.amount} \t | ${median} \t |`
        );
      }
    });
  }
}
