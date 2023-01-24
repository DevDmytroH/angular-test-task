import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IPopupData } from './interface/popup-data.interface';

@Component({
  selector: 'app-popup-todo-update',
  templateUrl: './popup-todo-update.component.html',
  styleUrls: ['./popup-todo-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupTodoUpdateComponent implements OnInit {

  public updateForm!: FormGroup;
  public popupTitle!: string;
  public isUpdateMode!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPopupData,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<PopupTodoUpdateComponent>
  ) { }

  public ngOnInit(): void {
    this._definePopupMode();
    this._initForm();
    this._setDefaultContainerClass();
    this._definePopupTitle();
  }

  public close(): void {
    this._dialogRef.close();
  }

  public onSubmit(): void {
    if (this.updateForm.invalid) return;

    if (this.data.type === 'update') {
      this._dialogRef.close({
        ...this.data.todo,
        ...this.updateForm.value
      });
    } else {
      this._dialogRef.close({
        ...this.updateForm.value
      });
    }
  }

  private _initForm(): void {
    const { label, description, category } = this.data?.todo;

    this.updateForm = this._fb.group({
      label: [label || '', Validators.required],
      description: [description || '', Validators.required],
      category: [category || '', Validators.required]
    });
  }

  private _definePopupTitle(): void {
    this.popupTitle = `${this.isUpdateMode ? 'Update task information' : 'Create new task'}`;
  }

  private _definePopupMode(): void {
    this.isUpdateMode = this.data && this.data.type === 'update';
  }

  private _setDefaultContainerClass(): void {
    this._dialogRef.addPanelClass('default-modal-container');
  }
}
