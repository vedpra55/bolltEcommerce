import Link from "next/link";

export default function OrderModal({ orders }) {
  function OrderRow() {
    return (
      <div className="grid grid-cols-6 px-5 gap-x-5 w-[1000px]">
        <p className="text-xl">No</p>
        <p className="text-xl">Id</p>
        <p className="text-xl">Details</p>
        <p className="text-xl">Products</p>
        <p className="text-xl">Total Amount</p>
        <p className="text-xl">Date</p>
      </div>
    );
  }

  function OrderColumn() {
    return orders.map((order, i) => (
      <div key={i} className="bg-gray-100 rounded-md py-2 px-5 w-[1000px]">
        <div className="grid grid-cols-6 gap-x-5">
          <p className="font-medium">{i + 1}</p>
          <div className="relative cursor-pointer">
            <p className="font-medium w-full truncate break-word ">
              {order.orderId}
            </p>
          </div>
          <p className="font-medium">{order.status}</p>
          <div>
            {order.products.map((items, i) =>
              items.map((item) => (
                <div className="flex flex-col gap-y-1">
                  <Link href={`/${item.slug}`}>
                    <p key={i} className="cursor-pointer hover:underline">
                      {item.name}
                    </p>
                  </Link>
                </div>
              ))
            )}
          </div>
          <p className="font-medium">
            Rs.{(order.totalAmount / 100).toFixed(2)}
          </p>
          <p className="font-medium">{order.deliveryDetails.expectedDate}</p>
        </div>
      </div>
    ));
  }

  return (
    <div className="flex flex-col gap-y-5 overflow-scroll">
      <h4 className="text-3xl font-medium">All Orders</h4>
      <OrderRow />
      <OrderColumn />
    </div>
  );
}
