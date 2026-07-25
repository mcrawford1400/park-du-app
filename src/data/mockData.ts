export type VehicleSize = 'compact' | 'standard' | 'large';
export type SpotStatus = 'open' | 'taken';

export interface ParkingSpot {
  id: string;
  number: string;
  lot: string;
  lotId: string;
  status: SpotStatus;
  price: number;
  distance: string;
  timeLimit: string;
  reservedUntil?: string;
  vehicleSize: VehicleSize;
  row: number;
  col: number;
}

export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  spots: ParkingSpot[];
}

export const PARKING_LOTS: ParkingLot[] = [
  {
    id: 'lot-a',
    name: 'Lot A',
    address: 'University Hall — 2199 S University Blvd',
    spots: [
      { id: 'A1', number: 'A1', lot: 'Lot A', lotId: 'lot-a', status: 'open',  price: 5, distance: '0.1 mi', timeLimit: '2 hr',    vehicleSize: 'compact',  row: 0, col: 0 },
      { id: 'A2', number: 'A2', lot: 'Lot A', lotId: 'lot-a', status: 'taken', price: 5, distance: '0.1 mi', timeLimit: '2 hr',    vehicleSize: 'standard', row: 0, col: 1, reservedUntil: '2:00 PM' },
      { id: 'A3', number: 'A3', lot: 'Lot A', lotId: 'lot-a', status: 'open',  price: 5, distance: '0.1 mi', timeLimit: '2 hr',    vehicleSize: 'standard', row: 0, col: 2 },
      { id: 'A4', number: 'A4', lot: 'Lot A', lotId: 'lot-a', status: 'open',  price: 5, distance: '0.1 mi', timeLimit: 'All day', vehicleSize: 'large',    row: 1, col: 0 },
      { id: 'A5', number: 'A5', lot: 'Lot A', lotId: 'lot-a', status: 'taken', price: 5, distance: '0.1 mi', timeLimit: '2 hr',    vehicleSize: 'compact',  row: 1, col: 1, reservedUntil: '4:30 PM' },
    ],
  },
  {
    id: 'lot-b',
    name: 'Lot B',
    address: 'Pioneer Hall — 2050 E Evans Ave',
    spots: [
      { id: 'B1', number: 'B1', lot: 'Lot B', lotId: 'lot-b', status: 'open',  price: 5, distance: '0.2 mi', timeLimit: '4 hr',    vehicleSize: 'standard', row: 0, col: 0 },
      { id: 'B2', number: 'B2', lot: 'Lot B', lotId: 'lot-b', status: 'open',  price: 5, distance: '0.2 mi', timeLimit: '4 hr',    vehicleSize: 'standard', row: 0, col: 1 },
      { id: 'B3', number: 'B3', lot: 'Lot B', lotId: 'lot-b', status: 'taken', price: 5, distance: '0.2 mi', timeLimit: '4 hr',    vehicleSize: 'compact',  row: 0, col: 2, reservedUntil: '1:00 PM' },
      { id: 'B4', number: 'B4', lot: 'Lot B', lotId: 'lot-b', status: 'open',  price: 5, distance: '0.2 mi', timeLimit: 'All day', vehicleSize: 'large',    row: 1, col: 0 },
      { id: 'B5', number: 'B5', lot: 'Lot B', lotId: 'lot-b', status: 'open',  price: 5, distance: '0.2 mi', timeLimit: '4 hr',    vehicleSize: 'standard', row: 1, col: 1 },
    ],
  },
  {
    id: 'lot-c',
    name: 'Lot C',
    address: 'Anderson Academic Commons — 2150 E Evans Ave',
    spots: [
      { id: 'C1', number: 'C1', lot: 'Lot C', lotId: 'lot-c', status: 'taken', price: 5, distance: '0.3 mi', timeLimit: '2 hr',    vehicleSize: 'standard', row: 0, col: 0, reservedUntil: '3:15 PM' },
      { id: 'C2', number: 'C2', lot: 'Lot C', lotId: 'lot-c', status: 'open',  price: 5, distance: '0.3 mi', timeLimit: '2 hr',    vehicleSize: 'compact',  row: 0, col: 1 },
      { id: 'C3', number: 'C3', lot: 'Lot C', lotId: 'lot-c', status: 'open',  price: 5, distance: '0.3 mi', timeLimit: '2 hr',    vehicleSize: 'standard', row: 1, col: 0 },
      { id: 'C4', number: 'C4', lot: 'Lot C', lotId: 'lot-c', status: 'taken', price: 5, distance: '0.3 mi', timeLimit: 'All day', vehicleSize: 'large',    row: 1, col: 1, reservedUntil: '5:00 PM' },
    ],
  },
];

export const ALL_SPOTS: ParkingSpot[] = PARKING_LOTS.flatMap(lot => lot.spots);

export const MOCK_ALERTS = [
  { id: '1', title: 'Street Cleaning', message: 'No parking on Evans Ave, Tue & Thu 8–10 AM', date: 'Today', type: 'warning' as const },
  { id: '2', title: 'Permit Required', message: 'Lot A requires faculty permit after 5 PM weekdays', date: 'Jul 20', type: 'info' as const },
  { id: '3', title: 'Weekend Rules', message: 'All lots free Saturday & Sunday, no permit needed', date: 'Jul 19', type: 'success' as const },
  { id: '4', title: 'Event Parking', message: 'Lot B reserved for commencement, Sat Jul 26 9 AM–2 PM', date: 'Jul 18', type: 'warning' as const },
];

export const MOCK_SAVED = [
  { id: 's1', spotId: 'A3', spotNumber: 'A3', lot: 'Lot A', date: 'Jul 22, 2026', time: '9:00 AM – 5:00 PM', paid: true,  total: 5 },
  { id: 's2', spotId: 'B1', spotNumber: 'B1', lot: 'Lot B', date: 'Jul 24, 2026', time: '10:00 AM – 2:00 PM', paid: false, total: 5 },
];
