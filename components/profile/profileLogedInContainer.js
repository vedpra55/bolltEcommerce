import { useEffect, useState } from "react";
import Button from "../ui/button";
import ProfileModal from "./modals/profileModal";
import useSWR from "swr";

export default function ProfileLogedInContainer({ setUser, user, Logout }) {
  const [showModal, setModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [Index, setIndex] = useState(null);

  const userOrderFetcher = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/userOrder?userId=${user.id}`
    );
    const data = res.json();
    return data;
  };

  const { data: orders, error } = useSWR("orders", userOrderFetcher);
  function addArray(arr) {
    let sum = 0; // initialize sum
    for (let i = 0; i < arr.length; i++) sum += arr[i];
    return (sum / 100).toFixed(2);
  }

  useEffect(() => {
    const amount = orders?.data.map((item) => item.totalAmount);
    if (amount) {
      setTotalAmount(addArray(amount));
    }
  }, [orders]);

  const tabs = [
    { name: "Orders" },
    { name: "Edit Address" },
    { name: "Edit Details" },
  ];

  function EditAddress() {
    return (
      <div className="mt-5 flex flex-col gap-y-2">
        <div className="flex  gap-x-5 ">
          <p>Pincode :</p>
          <p>{user.address.pinCode}</p>
        </div>
        <div className="flex  gap-x-5">
          <p>State :</p>
          <p>{user.address.state}</p>
        </div>
        <div className="flex  gap-x-5">
          <p>City :</p>
          <p>{user.address.city}</p>
        </div>
        <div className="flex  gap-x-5">
          <p>Home :</p>
          <p>{user.address.home}</p>
        </div>
      </div>
    );
  }

  function ViewOrder() {
    return orders?.data ? (
      <div className="mt-5 flex flex-col gap-y-2">
        <div className="flex gap-x-5">
          <p>Total Orders :</p>
          <p>{orders.data.length}</p>
        </div>
        <div className="flex gap-x-5">
          <p>Total Orders Amount :</p>
          <p>Rs.{totalAmount}</p>
        </div>
      </div>
    ) : (
      <div className="mt-10">
        <p className="text-xl font-medium">No Orders</p>
      </div>
    );
  }

  function EditDetails() {
    return (
      <div className="mt-5 flex flex-col gap-y-2">
        <div className="flex  gap-x-5">
          <p>Name :</p>
          <p>{user.name}</p>
        </div>
        <div className="flex  gap-x-5">
          <p>Email :</p>
          <p>{user.email}</p>
        </div>
        <div className="flex  gap-x-5">
          <p>Phone :</p>
          <p>{user.phoneNo}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-10 mt-10">
      <div className="flex justify-between items-center flex-wrap  gap-y-5">
        <h2 className="text-3xl font-bold">Welcome {user.name}</h2>
        <Button text={"Sign Out"} handleClick={Logout} />
      </div>
      <div className="grid grid-cols-1 gap-y-5  md:grid-cols-3 gap-x-5">
        {tabs.map((tab, i) => (
          <div key={i} className="bg-gray-100  h-56 rounded-md px-5 py-5">
            <div className="flex justify-between">
              <h4 className="text-xl font-medium">{tab.name}</h4>
              <button
                disabled={tab.name === "Orders" && orders?.data.length === 0}
                onClick={() => {
                  setModal(true);
                  setIndex(i);
                }}
                className="bg-black/70 rounded-md px-4 py-1 text-white disabled:bg-black/40"
              >
                {tab.name === "Orders" ? "View" : "Edit"}
              </button>
              {showModal && (
                <ProfileModal
                  orders={orders}
                  setUser={setUser}
                  showModal={showModal}
                  setModal={setModal}
                  tabs={tabs}
                  user={user}
                  i={Index}
                />
              )}
            </div>
            {tab.name === "Orders" && <ViewOrder />}
            {tab.name === "Edit Address" && <EditAddress />}
            {tab.name === "Edit Details" && <EditDetails />}
          </div>
        ))}
      </div>
    </div>
  );
}
