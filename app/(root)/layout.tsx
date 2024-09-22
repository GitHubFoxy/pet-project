import Layout from "@/app/layout";
import Header from "@/components/shared/header";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <Layout>
      <Header />
      <main className="min-h-screen">{children}</main>
      {modal}
    </Layout>
  );
}
