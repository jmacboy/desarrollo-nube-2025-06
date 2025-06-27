import { useState } from "react";
import { List, PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router";
import { useFirebaseUser } from "../hooks/useFirebaseUser";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, isAdmin, logout } = useFirebaseUser();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const links = user
    ? [
        { to: "/", label: "Home" },
        { to: "/contacts", label: "Contacts" },
        { to: "/products", label: "Products" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ];
  const onLogoutClick = () => {
    logout();
  };
  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-xl font-semibold">Test site</div>

          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none cursor-pointer"
            >
              <List size={24} />
            </button>
          </div>

          {/* Desktop links */}
          <div className="hidden sm:flex sm:space-x-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <>
                {isAdmin && (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("admin")}
                      className="text-gray-300 hover:text-white focus:outline-none cursor-pointer"
                    >
                      Administration
                    </button>
                    {openDropdown === "admin" && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg">
                        <Link
                          to="/admin/products"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          Manage Products
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("user")}
                    className="text-gray-300 hover:text-white focus:outline-none cursor-pointer"
                  >
                    {user.displayName || "User"}
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className="inline-block h-8 w-8 rounded-full ml-2 object-fill"
                      />
                    ) : (
                      <PersonCircle
                        size={24}
                        className="inline-block h-5 w-5 rounded-full ml-2 object-fill"
                      />
                    )}
                  </button>
                  {openDropdown === "user" && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg">
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={onLogoutClick}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile links */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-3 space-y-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block text-gray-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <>
              <div>
                <button
                  onClick={() => toggleDropdown("admin")}
                  className="block text-gray-300 hover:text-white cursor-pointer w-full text-left"
                >
                  Administration
                </button>

                {openDropdown === "admin" && (
                  <div className="mt-2 bg-gray-800 rounded-md shadow-lg">
                    <Link
                      to="/admin/products"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Manage Products
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={() => toggleDropdown("user")}
                  className="block text-gray-300 hover:text-white cursor-pointer w-full text-left"
                >
                  {user.displayName || "User"}
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User Avatar"
                      className="inline-block h-8 w-8 rounded-full ml-2 object-fill"
                    />
                  ) : (
                    <PersonCircle
                      size={24}
                      className="inline-block h-5 w-5 rounded-full ml-2 object-fill"
                    />
                  )}
                </button>

                {openDropdown === "user" && (
                  <div className="mt-2 bg-gray-800 rounded-md shadow-lg">
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Settings
                    </Link>

                    <button
                      onClick={onLogoutClick}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Menu;
