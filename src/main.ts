process.env.THRESHOLD_PERCENTAGE = process.env.THRESHOLD_PERCENTAGE || "50";
import { ElectricityReadingModule } from "./electricity-reading/electricity-reading.module";

const electricityReadingModule = new ElectricityReadingModule();
const useCase = electricityReadingModule.detectSuspiciousReadingsUseCase();
useCase.execute();
