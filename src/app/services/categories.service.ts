import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  id = '';

  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  saveData(data: any) {
    this.afs
      .collection('categories')
      .add(data)
      .then((docRef: any) => {
        this.toastr.success('Category added successfully');
      })
      .catch((error: any) => {
        this.toastr.error("Category couldn't be added");
      });
  }
  loadData() {
    return this.afs
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions: any[]) =>
          actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  updateData(id: any, editedData: any) {
    this.afs
      .collection('categories')
      .doc(id)
      .update(editedData)
      .then(() => {
        this.toastr.success('Category updated successfully');
      })
      .catch((error: any) => {
        this.toastr.error("Category couldn't be updated");
      });
  }
  deleteData(id: any) {
    this.afs
      .collection('categories')
      .doc(id)
      .delete()
      .then(() => {
        this.toastr.success('Category deleted successfully');
      })
      .catch((error: any) => {
        this.toastr.error("Category couldn't be deleted");
      });
  }
}
