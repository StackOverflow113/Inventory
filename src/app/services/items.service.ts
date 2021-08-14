import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerI } from '../models/items';

export interface CustomerID extends CustomerI { id: string; }

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  //PROPIEDADES
  private itemsCollection: AngularFirestoreCollection<CustomerI>;
  customers: Observable<CustomerID[]>;
  public selected = {
    id: null,
    name: '',
    amount: 0,
    price: 0,
  };


  constructor(private readonly afs: AngularFirestore) {
    //<======================= CONSULTA A LA BASE DE DATOS TODA LA INFORMACION ALMACENADA EN LA COLLECION "INVENTORY"
    this.itemsCollection = afs.collection<CustomerI>('inventory ')
    this.customers = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CustomerI;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ) // ============================> 
  }

  //<--======= TRAE TODA LA INFORMACION DE LA BASE DE DATOS Y LA MUESTRA EN LA TABLA=========---->
  getAllItems() {
    return this.customers;
  }

  //<================= EDITAR ========================>
  editItems(customer: CustomerID) {
    console.log(customer)
    return this.itemsCollection.doc(customer.id).update(customer);
  }
  //<============== DELETE =======>
  deleteItem(id: string) {
    return this.itemsCollection.doc(id).delete();
  }
  //ADD
  add(customer: CustomerI) {
    return this.itemsCollection.add(customer)
  }

}
