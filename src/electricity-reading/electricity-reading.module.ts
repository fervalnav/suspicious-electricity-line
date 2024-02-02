import { DetectSuspiciousReadingsUseCase } from "./application/detect-suspicious-readings.use-case";
import { ElectricityReadingRepository } from "./domain/electricity-reading.repository";
import { ElectricityReadingMedianService } from "./domain/services/electricity-reading-median.service";
import { SuspiciousElectricityReadingService } from "./domain/services/suspicious-electricity-reading.service";
import { CSVElectricityReadingRepository } from "./infrastructure/repository/csv-electricity-line.repository";
import { XMLElectricityReadingRepository } from "./infrastructure/repository/xml-electricity-line.repository";

export class ElectricityReadingModule {
  private _repository?: ElectricityReadingRepository;
  private _suspiciousElectricityReadingService?: SuspiciousElectricityReadingService;
  private _electricityReadingMedianService?: ElectricityReadingMedianService;
  private _detectSuspiciousReadingsUseCase?: DetectSuspiciousReadingsUseCase;

  public detectSuspiciousReadingsUseCase(): DetectSuspiciousReadingsUseCase {
    if (!this._detectSuspiciousReadingsUseCase) {
      this._detectSuspiciousReadingsUseCase =
        new DetectSuspiciousReadingsUseCase(
          this.repository(),
          this.suspiciousElectricityReadingService(),
          this.electricityReadingMedianService()
        );
    }
    return this._detectSuspiciousReadingsUseCase;
  }

  public suspiciousElectricityReadingService(): SuspiciousElectricityReadingService {
    if (!this._suspiciousElectricityReadingService) {
      this._suspiciousElectricityReadingService =
        new SuspiciousElectricityReadingService(
          Number(process.env.THRESHOLD_PERCENTAGE)
        );
    }
    return this._suspiciousElectricityReadingService;
  }

  public electricityReadingMedianService(): ElectricityReadingMedianService {
    if (!this._electricityReadingMedianService) {
      this._electricityReadingMedianService =
        new ElectricityReadingMedianService(this.repository());
    }
    return this._electricityReadingMedianService;
  }

  private repository(): ElectricityReadingRepository {
    if (!this._repository) {
      const databasePath = process.argv[2];
      if (databasePath?.endsWith(".csv")) {
        this._repository = new CSVElectricityReadingRepository(databasePath);
        return this._repository;
      }

      if (databasePath?.endsWith(".xml")) {
        this._repository = new XMLElectricityReadingRepository(databasePath);
        return this._repository;
      }

      console.log("Invalid file extension. Please use .csv or .xml");
      process.exit(1);
    }

    return this._repository;
  }
}
