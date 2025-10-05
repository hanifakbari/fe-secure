"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Shield,
  FileText,
  CreditCard,
  UserCircle,
} from "lucide-react";

export default function DashboardLayout({ children, role }) {
  const router = useRouter();
  const { user, logout, isAuthenticated, initialize } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    initialize();
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, initialize, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Menu items berdasarkan role
  const getMenuItems = () => {
    if (role === "super_admin") {
      return [
        { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
        { name: "Vendors", icon: Building2, href: "/admin/vendors" },
        { name: "Clients", icon: Users, href: "/admin/clients" },
        { name: "Transaksi", icon: CreditCard, href: "/admin/transactions" },
        { name: "Settings", icon: Settings, href: "/admin/settings" },
      ];
    } else if (role === "vendor") {
      return [
        { name: "Dashboard", icon: LayoutDashboard, href: "/vendor/dashboard" },
        { name: "Personil Satpam", icon: Users, href: "/vendor/personil" },
        { name: "Orders", icon: FileText, href: "/vendor/orders" },
        { name: "Profile", icon: UserCircle, href: "/vendor/profile" },
        { name: "Settings", icon: Settings, href: "/vendor/settings" },
      ];
    } else {
      return [
        { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { name: "Cari Satpam", icon: Search, href: "/browse" },
        { name: "Booking Saya", icon: FileText, href: "/bookings" },
        { name: "Profile", icon: UserCircle, href: "/profile" },
        { name: "Settings", icon: Settings, href: "/settings" },
      ];
    }
  };

  const menuItems = getMenuItems();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden border-r border-gray-200 bg-white lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto pt-5">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-2 px-6">
            <div className="bg-primary-600 flex h-10 w-10 items-center justify-center rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              SatpamMarket
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:bg-primary-50 hover:text-primary-600 group flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 transition"
              >
                <item.icon className="group-hover:text-primary-600 h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="bg-primary-100 flex h-10 w-10 items-center justify-center rounded-full">
                <UserCircle className="text-primary-600 h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role?.replace("_", " ")}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="bg-opacity-75 fixed inset-0 bg-gray-600"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">SatpamMarket</span>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:bg-primary-50 hover:text-primary-600 flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
            <div className="border-t p-4">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Search Bar - Desktop */}
            <div className="hidden max-w-md flex-1 md:flex">
              <div className="relative w-full">
                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 outline-none focus:border-transparent focus:ring-2"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {/* Profile Dropdown - Desktop */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100"
                >
                  <div className="bg-primary-100 flex h-8 w-8 items-center justify-center rounded-full">
                    <UserCircle className="text-primary-600 h-5 w-5" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                    <div className="border-b px-4 py-2">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.email}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user?.role?.replace("_", " ")}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
