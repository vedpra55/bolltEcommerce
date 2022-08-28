import { useState } from "react";
import Button from "../../ui/button";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { updateUserProfile } from "../../../supabaseApi/userHandler";

export default function EditDetailsModal({
  setUser,
  user,
  setChangeUser,
  setModal,
}) {
  const [name, setName] = useState(user?.name);
  const [phoneNo, setPhoneNo] = useState(user?.phoneNo);

  async function handleSave() {
    const data = {
      name,
      phoneNo,
    };

    await updateUserProfile(data, user, user.id, setUser);
    setModal(false);
  }

  return (
    <div>
      <div className="flex items-center flex-wrap gap-x-20 gap-y-5">
        <input
          type={"text"}
          placeholder="Pinecode"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type={"text"}
          placeholder="Phone No"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
      </div>
      <div className="mt-10">
        <Button handleClick={handleSave} text="Save" Icon={BookmarkIcon} />
      </div>
    </div>
  );
}
