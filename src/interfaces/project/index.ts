import { BookingInterface } from 'interfaces/booking';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  name: string;
  description?: string;
  status: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  company?: CompanyInterface;
  _count?: {
    booking?: number;
  };
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  company_id?: string;
}
