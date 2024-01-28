import { Routes } from '@angular/router';
import { TodosComponent } from './Components/Todo/todos/todos.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './Components/login/login.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'todo', component: TodosComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', component: PagenotfoundComponent }
];
