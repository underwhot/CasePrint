import DesignPreview from "@/components/design-preview";
import { db } from "@/db";
import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
} from "@workos-inc/authkit-nextjs";
import { notFound } from "next/navigation";

type PreviewPageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function PreviewPage({ searchParams }: PreviewPageProps) {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();
  const signUpUrl = await getSignUpUrl();
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  return (
    <DesignPreview
      configuration={configuration}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      user={user}
    />
  );
}
