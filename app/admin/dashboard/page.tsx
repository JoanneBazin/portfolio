import { auth } from "@/lib/auth";
import { EditProjects } from "@/sections/EditProjects";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  } else {
    console.log(session);
  }
  return (
    <div>
      <h2 className="text-5xl text-accent font-montserrat m-20">Dashboard</h2>
      <EditProjects />
    </div>
  );
};

export default DashboardPage;
