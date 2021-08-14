import { Component, OnInit, Inject } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {
  myForm: FormGroup;
  constructor(public customer: ItemsService, private dialogRef: MatDialogRef<FormEditComponent>, @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
  }


  onSaveForm() {
    if (this.customer.selected.id == null) {
      let newItem = {
        name: this.customer.selected.name,
        amount: this.customer.selected.amount,
        price: this.customer.selected.price,
      }
      this.customer.add(newItem);
    } else {
      this.customer.editItems(this.customer.selected);
    }
    this.close();
  }
  close(): void {
    this.dialogRef.close();
  }
}
