import { FreelancerInterface } from 'interfaces/freelancer';
import { ProjectInterface } from 'interfaces/project';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  start_date: any;
  end_date: any;
  status: string;
  freelancer_id?: string;
  project_id?: string;
  created_at?: any;
  updated_at?: any;

  freelancer?: FreelancerInterface;
  project?: ProjectInterface;
  _count?: {};
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  freelancer_id?: string;
  project_id?: string;
}
