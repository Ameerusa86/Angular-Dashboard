import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projectsCount: number = 0;
  projectsCountByCategory: any[] = [];
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toaster: ToastrService,
    private router: Router
  ) {}

  async uploadFile(
    file: File,
    projectData: Project,
    formStatus: string,
    id: string
  ) {
    try {
      const storageRef = this.storage.ref('projects_images/' + file.name);
      const task = storageRef.put(file);
      await task;
      const downloadURL = storageRef.getDownloadURL().subscribe((url) => {
        projectData.imageUrl = url;

        if (formStatus == 'Edit') {
          this.updateData(id, projectData);
        } else {
          this.afs
            .collection('projects')
            .add(projectData)
            .then((docRef) => {
              this.toaster.success('Project Uploaded Successfully');
              this.router.navigate(['/projects']);
            });
        }
      });

      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  loadData() {
    return this.afs
      .collection('projects')
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

  loadOneData(id: string) {
    return this.afs.collection('projects').doc(id).valueChanges();
  }

  async updateData(id: string, projectData: Project) {
    return this.afs
      .collection('projects')
      .doc(id)
      .update(projectData)
      .then(() => {
        this.toaster.success('Project Updated Successfully');
        this.router.navigate(['/projects']);
      });
  }
  async deleteData(id: string, imageUrl: string | undefined) {
    try {
      // Delete data from Firestore
      await this.afs.collection('projects').doc(id).delete();

      // Delete image from Firebase Storage if imageUrl is defined
      if (imageUrl) {
        const storageRef = this.storage.refFromURL(imageUrl);
        await storageRef.delete();
      }

      this.toaster.success('Project Deleted Successfully');
      this.router.navigate(['/projects']);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
  // load number of projects by category for each category

  getCategoryCounts(): Observable<{ [key: string]: number }> {
    return this.afs
      .collection('projects')
      .valueChanges()
      .pipe(
        map((projects: any[]) => {
          const typedProjects = projects as Project[];
          const counts: { [key: string]: number } = {};
          typedProjects.forEach((project: Project) => {
            const category = project.category.category.trim();
            if (category in counts) {
              counts[category]++;
            } else {
              counts[category] = 1;
            }
          });
          return counts;
        })
      );
  }

  // Load recently added projects
  getRecentProjects() {
    return this.afs
      .collection('projects', (ref) => ref.orderBy('createdAt', 'desc'))
      .valueChanges();
  }
}
