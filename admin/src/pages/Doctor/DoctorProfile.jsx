import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { backendUrl, doctorToken, doctorData, setDoctorData } =
    useContext(DoctorContext);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateDoctorProfile = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", doctorData.name);
      formData.append("address", JSON.stringify(doctorData.address));

      formData.append("fees", doctorData.fees);
      formData.append("speciality", doctorData.speciality);
      formData.append("experience", doctorData.experience);
      formData.append("about", doctorData.about);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        `${backendUrl}/doctor/update-profile`,
        formData,
        {
          headers: {
            token: doctorToken,
          },
        }
      );
      if (response.data.success) {
        setDoctorData(response.data.data);
        localStorage.setItem("doctorData", JSON.stringify(response.data.data));
        setEditMode(false);
        setImage(false);
        toast.success("Profile updated successfully!");
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating doctor profile:", error);
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
    <div className="p-5 h-[calc(100vh-77px)] overflow-y-auto w-full relative">
      <h1 className="text-lg font-medium">Doctor Profile</h1>
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {editMode ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                src={image ? URL.createObjectURL(image) : doctorData.image}
                alt=""
                className="overflow-clip-margin-unset size-36 rounded object-cover opacity-75"
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
          <img
            src={doctorData.image}
            alt="doctor-img"
            className="overflow-clip-margin-unset size-36 rounded object-cover"
          />
        )}

        {editMode ? (
          <input
            type="text"
            onChange={(e) =>
              setDoctorData({ ...doctorData, name: e.target.value })
            }
            value={doctorData.name}
            required
            placeholder="Enter your name"
            className="bg-gray-100 text-3xl font-medium max-w-60 mt-4 focus:outline-none"
            disabled={isLoading}
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {doctorData.name}
          </p>
        )}

        <hr />

        {/* CONTACT INFORMATION */}
        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email:</p>
            <p className="text-blue-500">{doctorData.email}</p>

            <p className="font-medium">Address:</p>
            {editMode ? (
              <p>
                <input
                  type="text"
                  onChange={(e) =>
                    setDoctorData({
                      ...doctorData,
                      address: { ...doctorData.address, line1: e.target.value },
                    })
                  }
                  value={doctorData.address.line1}
                  required
                  placeholder="Enter address line 1"
                  className="bg-gray-100 focus:outline-none"
                  disabled={isLoading}
                />
                <br />
                <input
                  type="text"
                  onChange={(e) =>
                    setDoctorData({
                      ...doctorData,
                      address: { ...doctorData.address, line2: e.target.value },
                    })
                  }
                  value={doctorData.address.line2}
                  required
                  placeholder="Enter address line 2"
                  className="bg-gray-100 focus:outline-none"
                  disabled={isLoading}
                />
              </p>
            ) : (
              <p className="text-gray-400">
                {doctorData.address?.line1}
                <br />
                {doctorData.address?.line2}
              </p>
            )}
          </div>
        </div>

        {/* BASIC INFORMATION */}
        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Fees:</p>
            {editMode ? (
              <input
                type="text"
                onChange={(e) =>
                  setDoctorData({ ...doctorData, fees: e.target.value })
                }
                value={doctorData.fees}
                required
                placeholder="Enter your fees"
                className="bg-gray-100 max-w-52 focus:outline-none"
                disabled={isLoading}
              />
            ) : (
              <p className="text-gray-400">{doctorData.fees}</p>
            )}

            <p className="font-medium">Speciality:</p>
            {editMode ? (
              <select
                onChange={(e) =>
                  setDoctorData({ ...doctorData, speciality: e.target.value })
                }
                value={doctorData.speciality || "Not Selected"}
                className="bg-gray-100 max-w-52 focus:outline-none appearance-none"
                disabled={isLoading}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            ) : (
              <p className="text-gray-400">{doctorData.speciality}</p>
            )}

            <p className="font-medium">Experience:</p>
            {editMode ? (
              <select
                onChange={(e) =>
                  setDoctorData({ ...doctorData, experience: e.target.value })
                }
                value={doctorData.experience || "Not Selected"}
                className="bg-gray-100 max-w-52 focus:outline-none appearance-none"
                disabled={isLoading}
              >
                <option value="1 Year">1 year</option>
                <option value="2 Year">2 years</option>
                <option value="3 Year">3 years</option>
                <option value="4 Year">4 years</option>
                <option value="5 Year">5 years</option>
                <option value="6 Year">6 years</option>
                <option value="7 Year">7 years</option>
                <option value="8 Year">8 years</option>
                <option value="9 Year">9 years</option>
                <option value="10 Year">10 years</option>
              </select>
            ) : (
              <p className="text-gray-400">{doctorData.experience}</p>
            )}

            <p className="font-medium">About:</p>
            {editMode ? (
              <textarea
                placeholder="Write about doctor"
                className="bg-gray-100 max-w-52 appearance-none border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary w-full h-32"
                value={doctorData.about}
                onChange={(e) =>
                  setDoctorData({ ...doctorData, about: e.target.value })
                }
                rows={5}
                disabled={isLoading}
              ></textarea>
            ) : (
              <p className="text-gray-400">{doctorData.about}</p>
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
                onClick={updateDoctorProfile}
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
    </div>
  );
};

export default DoctorProfile;
