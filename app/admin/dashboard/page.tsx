import { AdminTabs } from "@/components/layout/AdminTabs";

const DashboardPage = async () => {
  return (
    <div className="pb-20">
      <h2 className="text-5xl text-accent font-montserrat m-10 pl-10">
        Dashboard
      </h2>
      <AdminTabs />
    </div>
  );
};

export default DashboardPage;
