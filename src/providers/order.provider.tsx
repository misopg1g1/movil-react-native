import {API_URL} from '@env';
import {hashObject} from '../utils/hash.utils';

export interface GetOrderDTO {
  id: string;
  grand_total: number;
  discount: number;
  delivery_date: string;
  visit_id: string;
  status: string;
  items: Item[];
  seller: Seller;
  customer: Customer;
}

export interface Customer {
  id: string;
  registered_name: string;
  first_name: string;
  last_name: string;
  financial_alert: boolean;
  seller_id: string;
  phone: string;
  email: string;
  address: Address;
  identification: Identification;
}

export interface Address {
  id: string;
  address: string;
  postal_code: string;
  city: string;
  country: string;
  zone: string;
}

export interface Identification {
  id: string;
  number: string;
  type: string;
}

export interface Item {
  id?: string;
  product_id: string;
  quantity: number;
  product_name?: string;
}

export interface Seller {
  id: string;
  first_name: string;
  last_name: string;
  sales_commission: number;
  status: boolean;
  created_at: Date;
  updated_at: null;
  deleted_at: null;
  zone: null;
}

export interface CreateOrderDTO {
  visit_id: string;
  delivery_date?: string;
  grand_total?: number;
  discount?: number;
  items: Item[];
}

export class OrdersProvider {
  public static getOrdersFromSeller = (token: string) => {
    return fetch(`${API_URL}orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  public static createOrder = (order: CreateOrderDTO, token: string) => {
    const objectWithHash = hashObject(order);
    return fetch(`${API_URL}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(objectWithHash),
    });
  };
}
