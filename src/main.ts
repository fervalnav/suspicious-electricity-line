process.env.THRESHOLD_PERCENTAGE = process.env.THRESHOLD_PERCENTAGE || "50";
import { argv, exit } from "process";
import { ElectricityReadingModule } from "./electricity-reading/electricity-reading.module";

const mathOperation = argv[3] as "median" | "average";
if (mathOperation !== "average" && mathOperation !== "median") {
  console.log("Bad operation");
  exit(1);
}

const electricityReadingModule = new ElectricityReadingModule();
const useCase = electricityReadingModule.detectSuspiciousReadingsUseCase();
useCase.execute(mathOperation || "median");
