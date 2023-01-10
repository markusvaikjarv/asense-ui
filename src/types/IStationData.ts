type PumpType = 'GAS_95' | 'GAS_98' | 'DIESEL';

type PumpConfiguration = {
  price: number | undefined;
  active: boolean | undefined;
};

export interface IStationData {
  id?: string;
  name?: string;
  latitude: number;
  longitude: number;
  street?: string;
  city?: string;
  pumps?: Record<PumpType, PumpConfiguration> | undefined;
}
