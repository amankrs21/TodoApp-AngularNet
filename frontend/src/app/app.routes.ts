import { Routes } from '@angular/router';
import { TodosComponent } from './Components/Todo/todos/todos.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './Services/auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'todo', component: TodosComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
    { path: '**', component: PagenotfoundComponent }
];
