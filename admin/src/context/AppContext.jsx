import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateParts = slotDate.split("_");
    const day = dateParts[0];
    const month = months[parseInt(dateParts[1], 10) - 1]; // Convert month to zero-based index
    const year = dateParts[2];

    return `${day} ${month} ${year}`;
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const value = { calculateAge, slotDateFormat, currencySymbol };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
