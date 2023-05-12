import {API_URL} from '@env';
import {hashObject} from '../utils/hash.utils';

export interface VisitCreateDto {
  visit_date: string;
  description: string;
  order_id?: string;
  customer_id: string;
  img_base64_data: string;
}

export interface VisitGetDto {
  id: string;
  visit_date: string;
  image_url: string;
  description: string;
  order_id: string;
  seller: {
    id: string;
    first_name: string;
    last_name: string;
    sales_commission: number;
    status: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    zone: string;
  };
  customer: {
    id: string;
    registered_name: string;
    first_name: string;
    last_name: string;
    financial_alert: boolean;
    seller_id: string;
    phone: string;
    email: string;
    address: {
      id: string;
      address: string;
      postal_code: string;
      city: string;
      country: string;
      zone: string;
    };
    identification: {
      id: string;
      number: string;
      type: string;
    };
  };
}

export class VisitsProvider {
  public static getVisitsFromSeller = (token: string) => {
    return fetch(`${API_URL}visits`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  public static createVisit = (visit: VisitCreateDto, token: string) => {
    const objectWithHash = hashObject(visit);
    return fetch(`${API_URL}visits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(objectWithHash),
    });
  };
}
