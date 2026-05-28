const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-6 mt-10">
      <p className="font-semibold">
        Shopmern &copy; {new Date().getFullYear()}  | All rights reserved.
      </p>

      <p className="text-sm text-gray-400 mt-1">
        MERN Stack E-Commerce Platform
      </p>
    </footer>
  );
};
export default Footer;