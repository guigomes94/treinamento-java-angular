import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private toastr: ToastrService
  ) { }

  success(msg: string): void {
    this.toastr.success(msg)
  }

  pedidoCancelado(msg: string): void {
    this.toastr.warning(msg)
  }

  pedidoFechado(msg: string): void {
    this.toastr.info(msg)
  }

  pedidoConcluido(msg: string): void {
    this.toastr.success(msg, 'Obrigado! Volte Sempre!')
  }

  error(msg: string): void {
    this.toastr.error(msg, 'ERROR!')
  }
}
