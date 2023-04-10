type Status = "solved" | "open";

export interface Incident {
  id: number;
  description: string;
  status: Status;
  estimation: number;
  createdAt: Date;
}

interface IncidentResume {
  open_cases: number;
  closed_cases: number;
  average_solution: number;
  maximum_solution: number;
}

export class Store {
  incidents: Incident[];

  constructor(incidents: Incident[]) {
    this.incidents = incidents;
  }

  incident_status(
    startDate?: Date | null,
    endDate?: Date | null
  ): IncidentResume {
    let incidentsResume: IncidentResume = {
      open_cases: 0,
      closed_cases: 0,
      average_solution: 0,
      maximum_solution: 0,
    };

    let incidents = this.incidents;

    if (startDate && endDate) {
      incidents = this.incidents.filter(
        (incident) =>
          incident.createdAt.getTime() >= startDate.getTime() &&
          incident.createdAt.getTime() <= endDate.getTime()
      );
    } else if (startDate && !endDate) {
      incidents = this.incidents.filter(
        (incident) => incident.createdAt.getTime() >= startDate.getTime()
      );
    } else if (!startDate && endDate) {
      incidents = this.incidents.filter(
        (incident) => incident.createdAt.getTime() <= endDate.getTime()
      );
    }

    if (incidents.length === 0) {
      return incidentsResume;
    }

    incidents.forEach((incident) => {
      if (incident.status === "open") {
        incidentsResume.open_cases++;
      } else {
        incidentsResume.closed_cases++;
      }
    });

    const open_cases = incidents.filter(
      (incident) => incident.status === "open"
    );

    const maxEstimation = Math.max(
      ...open_cases.map((incident) => incident.estimation)
    );

    open_cases.forEach((incident) => {
      incidentsResume.average_solution += incident.estimation;
    });

    incidentsResume.average_solution = Math.floor(
      incidentsResume.average_solution / open_cases.length
    );

    incidentsResume.maximum_solution = maxEstimation;

    return incidentsResume;
  }
}
