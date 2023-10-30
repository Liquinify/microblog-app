import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import SignIn from "../../components/auth/SignIn";

export default async function SignInPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect("/posts");
  }

  return <SignIn />;
}
