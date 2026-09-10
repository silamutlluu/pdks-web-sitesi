import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Department {
  id: string;
  name: string;
  manager?: string;
  employeeCount: number;
  expanded?: boolean;
  children?: Department[];
}

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];

  ngOnInit(): void {
    // Mock Tree Data
    this.departments = [
      {
        id: '1',
        name: 'Yönetim',
        manager: 'Ahmet Yılmaz',
        employeeCount: 3,
        expanded: true,
        children: [
          {
            id: '2',
            name: 'İnsan Kaynakları',
            manager: 'Ayşe Demir',
            employeeCount: 5
          },
          {
            id: '3',
            name: 'Bilgi Teknolojileri',
            manager: 'Can Öz',
            employeeCount: 12,
            expanded: true,
            children: [
              { id: '4', name: 'Yazılım', employeeCount: 8 },
              { id: '5', name: 'Altyapı & Ağ', employeeCount: 4 }
            ]
          }
        ]
      },
      {
        id: '6',
        name: 'Üretim',
        manager: 'Mehmet Kaya',
        employeeCount: 45
      }
    ];
  }

  toggleNode(dept: Department): void {
    if (dept.children && dept.children.length > 0) {
      dept.expanded = !dept.expanded;
    }
  }
}
