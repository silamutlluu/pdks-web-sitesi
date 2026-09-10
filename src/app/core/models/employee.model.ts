export interface Department {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  registrationNumber: string; // Sicil No
  departmentId: string;
  departmentName?: string;
  status: 'Active' | 'Inactive';
  cardNo?: string;
  hasBiometric: boolean;
}
