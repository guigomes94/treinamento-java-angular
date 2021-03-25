import { Item } from "./item.model";

export class Order {
  id: number;
  tableNumber: number;
  status: string;
  items: Array<Item>
  total: number;
}
