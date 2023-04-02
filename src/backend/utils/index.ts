export type NormalizedData = {
  id: string;
  labelNameArray: string;
  layer: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

export const normalizeData = (json: any[]): NormalizedData[] => {
  return json.map((item) => {
    const id = item?.properties?.id;
    const labelNameArray = item?.properties?.label;
    return {
      id,
      labelNameArray,
      layer: item?.properties?.layer,
      coordinates: {
        lat: item?.geometry?.coordinates[1],
        lon: item?.geometry?.coordinates[0],
      },
    };
  });
};

type QueryValue = {
  origin: {
    lat: number;
    lon: number;
  };
  destination: {
    lat: number;
    lon: number;
  };
  date: string;
  time: string;
}

export const createQuery = (value: QueryValue): string => `
  {
    plan(
      from: {lat: ${value.origin.lat}, lon: ${value.origin.lon}},
      to: {lat: ${value.destination.lat}, lon: ${value.destination.lon}},
      numItineraries: 5,
      date: "${value.date}",
      time: "${value.time}",
    ) {
      itineraries {
        duration
        walkDistance
        startTime
        endTime
        fares {
          type
          cents
          currency
        }
        legs {
          mode
          startTime
          endTime
          duration
          distance
          trip {
            tripHeadsign
            routeShortName
          }
          from {
            lat
            lon
            name
            stop {
              code
              name
              zoneId
            }
          }
          to {
            lat
            lon
            name
            stop {
              code
              name
              zoneId
            }
          }
          legGeometry {
            length
            points
          }
        }
      }
    }
  }`;
