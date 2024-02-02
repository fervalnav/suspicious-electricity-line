import { CSVElectricityReadingRepository } from "../src/electricity-reading/infrastructure/repository/csv-electricity-line.repository";

describe("CSVRepository tests", () => {
  // Initialize the repository
  const exampleRepository = new CSVElectricityReadingRepository(
    "tests/files/csv-example.csv"
  );

  it("should return all the readings", () => {
    const readings = exampleRepository.findAll();
    expect(readings.length).toBe(10);
  });

  it("should return all the readings by year", () => {
    const readings = exampleRepository.findAllByYear(2016);
    expect(readings.length).toBe(2);
    expect(readings.every((reading) => reading.period.year === 2016)).toBe(
      true
    );
  });

  it("should return an empty array when there are no readings for the year", () => {
    const readings = exampleRepository.findAllByYear(2021);
    expect(readings.length).toBe(0);
  });

  it("should return an empty array when there are no readings", () => {
    const repository = new CSVElectricityReadingRepository(
      "tests/files/empty.csv"
    );
    const readings = repository.findAll();
    expect(readings.length).toBe(0);
  });

  it("should return an error when the file does not exist", () => {
    expect(() => {
      new CSVElectricityReadingRepository("tests/files/invalid.csv");
    }).toThrow("ENOENT: no such file or directory");
  });
});
