import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-3 relative z-20 text-gray-300 py-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <div
            style={{
              "backgroundColor": "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
            className="px-4 py-2 bg-white rounded-md"
          >
            <h2
              style={{
                background: "-webkit-linear-gradient(45deg,  #f72585, #7209b7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="text-3xl font-bold"
            >
              Planet Games
            </h2>
          </div>
        </div>
{/*         <div className="mt-6 md:mt-0">
          <Link
            href="/cockie-policy"
            className="text-gray-300 hover:text-gray-100 mr-4"
          >
            Cookie Policy
          </Link>
          <Link
            href="/privacy-policy"
            className="text-gray-300 hover:text-gray-100 mr-4"
          >
            Privacy Policy
          </Link>
          <Link href="contact-us" className="text-gray-300 hover:text-gray-100">
            Contact Us
          </Link>
        </div> */}
      </div>
    </footer>
  );
};
