import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/modules/todo/common/models/category.model';
import { EditItem } from 'src/app/modules/todo/common/models/edit-item.model';
import { Folder } from 'src/app/modules/todo/common/models/folder.model';
import { Todo } from 'src/app/modules/todo/common/models/todo.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss'
})
export class EditFormComponent implements OnInit {
  @Input() public modalType?: string;
  @Input() public todoForEdit?: Todo;
  @Input() public folderForEdit?: Folder;
  @Input() public categoryForEdit?: Category;

  @Output() editItem = new EventEmitter<EditItem>();

  public editNameForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required })
  })

  constructor() { }

  ngOnInit(): void {
    this.setDefaultValues();
  }

  private setDefaultValues() {
    if (this.todoForEdit) {
      this.editNameForm.controls.name.patchValue(this.todoForEdit!.name);
    } else if (this.folderForEdit) {
      this.editNameForm.controls.name.patchValue(this.folderForEdit!.name);
    } else if (this.categoryForEdit) {
      this.editNameForm.controls.name.patchValue(this.categoryForEdit!.name);
    }
  }

  public onSubmit(): void {
    if (this.editNameForm.valid) {
      switch (this.modalType) {
        case 'todoEdit':
          return this.editTodo();
        case 'folderEdit':
          return this.editFolder();
        case 'categoryEdit':
          return this.editCategory();
      }
    }
  }

  private editTodo() {
    if (this.editNameForm.valid) {
      this.editItem.emit({
        type: this.modalType!,
        todo: {
          ...this.todoForEdit!,
          name: this.editNameForm.controls.name.value
        }
      })
    }
  }

  private editFolder() {
    if (this.folderForEdit && this.editNameForm.valid) {
      this.editItem.emit({
        type: this.modalType!,
        folder: {
          ...this.folderForEdit,
          name: this.editNameForm.controls.name.value
        }
      })
    }
  }

  private editCategory() {
    if (this.editNameForm.valid) {
      this.editItem.emit({
        type: this.modalType!,
        category: {
          ...this.categoryForEdit!,
          name: this.editNameForm.controls.name.value
        }
      })
    }
  }
}
