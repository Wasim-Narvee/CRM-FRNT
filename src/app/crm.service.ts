import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customer {
  id: number;
  name: string;
  email: string;
  address: string;
  country: string;
  phoneNo: number;
  websiteUrl: string;
}


@Injectable({
  providedIn: 'root'
})
export class CrmService {

  private baseUrl = 'http://localhost:7689/api/companies';

  constructor(private http: HttpClient) {}

  /** GET all customers */
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/getAll`);
  }

  /** GET single customer by ID */
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  /** CREATE customer */
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/save`, customer);
  }

  /** UPDATE customer */
  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/${id}`, customer);
  }

  /** DELETE customer */
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
