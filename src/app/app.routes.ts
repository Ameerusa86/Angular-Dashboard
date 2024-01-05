import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { UsersComponent } from './pages/users/users.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'category',
    title: 'Category Page',
    component: CategoriesPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-project',
    component: NewProjectComponent,
    title: 'New Project',
    canActivate: [AuthGuard],
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  {
    path: 'projects',
    component: ProjectPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];
