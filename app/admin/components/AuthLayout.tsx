"use client";

import Sidebar from "./sidebar";

const AdminLayout = ({ children }) => {
  return (
    <main className="flex ">
      <Sidebar />
      <section className="lg:ml-[34px] w-full mx-6 mt-3 pt-3 py-4 md:ml-[30px] ml-0">
        {children}
      </section>
    </main>
  );
};
export default AdminLayout;
