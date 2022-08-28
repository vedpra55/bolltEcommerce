import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Button from "../ui/button";
import { updateUserProfile } from "../../supabaseApi/userHandler";

export default function CompleteProfile({ setUser, sessionUser }) {
  const userName = sessionUser?.identities[0].identity_data.name;
  const [email, setEmail] = useState(sessionUser?.email);
  const [name, setName] = useState(userName);
  const [phoneNo, setPhoneNo] = useState("");
  const [pinCode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [home, setHome] = useState("");

  useEffect(() => {
    if (pinCode.length > 5) {
      getPincode();
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

    console.log(data);
  }

  async function handleSubmit() {
    if (phoneNo.length > 0) {
      setPhoneNo(parseInt(phoneNo));
    }
    const data = {
      name,
      email,
      phoneNo,
      address: {
        pineCode: pinCode,
        city,
        state,
        home,
      },
    };
    await updateUserProfile(data, sessionUser, sessionUser.id, setUser);
  }

  return (
    <div className="fixed flex justify-center items-center inset-0  bg-slate-100  bg-opacity-50 backdrop-blur-sm z-50  h-screen w-screen">
      <div className="bg-white h-full w-full overflow-y-scroll md:h-[400px] md:w-[60%] rounded-md p-5">
        <div className="flex flex-col gap-y-10 mt-5">
          <h4 className="text-3xl font-medium">Complete Profile</h4>
          <div className="flex justify-between items-center flex-wrap gap-y-5">
            <input
              type={"text"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type={"text"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              type={"number"}
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder="Phone No"
            />
            <input
              type={"text"}
              value={pinCode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Pincode"
            />
            <input
              type={"text"}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
            <input
              type={"text"}
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
            />
            <input
              type={"text"}
              value={home}
              onChange={(e) => setHome(e.target.value)}
              placeholder="Home Address"
            />
          </div>
          <div>
            <Button
              handleClick={handleSubmit}
              text={"Save"}
              Icon={BookmarkIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
