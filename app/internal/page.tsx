export const metadata = {
  title: "Internal Documentation | Toronto Hacker Fab",
  robots: {
    index: false,
    follow: false,
  },
};

const docsUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3002/#/"
    : "https://docs.torontohackerfab.com/#/";

export default function InternalDocsPage() {
  return (
    <div className="w-full h-screen">
      <iframe 
        src={docsUrl} 
        className="w-full h-full border-0"
        title="Internal Hacker Fab Docs"
      />
    </div>
  );
}
