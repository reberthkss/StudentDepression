import SurveyResponseCounter from "./survey_response_counter";

export default function RootLayout({ children }: { children: any }) {
    return (
        <>
            <div className="fixed top-0 w-full backdrop-blur-md">
                <SurveyResponseCounter />
            </div>
            {children}
        </>
    )
}