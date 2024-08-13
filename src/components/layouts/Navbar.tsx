"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "@/hooks/navigation";
import Sidebar from "@/components/layouts/Sidebar";
import { Menu } from "lucide-react";
import { Breadcrumb } from "../commons/Breadcrumb";
import Account from "./Account";

const Navbar = ({ account }: any) => {
  const pathname = usePathname();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const handleCloseSidebar = (e: any) => {
    if (e.target.id === "sidebarOverlay") setSidebarVisible(false);
  };

  useEffect(() => {
    if (isSidebarVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isSidebarVisible]);

  useEffect(() => {
    setSidebarVisible(false);
  }, [pathname]);

  return (
    <div className="flex items-center justify-between bg-custom-gray-30 z-20 bg-secondary sm:px-4 px-2 py-1 drop-shadow-md sticky top-0 w-full">
      <Breadcrumb />
      <div className="grid grid-cols-[70px_1fr] transition-all duration-200 xl:grid-cols-[0px_1fr]">
        <div className="flex gap-2 place-items-center overflow-hidden p-0 transition-all duration-200">
          <Account align="end" profile={account} />
          <button onClick={() => setSidebarVisible(true)}>
            <Menu className="size-7" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isSidebarVisible && (
          <motion.div
            id="sidebarOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseSidebar}
            className="fixed left-0 top-0 z-50 w-screen h-screen bg-black/20 xl:hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="max-w-[300px] h-screen bg-white"
            >
              <Sidebar account={account} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
