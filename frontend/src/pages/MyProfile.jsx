import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const { userData, setUserData } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img src={userData.image} alt="user-img" className="size-36 rounded" />
      {editMode ? (
        <input
          type="text"
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          value={userData.name}
          required
          placeholder="Enter your name"
          className="bg-gray-100 text-3xl font-medium max-w-60 mt-4 focus:outline-none"
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr />

      {/* CONTACT INFORMATION */}
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {editMode ? (
            <input
              type="text"
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              value={userData.phone}
              required
              placeholder="Enter your phone"
              className="bg-gray-100 max-w-52 focus:outline-none"
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {editMode ? (
            <p>
              <input
                type="text"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...userData.address, line1: e.target.value },
                  })
                }
                value={userData.address.line1}
                required
                placeholder="Enter address line 1"
                className="bg-gray-100 focus:outline-none"
              />
              <br />
              <input
                type="text"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...userData.address, line2: e.target.value },
                  })
                }
                value={userData.address.line2}
                required
                placeholder="Enter address line 2"
                className="bg-gray-100 focus:outline-none"
              />
            </p>
          ) : (
            <p className="text-gray-400">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* BASIC INFORMATION */}
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {editMode ? (
            <select
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
              value={userData.gender}
              className="bg-gray-100 max-w-52 focus:outline-none appearance-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}
          <p className="font-medium">Date of Birth:</p>
          {editMode ? (
            <input
              type="date"
              onChange={(e) =>
                setUserData({ ...userData, dob: e.target.value })
              }
              value={userData.dob}
              className="bg-gray-100 max-w-52 focus:outline-none"
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        {editMode ? (
          <button
            onClick={() => setEditMode(false)}
            className="bg-primary text-white px-6 py-2 rounded-full cursor-pointer hover:bg-primary/90 transition-all duration-300"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-gray-200 text-black px-6 py-2 rounded-full cursor-pointer hover:bg-gray-300 transition-all duration-300"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
