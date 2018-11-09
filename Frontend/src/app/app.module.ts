import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { BookComponent } from './book/book.component';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ColumncomponentComponent } from './columncomponent/columncomponent.component';

const appRoutes: Routes = [
  {
    path: 'books',
    component: BookComponent,
    data: { title: 'Book List' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up' }
  },
  { path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    BookComponent,
    HomeComponent,
    ColumncomponentComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  //~~AppRoutingModule,
  RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <-- debugging purposes only
  )
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
