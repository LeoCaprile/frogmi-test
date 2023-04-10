import { describe, it, expect } from "vitest";
import { Incident, Store } from "..";

const testCase1: Incident[] = [
  {
    id: 1,
    description: "problem to solve",
    status: "open",
    estimation: 4,
    createdAt: new Date("04/10/23"),
  },
  {
    id: 2,
    description: "problem to solve",
    status: "open",
    estimation: 6,
    createdAt: new Date("04/11/23"),
  },
  {
    id: 3,
    description: "problem to solve",
    status: "solved",
    estimation: 2,
    createdAt: new Date("04/12/23"),
  },
];

const testCase2: Incident[] = [
  {
    id: 1,
    description: "problem to solve",
    status: "open",
    estimation: 4,
    createdAt: new Date("04/10/23"),
  },
  {
    id: 2,
    description: "problem to solve",
    status: "solved",
    estimation: 2,
    createdAt: new Date("04/11/23"),
  },
  {
    id: 3,
    description: "problem to solve",
    status: "open",
    estimation: 8,
    createdAt: new Date("04/12/23"),
  },
  {
    id: 4,
    description: "problem to solve",
    status: "open",
    estimation: 4,
    createdAt: new Date("04/13/23"),
  },
  {
    id: 5,
    description: "problem to solve",
    status: "solved",
    estimation: 2,
    createdAt: new Date("04/14/23"),
  },
];

const testCase3 = [];

describe("Incident Store", () => {
  describe("incident_status Method", () => {
    it("should return status of all incident when no arguments are pass", () => {
      const some_store = new Store(testCase1);
      expect(some_store.incident_status()).toEqual({
        open_cases: 2,
        closed_cases: 1,
        average_solution: 5,
        maximum_solution: 6,
      });
    });

    it("should return the status of incidents in the range of dates", () => {
      const some_store = new Store(testCase2);
      const startDate = new Date("04/11/2023");
      const endDate = new Date("04/13/2023");

      expect(some_store.incident_status(startDate, endDate)).toEqual({
        open_cases: 2,
        closed_cases: 1,
        average_solution: 6,
        maximum_solution: 8,
      });
    });

    it("should return the incidentResume if just the startDate argument is pass and no endDate", () => {
      const some_store = new Store(testCase2);
      const startDate = new Date("04/11/2023");

      expect(some_store.incident_status(startDate)).toEqual({
        open_cases: 2,
        closed_cases: 2,
        average_solution: 6,
        maximum_solution: 8,
      });
    });

    it("should return the incidentResume if just the endDate argument is pass and no startDate", () => {
      const some_store = new Store(testCase2);
      const endDate = new Date("04/11/2023");

      expect(some_store.incident_status(null, endDate)).toEqual({
        open_cases: 1,
        closed_cases: 1,
        average_solution: 4,
        maximum_solution: 4,
      });
    });

    it("should return initial state of incidentResume when initialize with no incidents", () => {
      const some_store = new Store(testCase3);
      expect(some_store.incident_status()).toEqual({
        open_cases: 0,
        closed_cases: 0,
        average_solution: 0,
        maximum_solution: 0,
      });
    });
  });
});
