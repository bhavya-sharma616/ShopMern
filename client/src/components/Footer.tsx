const Footer = () => {
  return (
    <footer
  className="
   bg-slate-900 text-slate-300
  "
>
  <div
    className="
      max-w-7xl mx-auto
      px-6 py-14
      grid md:grid-cols-3
      gap-10
    "
  >
    <div>
      <h2
        className="
          text-3xl font-black
        "
      >
        ShopMERN
      </h2>

      <p
        className="
          mt-4 text-slate-400
        "
      >
        Modern ecommerce platform
        built with MERN stack.
      </p>
    </div>

    <div>
      <h3 className="font-bold mb-4">
        Quick Links
      </h3>

      <ul className="space-y-2 text-slate-400">
        <li>Home</li>
        <li>Products</li>
        <li>Cart</li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold mb-4">
        Contact
      </h3>

      <p className="text-slate-400">
        support@shopmern.com
      </p>
    </div>
  </div>

  <div
    className="
      border-t border-slate-800
      text-center py-4
      text-slate-500 text-sm
    "
  >
    © 2026 ShopMERN. All rights reserved.
  </div>
</footer>
  );
};
export default Footer;