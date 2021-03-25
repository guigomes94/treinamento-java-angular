import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { HeaderComponent } from './components/template/header/header.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './views/home/home.component';
import { ListOrdersComponent } from './views/orders/list-orders/list-orders.component';
import { CreateOrderComponent } from './views/orders/create-order/create-order.component';
import { AddItemComponent } from './views/orders/add-item/add-item.component';
import { ListUsersComponent } from './views/users/list-users/list-users.component';
import { CreateUserComponent } from './views/users/create-user/create-user.component';
import { ListItemsComponent } from './views/items/list-items/list-items.component';
import { CreateItemComponent } from './views/items/create-item/create-item.component';
import { MoneyFormatPipe } from './shared/pipes/money-format.pipe';
import { InterceptorModule } from './interceptor/interceptor.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    HomeComponent,
    ListOrdersComponent,
    CreateOrderComponent,
    AddItemComponent,
    ListUsersComponent,
    CreateUserComponent,
    ListItemsComponent,
    CreateItemComponent,
    MoneyFormatPipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    MatTableModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      preventDuplicates: true
    }),
    InterceptorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
