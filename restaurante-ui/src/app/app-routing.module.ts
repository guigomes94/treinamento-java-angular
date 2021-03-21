import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ListOrdersComponent } from './views/orders/list-orders/list-orders.component';
import { ListUsersComponent } from './views/users/list-users/list-users.component';
import { ListItemsComponent } from './views/items/list-items/list-items.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "orders",
    component: ListOrdersComponent
  },
  {
    path: "users",
    component: ListUsersComponent
  },
  {
    path: "items",
    component: ListItemsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
