import { AiFillPieChart } from "react-icons/ai";
import { SiFuturelearn } from "react-icons/si";
import { FaBeer, FaTruck } from "react-icons/fa";
import { RiShipFill } from "react-icons/ri";

export const MenuItems = [
  { title: "Dashboard", path: "/dashboard", icon: <AiFillPieChart /> },
  { title: "Cases", path: "/cases", icon: <SiFuturelearn /> },
  { title: "Products", path: "/products", icon: <FaBeer /> },
  { title: "Manufacturers", path: "/manufacturers", icon: <FaTruck /> },
  { title: "Vessels", path: "/Vessels", icon: <RiShipFill /> },
];
