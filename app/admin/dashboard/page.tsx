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
    <div>
      <h2 className="text-5xl text-accent font-montserrat text-center my-10">
        Dashboard
      </h2>
    </div>
  );
};

export default DashboardPage;
