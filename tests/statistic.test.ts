import { Statistic } from "../src/shared/application/statistic";

describe("Statistic tests", () => {
  test("median of empty array is 0", () => {
    expect(Statistic.median([])).toBe(0);
  });

  test("median of array with one element is the element", () => {
    expect(Statistic.median([1])).toBe(1);
  });

  test("median of array with two elements is the average", () => {
    expect(Statistic.median([1, 2])).toBe(1.5);
  });

  test("median of array with three elements is the middle", () => {
    expect(Statistic.median([1, 2, 3])).toBe(2);
  });

  test("median of array with four elements is the average of the middle", () => {
    expect(Statistic.median([1, 2, 3, 4])).toBe(2.5);
  });
});
