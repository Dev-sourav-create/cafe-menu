import { Link } from "react-router-dom";

const Footer = () => {
  const linkSections = [
    {
      title: "Navigation",
      links: [
        { link: "Home", to: "#" },
        { link: "Features", to: "" },
        { link: "Feedback", to: "/feedback" },
        { link: "Login", to: "/login" },
      ],
    },
    {
      title: "Need Help?",
      links: [
        { link: "About Us", to: "/about" },
        { link: "Testimonials", to: "/testimonials" },
        { link: "Documentation", to: "/docs" },
        { link: "Contact Us", to: "/contact" },
      ],
    },
    {
      title: "Follow Us",
      links: [
        { link: "Instagram", to: "https://instagram.com" },
        { link: "Twitter", to: "https://twitter.com" },
        { link: "Facebook", to: "https://facebook.com" },
        { link: "YouTube", to: "https://youtube.com" },
      ],
    },
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mb-20">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-left text-gray-500">
        {/* Logo Section */}
        <div className="flex-1 items-start min-w-[250px]">
          <div className="flex cursor-pointer items-center gap-2">
            <img className="w-16 h-16" src="/Coffee.png" alt="logo" />
            <p className="text-3xl mt-4 font-semibold text-gray-900">Bistro</p>
          </div>
          <p className="max-w-[410px] text-xs ml-2.5 text-gray-700 mt-2">
            © 2025 Made by{" "}
            <span className="font-semibold">@SouravPrajapati</span>
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="hover:underline hover:text-gray-800 transition-colors duration-200"
                    >
                      {link.link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
