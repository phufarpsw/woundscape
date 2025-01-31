import { List } from "antd";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LuLayoutDashboard, LuScissors } from "react-icons/lu";
import { MdOutlineSick, MdOutlineAccountCircle } from "react-icons/md";
import { TbReportMedical } from "react-icons/tb";
import { RiUserSettingsLine } from "react-icons/ri";
import Logo_Wound from "@assets/logo/logo-wound.svg";
import ImageMenu from "./ImageMenu";
import { DoctorType } from "@constants";
import { useAuth } from "./AuthProvider";

interface IMenu {
  title: string;
  pathname: string;
  icon: any;
  required: string;
}

const defaultMenuRoutes: IMenu[] = [
  {
    title: "Dashboard",
    pathname: "/dashboard",
    icon: <LuLayoutDashboard color="#505152" size={22} />,
    required: DoctorType.Doctor,
  },
  {
    title: "Patient",
    pathname: "/patient",
    icon: <MdOutlineSick color="#505152" size={26} />,
    required: DoctorType.Doctor,
  },
  {
    title: "Equipment",
    pathname: "/equipment",
    icon: <LuScissors color="#505152" size={22} />,
    required: DoctorType.Doctor,
  },
  // {
  //   title: "Archive",
  //   pathname: "/archive",
  //   icon: Archive_LOGO,
  // },
  {
    title: "Allocation",
    pathname: "/allocation",
    icon: <TbReportMedical color="#505152" size={24} />,
    required: DoctorType.Expert,
  },
  {
    title: "Users Management",
    pathname: "/management",
    icon: <RiUserSettingsLine color="#505152" size={22} />,
    required: DoctorType.Expert,
  },
  {
    title: "Account",
    pathname: "/account",
    icon: <MdOutlineAccountCircle color="#505152" size={24} />,
    required: DoctorType.Doctor,
  },
];

export default function Menu() {
  const [menus] = useState<IMenu[]>(defaultMenuRoutes);
  const location = useLocation();
  const pathName = location?.pathname;
  const { me } = useAuth();
  function ListMenu() {
    return menus?.map((item, index) => {
      if (
        me?.doctor_type == DoctorType.Admin ||
        item.required == me?.doctor_type
      )
        return (
          <List.Item key={index}>
            <NavLink
              to={item.pathname}
              className={`flex items-center py-3 px-4 rounded-lg ${
                pathName.startsWith(item.pathname)
                  ? "bg-[#D2D7EB]"
                  : "hover:bg-[#EEEEEE]"
              }`}
            >
              {item.icon}
              <span className="ml-3 text-sm jura">{item.title}</span>
            </NavLink>
          </List.Item>
        );
    });
  }
  return (
    <>
      <nav
        id="nav"
        className="w-[16rem] h-full flex flex-col justify-center select-none"
      >
        <div className="py-6">
          <NavLink
            to={"/dashboard"}
            className="flex justify-center items-center"
          >
            <img height={40} width={40} src={Logo_Wound} alt="" />
            <p className="michroma text-lg">Woundscape</p>
          </NavLink>
        </div>
        <div className="grow pb-6 overflow-y-auto">
          <ul className="space-y-2 px-6">
            {pathName.split("/")[1] != "wound" ? ListMenu() : <ImageMenu />}
          </ul>
        </div>
      </nav>
    </>
  );
}
