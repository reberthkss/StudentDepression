import SurveyHeader from "./survey_header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="">
      <SurveyHeader/>
      {children}
    </div>
  );
}


