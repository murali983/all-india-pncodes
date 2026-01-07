
export interface PostOffice {
  id: string;
  name: string;
  pincode: string;
  officeType: 'HO' | 'SO' | 'BO';
  deliveryStatus: 'Delivery' | 'Non-Delivery';
  division: string;
  region: string;
  circle: string;
  taluk: string;
  district: string;
  state: string;
  telephone?: string;
}

export type ViewState = 'home' | 'details' | 'browse-state' | 'browse-district' | 'about' | 'contact' | 'privacy';

export interface AppState {
  currentView: ViewState;
  selectedPostOffice?: PostOffice;
  selectedState?: string;
  selectedDistrict?: string;
}
