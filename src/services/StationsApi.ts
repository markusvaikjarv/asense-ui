import { IStationData } from '../types';

const API_URL = process.env.API_URL ?? '';
const API_TOKEN =
  process.env.API_TOKEN ?? 'c8a7a7f4-c1a2-4c2a-a193-ea6d7ed720d6';

const authRequest = async (
  path: string,
  parameters: Record<string, unknown> = {}
) => {
  return fetch(`${API_URL}${path}`, {
    ...parameters,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      ...(parameters.headers || {}),
    },
  });
};

export class StationsApi {
  static async getAllStations(): Promise<IStationData[]> {
    const req = await authRequest('/api/stations');

    return req.json();
  }

  static async createStation(station: IStationData): Promise<IStationData> {
    const req = await authRequest('/api/stations', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(station),
    });

    return req.json();
  }

  static async modifyStation(station: IStationData): Promise<IStationData> {
    const req = await authRequest(`/api/stations/${station?.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(station),
    });

    return req.json();
  }

  static async deleteStation(id: string): Promise<void> {
    await authRequest(`/api/stations/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return;
  }
}
