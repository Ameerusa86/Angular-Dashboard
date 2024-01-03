import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { UsersComponent } from './pages/users/users.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'category',
    title: 'Category Page',
    component: CategoriesPageComponent,
  },
  { path: 'new-project', component: NewProjectComponent },
  { path: 'users', component: UsersComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'projects', component: ProjectPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];
