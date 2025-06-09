import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";

const AddDoctor = () => {
  const { backendUrl, adminToken } = useContext(AdminContext);
  const [docImg, setDocImg] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "1 Year",
    fees: "",
    speciality: "General physician",
    degree: "",
    address: {
      line1: "",
      line2: "",
    },
    about: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Please upload a doctor image.");
      }

      // Prepare form data for submission
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("experience", formData.experience);
      data.append("fees", formData.fees);
      data.append("speciality", formData.speciality);
      data.append("degree", formData.degree);
      data.append("address", JSON.stringify(formData.address));
      data.append("about", formData.about);
      data.append("image", docImg);

      const response = await axios.post(
        backendUrl + "/admin/add-doctor",
        data,
        {
          headers: {
            token: adminToken,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          experience: "1 Year",
          fees: "",
          speciality: "General physician",
          degree: "",
          address: { line1: "", line2: "" },
          about: "",
        });
        setDocImg(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while adding the doctor."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border border-gray-200 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => {
              setDocImg(e.target.files[0]);
            }}
            accept="image/*"
          />
          <p>
            Upload doctor <br />
            picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                type="text"
                placeholder="Enter doctor name"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Email</p>
              <input
                type="email"
                placeholder="Enter doctor email"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                autoComplete="off"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Password</p>
              <input
                type="password"
                placeholder="Enter doctor password"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                autoComplete="new-password"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                required
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
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
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                type="number"
                placeholder="Enter doctor fees"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                required
                value={formData.fees}
                onChange={(e) =>
                  setFormData({ ...formData, fees: e.target.value })
                }
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                required
                value={formData.speciality}
                onChange={(e) =>
                  setFormData({ ...formData, speciality: e.target.value })
                }
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Degree</p>
              <input
                type="text"
                placeholder="Enter doctor degree"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                required
                value={formData.degree}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value })
                }
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                type="text"
                placeholder="Enter address line 1"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                required
                value={formData.address.line1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, line1: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="Enter address line 2"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                value={formData.address.line2}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, line2: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            placeholder="Write about doctor"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary w-full h-32"
            required
            value={formData.about}
            onChange={(e) =>
              setFormData({ ...formData, about: e.target.value })
            }
            rows={5}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full hover:bg-primary/90 transition duration-300"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
