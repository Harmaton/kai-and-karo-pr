import { FetchAdminStatus } from "@/_actions/admin";
import Layoutheader from "./_components/layout-header";
import Sidebar from "./_components/sidebar";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const isadmin = await FetchAdminStatus()
  if(!isadmin){
    redirect('/')
  }
  return (
    <div className="flex flex-col flex-1">
      {/* HEADER */}
      <Layoutheader />
      <div className="flex flex-col lg:flex-row">
        {/* SIDEBAR */}
        <Sidebar />
        <div className="flex-1 flex justify-center lg:justify-start items-start max-w-5xl mx-auto w-full">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
