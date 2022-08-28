import toast from "react-hot-toast";
import sortBy from "sort-by";
import { createOrderInstance } from "../supabaseApi/orderHandler";

export function discountPrice(originalPrice, dicount) {
  const price = originalPrice - (originalPrice * dicount) / 100;
  return price.toFixed(1);
}

export function handleSort(option, products) {
  var sortProduct;
  if (option === "A-Z") {
    sortProduct = products?.data.sort(sortBy("name"));
    return sortProduct;
  }
  if (option === "Z-A") {
    sortProduct = products?.data.sort(sortBy("-name"));
    return sortProduct;
  }
  if (option === "PRICE↑") {
    sortProduct = products?.data.sort(sortBy("-price"));
    return sortProduct;
  }
  if (option === "PRICE↓") {
    sortProduct = products?.data.sort(sortBy("price"));
    return sortProduct;
  }
}
