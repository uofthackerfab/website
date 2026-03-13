export const metadata = {
  title: "Internal Documentation | Toronto Hacker Fab",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InternalDocsPage() {
  return (
    <div className="w-full h-screen">
      <iframe 
        src="https://docs.torontohackerfab.com/#/" 
        className="w-full h-full border-0"
        title="Internal Hacker Fab Docs"
      />
    </div>
  );
}
