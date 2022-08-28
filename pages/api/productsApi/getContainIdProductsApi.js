import { getProductsByContainsId } from "../../../supabaseApi/getProductHandler";

export default async function handler(req, res) {
  const user = {
    name: "ved pratap",
    email: "vedna400@gmail.com",
    phone_no: 6203703070,
    address: {
      pincode: 802301,
      city: "Arrah",
      state: "Bihar",
      home_address: "Majhwan bandh",
    },
    orderItems: [
      {
        id: "abcdefgh",
        date: "24/08/22",
        products_id: [2, 3],
        payment_mode: "razorpay",
        total_price: 5000,
        isDelivered: false,
      },
      {
        id: "dgsffdfhdfgs89ss",
        date: "25/08/22",
        products_id: [5],
        payment_mode: "razorpay",
        total_price: 12000,
        isDelivered: false,
      },
    ],
  };
  var orders = [];
  var productsId = [];
  user.orderItems.map((item) => orders.push(item));
  orders.map((order) => {
    order.products_id.map((id) => productsId.push(id));
  });

  const data = await getProductsByContainsId(productsId);

  res.json({ data });
}
