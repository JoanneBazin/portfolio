import { AdminTabs } from "@/components/layout/AdminTabs";

const DashboardPage = async () => {
  return (
    <div className="pb-20">
      <h1 className="text-xl text-center sm:text-2xl sm:text-start text-accent font-montserrat my-5 sm:my-10 sm:pl-16">
        Dashboard
      </h1>
      <AdminTabs />
    </div>
  );
};

export default DashboardPage;
