import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/shared/models/order.model';
import { CreateOrderComponent } from '../create-order/create-order.component';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderReq } from 'src/app/shared/models/orderReq.model';
import { MessagesService } from '../../../shared/services/messages.service';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {

  orders: Order[];
  order: Order;
  dataSource: MatTableDataSource<Order>;
  showColumns = ['id', 'name', 'price', 'actions'];

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    this.listAll();
  }

  filter(texto: string): void {
    this.dataSource.filter = texto.trim().toLowerCase();
  }

  listAll() {
    this.orderService.listAll().subscribe(data => {
      const list = this.filtrarPorStatus(data)
        this.dataSource = new MatTableDataSource(list);
      });
  }

  add(): void {
    const dialogRef = this.dialog.open(CreateOrderComponent, {
      minWidth: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
      }
    });
  }

  edit(obj: Order): void {
    const dialogRef = this.dialog.open(CreateOrderComponent, {
      minWidth: '450px',
      data: {
        data: obj,
      }
    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          const indiceAEditar = this.dataSource.data.findIndex(obj => obj.id === res.id);
          this.dataSource.data[indiceAEditar] = res
          this.dataSource = new MatTableDataSource(this.dataSource.data);
        }
      }
    );
  }

  remove(obj: Order): void {
    this.orderService.remove(obj.id).subscribe(
      res => {
        const indiceARemover = this.dataSource.data.findIndex(Order => Order.id === obj.id);
        if (indiceARemover > -1) {
          this.dataSource.data.splice(indiceARemover, 1);
          this.dataSource = new MatTableDataSource<Order>(this.dataSource.data);
        }
      }
    );
  }

  filtrarPorStatus(orders: Order[]): Order[] {
    const list = orders.filter(o => o.status === 'NEW' || o.status === "CLOSED")
    return list;
  }

  detalhar(obj: Order): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      minWidth: '800px',
      data: {
        data: obj,
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        const indiceAEditar = this.dataSource.data.findIndex(obj => obj.id === res.id);
        this.dataSource.data[indiceAEditar] = res
        this.dataSource = new MatTableDataSource(this.filtrarPorStatus(this.dataSource.data));
      }

      }
    );
  }

  cancelar(obj: Order): void {
    const orderReq = new OrderReq();
    orderReq.id = obj.id;
    orderReq.status = 1;
    this.orderService.updateStatus(orderReq).subscribe(res => {
      this.messageService.pedidoCancelado("Pedido cancelado!");
      const indiceAEditar = this.dataSource.data.findIndex(obj => obj.id === res.id);
      this.dataSource.data[indiceAEditar] = res
      this.dataSource = new MatTableDataSource(this.filtrarPorStatus(this.dataSource.data));
    });
  }

  fecharPedido(obj: Order): void {
    const orderReq = new OrderReq();
    orderReq.id = obj.id;
    orderReq.status = 2;
    this.orderService.updateStatus(orderReq).subscribe(res => {
      this.messageService.pedidoFechado("Pedido fechado, não pode mais incluir itens.");
      const indiceAEditar = this.dataSource.data.findIndex(obj => obj.id === res.id);
      this.dataSource.data[indiceAEditar] = res
      this.dataSource = new MatTableDataSource(this.filtrarPorStatus(this.dataSource.data));
    });
  }

  fecharConta(obj: Order): void {
    const orderReq = new OrderReq();
    orderReq.id = obj.id;
    orderReq.status = 3;
    this.orderService.updateStatus(orderReq).subscribe(res => {
      this.messageService.pedidoConcluido("Conta fechada. Total: R$ " + res.total.toFixed(2));
      const indiceAEditar = this.dataSource.data.findIndex(obj => obj.id === res.id);
      this.dataSource.data[indiceAEditar] = res
      this.dataSource = new MatTableDataSource(this.filtrarPorStatus(this.dataSource.data));
    });
  }

}
