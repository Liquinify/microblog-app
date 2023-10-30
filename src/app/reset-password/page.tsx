import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import ResetPassword from "../../components/auth/ResetPassword";

export default async function ResetPasswordPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect("/posts");
  }

  return <ResetPassword />;
}
