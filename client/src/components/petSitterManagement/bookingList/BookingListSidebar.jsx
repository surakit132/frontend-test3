import { Link } from "react-router-dom";
import sitterLogo from "../../../assets/svgs/logo-navbar.svg";
import petSitterOrangeBookingList from "../../../assets/svgs/pet-sitter-management/pet-sitter-orangeBooking-list.svg";
import petSitterGrayProfile from "../../../assets/svgs/pet-sitter-management/pet-sitter-grayProfile.svg";
import petSitterOrangeProfile from "../../../assets/svgs/pet-sitter-management/pet-sitter-orangeProfile.svg";
import petSitterGrayPayment from "../../../assets/svgs/pet-sitter-management/pet-sitter-grayPayment.svg";
import petSitterOrangePayment from "../../../assets/svgs/pet-sitter-management/pet-sitter-orangePayment.svg";
import petSitterLogout from "../../../assets/svgs/pet-sitter-management/pet-sitter-logout.svg";
import petSitterOrangeCircle from "../../../assets/svgs/pet-sitter-management/pet-sitter-orangeCircle.svg";
import { useAuth } from "../../../contexts/authentication";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_API_URL } from "../../../core/config.mjs";

const Sidebar = () => {
  const { logout } = useAuth();

  const [hasWaitingForConfirm, setHasWaitingForConfirm] = useState(false);

  useEffect(() => {
    const fetchBookingStatuses = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/petsitter/booking/status`);
        const bookings = response.data.data;
        setHasWaitingForConfirm(bookings.length > 0);
      } catch (error) {
        console.error("Error fetching booking statuses:", error);
      }
    };

    fetchBookingStatuses();
  }, []);

  return (
    <section className="w-[240px] h-[1024px] bg-[#FAFAFB] flex flex-col text-primarygray-500 text-[16px] leading-[24px] flex-none">
      <div className="mt-[16px]">
        <Link to="/">
          <img
            src={sitterLogo}
            alt="sitter-logo"
            className="w-[131.61px] h-[40px] mt-[24px] mb-[48px] ml-[24px]"
          />
        </Link>
      </div>

      <Link to="/petsitter/profile" className="flex gap-[16px] px-[24px] py-[16px] hover:text-primaryorange-500">
        <img
          src={petSitterGrayProfile}
          className="w-[24px] h-[24px] hover:hidden"
        />
        <img
          src={petSitterOrangeProfile}
          className="w-[24px] h-[24px] hidden hover:inline"
        />
        <span>Pet Sitter Profile</span>
      </Link>

      <div className="flex items-center px-[24px] py-[16px] bg-primaryorange-100 text-primaryorange-500 font-medium">
        <img
          src={petSitterOrangeBookingList}
          className="w-[24px] h-[24px] mr-[16px]"
        />
        <span className="mr-[6px]">Booking List</span>
        {hasWaitingForConfirm && (
          <img
            src={petSitterOrangeCircle}
            className="w-[6px] h-[6px]"
            alt="Notification"
          />
        )}
      </div>

      <Link to="/petsitter/payout-option" className="flex gap-[16px] px-[24px] py-[16px] hover:text-primaryorange-500">
        <img
          src={petSitterGrayPayment}
          className="w-[24px] h-[24px] hover:hidden"
        />
        <img
          src={petSitterOrangePayment}
          className="w-[24px] h-[24px] hidden hover:inline"
        />
        <span>Payout Option</span>
      </Link>
      <div
        onClick={logout}
        className="flex gap-[16px] mt-[664px] pl-[24px] pt-[16px] border-t-[1px] border-primarygray-200 cursor-pointer"
      >
        <img src={petSitterLogout} className="w-[24px] h-[24px]" />
        <span>Logout</span>
      </div>
    </section>
  );
};

export default Sidebar;