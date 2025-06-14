import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import DoctorCard from "../components/DoctorCard";
import { AppContext } from "../context/AppContext";

const Appointment = () => {
  const { docId } = useParams();
  const { currencySymbol, backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [relatedDocs, setRelatedDocs] = useState(null);

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  useEffect(() => {
    fetchDoctorInfo();
  }, [docId]);

  useEffect(() => {
    if (doctorInfo) {
      fetchRelatedDoctors();
    }
  }, [doctorInfo?.speciality]);

  useEffect(() => {
    getAvailableSlots();
  }, [doctorInfo]);

  const fetchDoctorInfo = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/user/get-doctor-by-id/${docId}`,
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        setDoctorInfo(response.data.data);
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching doctor info:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch doctor information. Please try again later."
      );
    }
  };

  const fetchRelatedDoctors = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/user/get-doctors-by-speciality`,
        {
          speciality: doctorInfo?.speciality || "annen",
        },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        setRelatedDocs(response.data.data);
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching related doctors:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch related doctors. Please try again later."
      );
    }
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting today's date
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      const endTime = new Date(currentDate);
      endTime.setHours(21, 30, 0); // 9:30 PM (21:30 is not included in the slots because we are incrementing by 30 minutes)

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        // if current date is today, set hours to after current time
        currentDate.setHours(
          currentDate.getHours() > 10
            ? currentDate.getMinutes() >= 30
              ? currentDate.getHours() + 1
              : currentDate.getHours()
            : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() >= 30 ? 0 : 30);
      } else {
        // if current date is not today, set hours to 10 AM
        currentDate.setHours(10, 0);
        // currentDate.setMinutes(0);
      }

      const timeSlots = [];

      // loop through the time slots from current date to end time
      while (currentDate <= endTime) {
        // getting time in HH:MM format
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // check if the slot is already booked
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1; // Months are zero-based
        let year = currentDate.getFullYear();
        const slotDate = `${day < 10 ? "0" + day : day}_${
          month < 10 ? "0" + month : month
        }_${year}`;
        const slotTime = formattedTime;
        const isSlotAvailable =
          doctorInfo?.slots_booked[slotDate] &&
          doctorInfo?.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        // if slot is available, add it to the time slots array
        if (isSlotAvailable) {
          // add slot to the time slots array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        // increment current date by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // add the time slots to the docSlots array
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const handleBookAppointment = async () => {
    if (!token) {
      toast.warning("Please login to book an appointment.");
      return navigate("/login");
    }

    try {
      if (!slotTime) {
        toast.error("Please select a slot time.");
        return;
      }

      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1; // Months are zero-based
      let year = date.getFullYear();
      const slotDate = `${day < 10 ? "0" + day : day}_${
        month < 10 ? "0" + month : month
      }_${year}`;

      const response = await axios.post(
        `${backendUrl}/user/book-appointment`,
        {
          // userId: JSON.parse(localStorage.getItem("userData"))._id,
          doctorId: doctorInfo?._id,
          slotDate,
          slotTime,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Appointment booked successfully!");
        fetchDoctorInfo(); // Refresh doctor info to update slots
        navigate("/my-appointments"); // Redirect to my appointments page
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to book appointment. Please try again later."
      );
    }
  };

  return (
    doctorInfo && (
      <div>
        {/* DOCTOR DETAILS */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* IMAGE */}
          <div>
            <img
              src={doctorInfo?.image}
              alt=""
              className="bg-primary w-full sm:max-w-72 rounded-lg"
            />
          </div>
          {/* DETAILS */}
          <div className="flex-1 border border-gray-400 rounded-lg px-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {doctorInfo?.name}
              <img
                src={assets.verified_icon}
                alt="verified"
                className="size-5"
              />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>{doctorInfo?.degree.concat(" - ", doctorInfo?.speciality)}</p>
              <button className="px-2 py-0.5 border border-gray-400 rounded-full text-xs">
                {doctorInfo?.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="info" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {doctorInfo?.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol.concat(doctorInfo?.fees)}
              </span>
            </p>
          </div>
        </div>

        {/* SLOTS */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>

          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                  }}
                  className={`text-center py-5 min-w-16 rounded-full cursor-pointer transition-all duration-300 ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200 hover:bg-gray-100 "
                  }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-5">
            {docSlots.length &&
              docSlots[slotIndex] &&
              docSlots[slotIndex].map((slot, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(slot.time)}
                  className={`px-4 py-2 rounded-lg text-sm shrink-0 cursor-pointer text-center transition-all duration-300 ${
                    slotTime === slot.time
                      ? "bg-primary text-white"
                      : "border border-gray-200 hover:bg-gray-100 "
                  }`}
                >
                  {slot.time}
                </p>
              ))}
          </div>

          <button
            onClick={handleBookAppointment}
            className="mt-6 bg-primary text-white text-sm px-10 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 cursor-pointer"
          >
            Book an Appointment
          </button>
        </div>

        {/* RELATED DOCTORS */}
        {relatedDocs && relatedDocs.length > 0 && (
          <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
            <h1 className="text-3xl font-medium">Related Doctors</h1>
            <p className="sm:w-1/3 text-center text-sm">
              Simply browse through our extensive list of trusted doctors.
            </p>
            <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
              {relatedDocs
                .filter((doctor) => doctor._id !== docId)
                .slice(0, 5)
                .map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Appointment;
