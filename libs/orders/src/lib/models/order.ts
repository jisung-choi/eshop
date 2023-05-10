import { OrderItem } from "@eshop/orders";
import { User } from "@eshop/users";

export class Order {
    id?: string;
    orderItems?: OrderItem;
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: number;
    totalPrice?: string;
    user?: User;
    dateOrdered?: string;
}