import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GlobalService } from '../../../shared/services/global.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
import { environment } from '../../../../../../environments/environment';

interface Student {
  id: number;
  name: string;
  class: string;
  rollNo: string;
  email: string;
}

@Component({
  selector: 'app-students-listing',
  templateUrl: './students-listing.component.html',
  styleUrls: ['./students-listing.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class StudentsListingComponent implements OnInit {
  students: Student[] = [];
  displayModal: boolean = false;
  isEditMode: boolean = false;
  studentForm!: FormGroup;
  selectedStudent: Student = { id: 0, name: '', class: '', email: '', rollNo: '' };

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private globalService: GlobalService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.httpService.get(environment.backend.baseURL + 'student')
      .then((res: Student[]) => {
        console.log(res);
        this.students = res
      }).catch((err) => {
        console.log(err);
        this.globalService.showToast("error", "Error", "Failed to load students")
      });
  }

  initForm(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Email with required and email format validation
      rollNo: ['', [Validators.required]] // Roll number between 5 and 100
    });
  }
  
  openAddModal(): void {
    this.isEditMode = false;
    this.selectedStudent = { id: 0, name: '', class: '', email: '', rollNo: '' };
    this.studentForm.reset(this.selectedStudent);
    this.displayModal = true;
  }

  openEditModal(student: Student): void {
    this.isEditMode = true;
    this.selectedStudent = { ...student };
    this.studentForm.patchValue(this.selectedStudent);
    this.displayModal = true;
  }

  saveStudent(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      this.globalService.showToast("error", "Error", "Please correct the errors");
      return;
    }

    const formValue = this.studentForm.value;

    if (this.isEditMode) {
      this.httpService.put(environment.backend.baseURL + 'student/' + this.selectedStudent.id, formValue).then(() => {
        const index = this.students.findIndex(s => s.id === this.selectedStudent.id);
        formValue.id = this.selectedStudent.id;
        if (index !== -1) this.students[index] = formValue;
        this.globalService.showToast("success", "Success", "Student updated successfully");
        this.displayModal = false;
      }).catch((err) => {
        this.globalService.showToast("error", "Error", "Failed to update student")
      })
    } else {
      console.log(formValue);
      this.httpService.post(environment.backend.baseURL + 'student', formValue).then((newStudent: Student) => {
        this.students.push(newStudent);
        this.globalService.showToast("success", "Success", "Student added successfully");
        this.displayModal = false;
      }).catch((err) => {
        console.log(err);
        this.globalService.showToast("error", "Error", "Failed to add student")
      })
    }
    this.displayModal = false;
  }

  confirmDelete(student: Student): void {
    this.globalService.confirm(
      `Are you sure you want to delete ${student.name}?`,
      'Delete Confirmation',
    ).then(() => {
      this.deleteStudent(student.id);
    });
  }

  deleteStudent(id: number): void {
    this.httpService.delete(environment.backend.baseURL + 'student/' + id).then((res) => {
      console.log(res);
      this.students = this.students.filter(s => s.id !== id);
      this.globalService.showToast("success", "Success", "Student deleted successfully");
    }).catch((err) => {
      console.log(err);
      this.globalService.showToast("error", "Error", "Failed to delete student");
    })
  }

  get f() {
    return this.studentForm.controls;
  }

}