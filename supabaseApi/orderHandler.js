import toast from "react-hot-toast";
import { supabase } from "../lib/supabase-client";

export async function createOrderInstance(orderItem) {
  const { data, error } = await supabase.from("orders").insert({
    userId: orderItem.userId,
    orderId: orderItem.orderId,
    totalAmount: orderItem.totalAmount,
    products: orderItem.products,
    deliveryDetails: orderItem.deliveryDetails,
    status: orderItem.status,
    paymentMode: orderItem.paymentMode,
  });

  if (error) toast.error(error.message);
  toast.success(`Order Placed Sucessfully`);
}

export async function getUserOrders(userId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("userId", userId);

  if (error) toast.error(error.message);
  return data;
}

export async function getUserOrderById(userId, orderId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("userId", userId)
    .eq("id", orderId)
    .single();

  if (error) toast.error(error);
  return data;
}
