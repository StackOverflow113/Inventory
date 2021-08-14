import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsService } from 'src/app/services/items.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormEditComponent } from '../form-edit/form-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageConfirmComponent } from '../message-confirm/message-confirm.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'amount', 'price', 'actions', 'new'];
  dataSource = new MatTableDataSource();
  //PAGINATOR
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customerService: ItemsService, private dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.customerService.getAllItems().subscribe(res => this.dataSource.data = res);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //METODO EDIT
  onEdit(element) {
    this.reset();
    this.openDialog();
    if (element) {
      this.customerService.selected = element;
    }

  }
  //METODO DELETE
  onDelete(id: any) {
    //this.customerService.deleteItem(id);
    const dialogRef = this.dialog.open(MessageConfirmComponent, {
      width: '350px',
      data: { mensaje: 'are you sure to delete this item?' }
    }); dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {
        this.customerService.deleteItem(id);
        this.customerService.getAllItems();
        this.snackBar.open('Item deleted successfully', '', {
          duration: 3000
        })
      }
    });
  }

  openDialog(): void {
    const dialogConf = new MatDialogConfig();
    dialogConf.data = {
      title: 'modal'
    };
    dialogConf.autoFocus = true;
    this.dialog.open(FormEditComponent, dialogConf)
  }

  reset(): void {
    this.customerService.selected.name = '';
    this.customerService.selected.amount = 0;
    this.customerService.selected.price = 0;
    this.customerService.selected.id = null;
  }

}
