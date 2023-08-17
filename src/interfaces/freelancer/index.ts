import { BookingInterface } from 'interfaces/booking';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FreelancerInterface {
  id?: string;
  skills: string;
  experience: string;
  availability: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  user?: UserInterface;
  _count?: {
    booking?: number;
  };
}

export interface FreelancerGetQueryInterface extends GetQueryInterface {
  id?: string;
  skills?: string;
  experience?: string;
  availability?: string;
  user_id?: string;
}
