
import { PostOffice } from './types';

export interface StateMetadata {
  name: string;
  image: string;
}

export const INDIAN_STATES_META: StateMetadata[] = [
  { name: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&q=80&w=400" },
  { name: "Arunachal Pradesh", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=400" },
  { name: "Assam", image: "https://images.unsplash.com/photo-1620050601221-399081e74f07?auto=format&fit=crop&q=80&w=400" },
  { name: "Bihar", image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=400" },
  { name: "Chhattisgarh", image: "https://images.unsplash.com/photo-1627845244561-125026e6447a?auto=format&fit=crop&q=80&w=400" },
  { name: "Goa", image: "https://images.unsplash.com/photo-1512757776214-26d36777b513?auto=format&fit=crop&q=80&w=400" },
  { name: "Gujarat", image: "https://images.unsplash.com/photo-1569330112479-67c18fd822e4?auto=format&fit=crop&q=80&w=400" },
  { name: "Haryana", image: "https://images.unsplash.com/photo-1616423019142-3e3e11049755?auto=format&fit=crop&q=80&w=400" },
  { name: "Himachal Pradesh", image: "https://images.unsplash.com/photo-1597430304153-2776f8e7529f?auto=format&fit=crop&q=80&w=400" },
  { name: "Jharkhand", image: "https://images.unsplash.com/photo-1629191077207-619f7112003c?auto=format&fit=crop&q=80&w=400" },
  { name: "Karnataka", image: "https://images.unsplash.com/photo-1600100397561-432d56a2373c?auto=format&fit=crop&q=80&w=400" },
  { name: "Kerala", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=400" },
  { name: "Madhya Pradesh", image: "https://images.unsplash.com/photo-1621344440385-618d4512411b?auto=format&fit=crop&q=80&w=400" },
  { name: "Maharashtra", image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=400" },
  { name: "Manipur", image: "https://images.unsplash.com/photo-1614092470764-a63445e054b8?auto=format&fit=crop&q=80&w=400" },
  { name: "Meghalaya", image: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&q=80&w=400" },
  { name: "Mizoram", image: "https://images.unsplash.com/photo-1628100511871-3444a7732a1e?auto=format&fit=crop&q=80&w=400" },
  { name: "Nagaland", image: "https://images.unsplash.com/photo-1611082570043-fba40e021d0a?auto=format&fit=crop&q=80&w=400" },
  { name: "Odisha", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=400" },
  { name: "Punjab", image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=400" },
  { name: "Rajasthan", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=400" },
  { name: "Sikkim", image: "https://images.unsplash.com/photo-1589793907316-f94025b46850?auto=format&fit=crop&q=80&w=400" },
  { name: "Tamil Nadu", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=400" },
  { name: "Telangana", image: "https://images.unsplash.com/photo-1618243044195-23f03b2241b7?auto=format&fit=crop&q=80&w=400" },
  { name: "Tripura", image: "https://images.unsplash.com/photo-1595821764653-52906a5b67e7?auto=format&fit=crop&q=80&w=400" },
  { name: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1564507592333-c60657eaa0ae?auto=format&fit=crop&q=80&w=400" },
  { name: "Uttarakhand", image: "https://images.unsplash.com/photo-1584282827196-1934969242d5?auto=format&fit=crop&q=80&w=400" },
  { name: "West Bengal", image: "https://images.unsplash.com/photo-1558431382-d799d1dc9ced?auto=format&fit=crop&q=80&w=400" },
  { name: "Andaman and Nicobar Islands", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=400" },
  { name: "Chandigarh", image: "https://images.unsplash.com/photo-1611000570881-30948956cc46?auto=format&fit=crop&q=80&w=400" },
  { name: "Dadra and Nagar Haveli and Daman and Diu", image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&q=80&w=400" },
  { name: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=400" },
  { name: "Jammu and Kashmir", image: "https://images.unsplash.com/photo-1562011688-667362846996?auto=format&fit=crop&q=80&w=400" },
  { name: "Ladakh", image: "https://images.unsplash.com/photo-1566976790209-3f266b7d519d?auto=format&fit=crop&q=80&w=400" },
  { name: "Lakshadweep", image: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=400" },
  { name: "Puducherry", image: "https://images.unsplash.com/photo-1589793463308-658ed4225283?auto=format&fit=crop&q=80&w=400" }
];

export const INDIAN_STATES = INDIAN_STATES_META.map(s => s.name);

// Sample data - In a real app, this would be fetched from a CSV/API or loaded into IndexedDB
export const SAMPLE_DATA: PostOffice[] = [
  {
    id: "1",
    name: "Anna Nagar",
    pincode: "600040",
    officeType: "SO",
    deliveryStatus: "Delivery",
    division: "Chennai North",
    region: "Chennai Region",
    circle: "Tamilnadu",
    taluk: "Egmore-Nungambakkam",
    district: "Chennai",
    state: "Tamil Nadu"
  },
  {
    id: "2",
    name: "Connaught Place",
    pincode: "110001",
    officeType: "HO",
    deliveryStatus: "Delivery",
    division: "New Delhi Central",
    region: "Delhi",
    circle: "Delhi",
    taluk: "New Delhi",
    district: "New Delhi",
    state: "Delhi"
  },
  {
    id: "3",
    name: "Bandra West",
    pincode: "400050",
    officeType: "SO",
    deliveryStatus: "Delivery",
    division: "Mumbai North West",
    region: "Mumbai",
    circle: "Maharashtra",
    taluk: "Mumbai",
    district: "Mumbai",
    state: "Maharashtra"
  },
  {
    id: "4",
    name: "Electronic City",
    pincode: "560100",
    officeType: "SO",
    deliveryStatus: "Delivery",
    division: "Bangalore South",
    region: "Bangalore",
    circle: "Karnataka",
    taluk: "Anekal",
    district: "Bangalore",
    state: "Karnataka"
  },
  {
    id: "5",
    name: "Salt Lake",
    pincode: "700064",
    officeType: "SO",
    deliveryStatus: "Delivery",
    division: "North Kolkata",
    region: "Kolkata",
    circle: "West Bengal",
    taluk: "Bidhannagar",
    district: "North 24 Parganas",
    state: "West Bengal"
  }
];
