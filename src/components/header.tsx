import Link from "next/link";
import Navbar from "./navbar";
import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from "@workos-inc/authkit-nextjs";

export default async function Header() {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();
  const signUpUrl = await getSignUpUrl();

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  return (
    <header className="sticky inset-x-0 top-0 z-[100] bg-background/90 backdrop-blur-sm">
      <div className="container flex items-center justify-between gap-4 py-3">
        <Link href="/" className="relative z-50 font-bold">
          Case<span className="text-primary">Print</span>
        </Link>

        <Navbar
          signInUrl={signInUrl}
          signUpUrl={signUpUrl}
          user={user}
          handleSignOut={handleSignOut}
          isAdmin={isAdmin}
        />
      </div>
    </header>
  );
}
