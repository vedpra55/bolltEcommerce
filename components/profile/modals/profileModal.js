import { XMarkIcon } from "@heroicons/react/24/outline";
import OrderModal from "./orderModal";
import EditAddressModal from "./editAddressModal";
import EditDetailsModal from "./editDetailsModal";

export default function ProfileModal({
  user,
  setUser,
  showModal,
  setModal,
  tabs,
  i,
  orders,
}) {
  const name = tabs[i].name;

  return (
    showModal && (
      <div className="fixed  flex justify-center items-center inset-0  bg-slate-100  bg-opacity-50 backdrop-blur-sm z-50  h-screen w-screen">
        <div className="bg-white  overflow-y-scroll h-full w-full md:h-[400px] md:w-[80%] rounded-md p-5">
          <div className="flex justify-between">
            <h4 className="text-2xl font-medium">{name}</h4>
            <XMarkIcon
              onClick={() => setModal(false)}
              className="h-8 cursor-pointer"
            />
          </div>
          <div className="mt-10">
            {name === "Orders" && (
              <OrderModal user={user} orders={orders?.data} />
            )}
            {name === "Edit Address" && (
              <EditAddressModal
                setModal={setModal}
                setUser={setUser}
                address={user.address}
                user={user}
              />
            )}
            {name === "Edit Details" && (
              <EditDetailsModal
                setUser={setUser}
                setModal={setModal}
                user={user}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
}
