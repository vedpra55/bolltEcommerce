import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { updateUserProfile } from "../../../supabaseApi/userHandler";
import Button from "../../ui/button";
import { useEffect } from "react";

export default function EditAddressModal({ setModal, address, user, setUser }) {
  const [pinCode, setPineCode] = useState(address?.pinCode);
  const [city, setCity] = useState(address?.city);
  const [state, setState] = useState(address?.state);
  const [home, setHome] = useState(address?.home);

  async function handleSave() {
    const data = {
      address: {
        pinCode,
        city,
        state,
        home,
      },
    };
    await updateUserProfile(data, user, user.id, setUser);
    setModal(false);
  }

  useEffect(() => {
    if (pinCode) {
      if (pinCode.length > 5) {
        getPincode();
      }
    }
  }, [pinCode]);

  async function getPincode() {
    const pin = parseInt(pinCode);
    console.log(pin);
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const data = await res.json();

    if (data[0].Status === "Success") {
      const postOffice = data[0].PostOffice[0];
      setCity(postOffice.Name + "," + postOffice.Division);
      setState(postOffice.Circle);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-y-5  gap-x-2">
        <input
          type={"text"}
          placeholder="Pinecode"
          value={pinCode}
          onChange={(e) => setPineCode(e.target.value)}
        />
        <input
          type={"text"}
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type={"text"}
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type={"text"}
          placeholder="Home Address"
          value={home}
          onChange={(e) => setHome(e.target.value)}
        />
      </div>
      <div className="mt-10">
        <Button handleClick={handleSave} text="Save" Icon={BookmarkIcon} />
      </div>
    </div>
  );
}
