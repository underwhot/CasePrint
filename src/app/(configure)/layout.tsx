import Steps from "@/components/Steps";

export default function ConfigureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container flex flex-1 flex-col gap-8 py-10">
      <Steps />
      <div className="flex h-full w-full flex-1">{children}</div>
    </section>
  );
}
