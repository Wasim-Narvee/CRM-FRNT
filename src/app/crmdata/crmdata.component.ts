import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';
import { CrmService, Customer } from '../crm.service';

@Component({
  selector: 'app-crmdata',
  templateUrl: './crmdata.component.html',
  styleUrls: ['./crmdata.component.scss']
})
export class CrmComponent implements OnInit {
  
  // Updated column names matching backend entity
  displayedColumns: string[] = [
    'name',
    'email',
    'phoneNo',
    'websiteUrl',
    'country',
    'address',
    'actions'
  ];

  dataSource = new MatTableDataSource<Customer>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private crmService: CrmService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  /** Load data from API */
loadCustomers() {
  this.crmService.getCustomers().subscribe({
    next: (response: any) => {
      console.log("API RESPONSE:", response); // (optional debug)
      this.dataSource.data = response.data;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error: (err) => {
      console.error('Error loading Company:', err);
      this.snackBar.open('Failed to load Company', 'Close', { duration: 2000 });
    }
  });
}

  /** Search filter */
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  /** Add new customer */
  openAddDialog() {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, { width: '450px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crmService.createCustomer(result).subscribe(() => {
          this.snackBar.open('Company added successfully!', 'Close', { duration: 2000 });
          this.loadCustomers();
        });
      }
    });
  }

  /** Edit customer */
  editCustomer(customer: Customer) {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '450px',
      data: { ...customer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && customer.id) {
        this.crmService.updateCustomer(customer.id, result).subscribe(() => {
          this.snackBar.open('Company updated successfully!', 'Close', { duration: 2000 });
          this.loadCustomers();
        });
      }
    });
  }

  /** Delete customer */
 deleteCustomer(id: number) {
  this.crmService.deleteCustomer(id).subscribe(() => {
    this.snackBar.open('Company deleted', 'Close', { duration: 2000 });
    this.loadCustomers();
  });
}


  }

