import { redirect } from "next/navigation";
import { fetchProfile } from "@/actions/auth";
import SessionProvider from "@/components/session/SessionProvider";
import Sidebar from "@/components/layouts/Sidebar";
import Navbar from "@/components/layouts/Navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await fetchProfile();
  if (profile.status !== "success") {
    return redirect("/auth/login?session=expired");
  }
  return (
    <SessionProvider value={{ user: profile.data }}>
      <div className="grid grid-cols-[0_1fr] duration-200 xl:grid-cols-[15%_1fr] h-full">
        <div className="h-full overflow-y-auto overflow-x-hidden sm:h-full drop-shadow-md">
          <Sidebar account={profile.data} />
        </div>
        <div className="h-full overflow-auto sm:h-full">
          <Navbar account={profile.data} />
          <main className="sm:p-5 py-4 px-2">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
