
import { PostOffice } from '../types';
import { SAMPLE_DATA } from '../constants';

export const searchPostOffices = (query: string): PostOffice[] => {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return SAMPLE_DATA.filter(po => 
    po.pincode.includes(normalizedQuery) ||
    po.name.toLowerCase().includes(normalizedQuery) ||
    po.district.toLowerCase().includes(normalizedQuery) ||
    po.state.toLowerCase().includes(normalizedQuery) ||
    po.taluk.toLowerCase().includes(normalizedQuery)
  );
};

export const getByState = (state: string): PostOffice[] => {
  return SAMPLE_DATA.filter(po => po.state === state);
};

export const getDistrictsByState = (state: string): string[] => {
  const offices = getByState(state);
  return Array.from(new Set(offices.map(po => po.district))).sort();
};

export const getByDistrict = (state: string, district: string): PostOffice[] => {
  return SAMPLE_DATA.filter(po => po.state === state && po.district === district);
};
