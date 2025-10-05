"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import useAuthStore from "@/store/authStore";
import {
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { user, fetchProfile } = useAuthStore();
  const [stats, setStats] = useState({
    totalVendors: 45,
    pendingVendors: 8,
    totalClients: 120,
    totalRevenue: 450000000,
    activeContracts: 67,
    platformFee: 13500000,
  });

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mock data untuk pending vendors
  const pendingVendors = [
    {
      id: 1,
      companyName: "PT Satpam Nusantara",
      email: "info@satpamnusantara.com",
      phone: "081234567890",
      registeredDate: "2025-10-05",
      status: "pending",
    },
    {
      id: 2,
      companyName: "CV Keamanan Terpadu",
      email: "admin@keamananterpadu.com",
      phone: "081234567891",
      registeredDate: "2025-10-04",
      status: "pending",
    },
    {
      id: 3,
      companyName: "PT Guardian Security",
      email: "contact@guardian.com",
      phone: "081234567892",
      registeredDate: "2025-10-03",
      status: "pending",
    },
  ];

  // Mock data untuk recent activities
  const recentActivities = [
    {
      id: 1,
      type: "vendor_approved",
      message: "PT Satpam Jaya telah disetujui",
      time: "1 jam yang lalu",
      icon: CheckCircle,
      color: "green",
    },
    {
      id: 2,
      type: "new_vendor",
      message: "Vendor baru mendaftar: CV Keamanan Pro",
      time: "3 jam yang lalu",
      icon: AlertTriangle,
      color: "yellow",
    },
    {
      id: 3,
      type: "new_client",
      message: "Client baru: PT Maju Bersama",
      time: "5 jam yang lalu",
      icon: Users,
      color: "blue",
    },
    {
      id: 4,
      type: "transaction",
      message: "Transaksi baru: Rp 15.000.000",
      time: "1 hari yang lalu",
      icon: DollarSign,
      color: "green",
    },
  ];

  // Stats comparison
  const statsComparison = [
    { label: "Vendors Aktif", current: 37, previous: 32, increase: true },
    { label: "Clients Aktif", current: 98, previous: 85, increase: true },
    { label: "Kontrak Bulan Ini", current: 45, previous: 52, increase: false },
  ];

  return (
    <DashboardLayout role="super_admin">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white">
          <h1 className="mb-2 text-3xl font-bold">Admin Dashboard 🎯</h1>
          <p className="mb-6 text-indigo-100">
            Kelola platform marketplace satpam dengan mudah
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/vendors"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              <Building2 className="h-5 w-5" />
              Kelola Vendor ({stats.pendingVendors} Pending)
            </Link>
            <Link
              href="/admin/transactions"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Lihat Transaksi
            </Link>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Vendors */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              {stats.pendingVendors > 0 && (
                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                  {stats.pendingVendors} Pending
                </span>
              )}
            </div>
            <h3 className="mb-1 text-2xl font-bold text-gray-900">
              {stats.totalVendors}
            </h3>
            <p className="text-sm text-gray-600">Total Vendors</p>
          </div>

          {/* Total Clients */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="mb-1 text-2xl font-bold text-gray-900">
              {stats.totalClients}
            </h3>
            <p className="text-sm text-gray-600">Total Clients</p>
          </div>

          {/* Total Revenue */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="mb-1 text-2xl font-bold text-gray-900">
              Rp {(stats.totalRevenue / 1000000).toFixed(0)}M
            </h3>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>

          {/* Platform Fee */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <h3 className="mb-1 text-2xl font-bold text-gray-900">
              Rp {(stats.platformFee / 1000000).toFixed(1)}M
            </h3>
            <p className="text-sm text-gray-600">Platform Fee (3%)</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Pending Vendors for Approval */}
          <div className="rounded-xl border border-gray-200 bg-white lg:col-span-2">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Vendor Menunggu Approval
                </h2>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                  {pendingVendors.length} Pending
                </span>
              </div>
            </div>
            <div className="space-y-4 p-6">
              {pendingVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="rounded-lg border border-gray-200 p-4 transition hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="mb-1 font-semibold text-gray-900">
                        {vendor.companyName}
                      </h3>
                      <p className="text-sm text-gray-600">{vendor.email}</p>
                      <p className="text-sm text-gray-600">{vendor.phone}</p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                      <Clock className="h-3 w-3" />
                      Pending
                    </span>
                  </div>

                  <div className="mb-3 text-xs text-gray-500">
                    Didaftar: {vendor.registeredDate}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700">
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </button>
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
                      <XCircle className="h-4 w-4" />
                      Reject
                    </button>
                    <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                      Detail
                    </button>
                  </div>
                </div>
              ))}

              {pendingVendors.length === 0 && (
                <div className="py-12 text-center">
                  <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-300" />
                  <p className="text-gray-500">Semua vendor sudah direview</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activities & Stats */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Aktivitas Terbaru
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex gap-3">
                        <div
                          className={`h-8 w-8 flex-shrink-0 bg-${activity.color}-100 flex items-center justify-center rounded-full`}
                        >
                          <Icon
                            className={`h-4 w-4 text-${activity.color}-600`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="mb-1 text-sm font-medium text-gray-900">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Performa</h2>
                <Activity className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {statsComparison.map((stat, index) => (
                  <div key={index}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-600">{stat.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {stat.current}
                        </span>
                        <span
                          className={`text-xs ${stat.increase ? "text-green-600" : "text-red-600"}`}
                        >
                          {stat.increase ? "↑" : "↓"}{" "}
                          {Math.abs(stat.current - stat.previous)}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className={`h-2 rounded-full ${stat.increase ? "bg-green-500" : "bg-red-500"}`}
                        style={{
                          width: `${(stat.current / (stat.current + stat.previous)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Quick Access</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Link
              href="/admin/vendors"
              className="hover:border-primary-600 hover:bg-primary-50 group flex items-center gap-4 rounded-lg border-2 border-gray-200 p-4 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 transition group-hover:bg-purple-600">
                <Building2 className="h-6 w-6 text-purple-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Vendors</h3>
                <p className="text-sm text-gray-600">Kelola vendor</p>
              </div>
            </Link>

            <Link
              href="/admin/clients"
              className="hover:border-primary-600 hover:bg-primary-50 group flex items-center gap-4 rounded-lg border-2 border-gray-200 p-4 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 transition group-hover:bg-blue-600">
                <Users className="h-6 w-6 text-blue-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Clients</h3>
                <p className="text-sm text-gray-600">Data client</p>
              </div>
            </Link>

            <Link
              href="/admin/transactions"
              className="hover:border-primary-600 hover:bg-primary-50 group flex items-center gap-4 rounded-lg border-2 border-gray-200 p-4 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 transition group-hover:bg-green-600">
                <DollarSign className="h-6 w-6 text-green-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Transaksi</h3>
                <p className="text-sm text-gray-600">Lihat semua</p>
              </div>
            </Link>

            <Link
              href="/admin/settings"
              className="hover:border-primary-600 hover:bg-primary-50 group flex items-center gap-4 rounded-lg border-2 border-gray-200 p-4 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 transition group-hover:bg-orange-600">
                <BarChart3 className="h-6 w-6 text-orange-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">Reports</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
