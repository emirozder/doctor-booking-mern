import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl } = useContext(AppContext);

  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateUserProfile = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));

      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        `${backendUrl}/user/update-profile`,
        formData,
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        setUserData(response.data.data);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        setEditMode(false);
        setImage(false);
        toast.success("Profile updated successfully!");
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {editMode ? (
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : userData.image}
              alt=""
              className="w-36 rounded opacity-75"
            />
            <img
              src={assets.upload_icon}
              alt=""
              className={`size-10 absolute top-0 left-0 right-0 bottom-0 m-auto bg-primary rounded-full p-2 cursor-pointer ${
                image ? "opacity-0" : "opacity-75"
              }`}
            />
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img src={userData.image} alt="user-img" className="w-36 rounded" />
      )}

      {editMode ? (
        <input
          type="text"
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          value={userData.name}
          required
          placeholder="Enter your name"
          className="bg-gray-100 text-3xl font-medium max-w-60 mt-4 focus:outline-none"
          disabled={isLoading}
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
              disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </p>
          ) : (
            <p className="text-gray-400">
              {userData.address?.line1}
              <br />
              {userData.address?.line2}
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
              value={userData.gender || "Not Selected"}
              className="bg-gray-100 max-w-52 focus:outline-none appearance-none"
              disabled={isLoading}
            >
              <option value="Not Selected" disabled>
                Not Selected
              </option>
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
              disabled={isLoading}
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        {editMode ? (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditMode(false);
                setImage(false);
              }}
              className={`bg-gray-200 text-black px-6 py-2 rounded-full hover:bg-gray-300 transition-all duration-300 ${
                isLoading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={updateUserProfile}
              className={`bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-all duration-300 ${
                isLoading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex gap-2">
                  <img
                    src={assets.loading_icon_white}
                    alt=""
                    className="w-5 animate-spin"
                  />
                  Updating...
                </div>
              ) : (
                "Save"
              )}
            </button>
          </div>
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
