import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Employee } from '../../core/models/employee.model';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  isLoading = true;
  searchTerm = '';

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.apiService.getEmployees().subscribe({
      next: (res) => {
        if (res.success) {
          this.employees = res.data;
          this.filteredEmployees = res.data;
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  filterEmployees(): void {
    if (!this.searchTerm) {
      this.filteredEmployees = this.employees;
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp => 
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term) ||
      emp.registrationNumber.includes(term) ||
      emp.departmentName?.toLowerCase().includes(term)
    );
  }

  deleteEmployee(id: string): void {
    if (confirm('Bu personeli silmek istediğinize emin misiniz?')) {
      // API call to delete
      this.employees = this.employees.filter(e => e.id !== id);
      this.filterEmployees();
    }
  }
}
