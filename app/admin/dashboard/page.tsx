import { AdminTabs } from "@/components/layout/AdminTabs";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  } else {
    console.log(session);
  }
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
