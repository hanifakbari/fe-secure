"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import useAuthStore from "@/store/authStore";
import {
  Users,
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Star,
  ArrowRight,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function ClientDashboard() {
  const { user, fetchProfile } = useAuthStore();
  const [stats, setStats] = useState({
    activeBookings: 3,
    totalBookings: 12,
    totalSpent: 45000000,
    activeSecurity: 5,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  // Mock data untuk active bookings
  const activeBookings = [
    {
      id: 1,
      vendorName: "PT Satpam Jaya Abadi",
      location: "Gedung Perkantoran, Jakarta Selatan",
      personnel: 3,
      startDate: "2025-10-01",
      endDate: "2025-12-31",
      status: "active",
      rating: 4.8,
    },
    {
      id: 2,
      vendorName: "CV Keamanan Terpercaya",
      location: "Warehouse, Tangerang",
      personnel: 2,
      startDate: "2025-09-15",
      endDate: "2026-09-15",
      status: "active",
      rating: 4.9,
    },
  ];

  // Mock data untuk recent activity
  const recentActivity = [
    {
      id: 1,
      type: "booking_completed",
      message: "Booking dengan PT Satpam Jaya berhasil diselesaikan",
      time: "2 jam yang lalu",
    },
    {
      id: 2,
      type: "payment_success",
      message: "Pembayaran Rp 15.000.000 berhasil",
      time: "1 hari yang lalu",
    },
    {
      id: 3,
      type: "new_booking",
      message: "Booking baru untuk 3 personil satpam",
      time: "3 hari yang lalu",
    },
  ];

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="from-primary-600 rounded-2xl bg-gradient-to-r to-purple-600 p-8 text-white">
          <h1 className="mb-2 text-3xl font-bold">
            Selamat Datang, {user?.company_name || user?.contact_person}! 👋
          </h1>
          <p className="text-primary-100 mb-6">
            Kelola kebutuhan keamanan perusahaan Anda dengan mudah
          </p>
          <Link
            href="/browse"
            className="text-primary-600 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold transition hover:bg-gray-50"
          >
            Cari Personil Satpam
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Active Bookings */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                Active
              </span>
            </div>
            <h3 className="mb-1 text-2xl font-bold text-gray-900">
              {stats.activeBookings}
            </h3>
            <p className="text-sm text-gray-600">Booking Aktif</p>
          </div>

          {/* Total Bookings */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="mb-1 text-2xl font-bold text-gray-900">
              {stats.totalBookings}
            </h3>
            <p className="text-sm text-gray-600">Total Booking</p>
          </div>

          {/* Active Security Personnel */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="mb-1 text-2xl font-bold text-gray-900">
              {stats.activeSecurity}
            </h3>
            <p className="text-sm text-gray-600">Personil Aktif</p>
          </div>

          {/* Total Spent */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <h3 className="mb-1 text-2xl font-bold text-gray-900">
              Rp {(stats.totalSpent / 1000000).toFixed(1)}M
            </h3>
            <p className="text-sm text-gray-600">Total Pengeluaran</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Active Bookings List */}
          <div className="rounded-xl border border-gray-200 bg-white lg:col-span-2">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900">Booking Aktif</h2>
            </div>
            <div className="space-y-4 p-6">
              {activeBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-lg border border-gray-200 p-4 transition hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="mb-1 font-semibold text-gray-900">
                        {booking.vendorName}
                      </h3>
                      <div className="mb-2 flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">
                          {booking.rating}
                        </span>
                      </div>
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {booking.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{booking.personnel} Personil</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {booking.startDate} - {booking.endDate}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="bg-primary-600 hover:bg-primary-700 flex-1 rounded-lg px-4 py-2 text-sm font-medium text-white transition">
                      Detail
                    </button>
                    <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                      Hubungi
                    </button>
                  </div>
                </div>
              ))}

              {activeBookings.length === 0 && (
                <div className="py-12 text-center">
                  <Shield className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                  <p className="mb-4 text-gray-500">Belum ada booking aktif</p>
                  <Link
                    href="/browse"
                    className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 font-medium"
                  >
                    Mulai Cari Satpam
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900">
                Aktivitas Terbaru
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="bg-primary-600 mt-2 h-2 w-2 flex-shrink-0 rounded-full"></div>
                    <div className="flex-1">
                      <p className="mb-1 text-sm font-medium text-gray-900">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Quick Actions
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/browse"
              className="hover:border-primary-600 hover:bg-primary-50 group flex items-center gap-4 rounded-lg border-2 border-gray-200 p-4 transition"
            >
              <div className="bg-primary-100 group-hover:bg-primary-600 flex h-12 w-12 items-center justify-center rounded-lg transition">
                <Users className="text-primary-600 h-6 w-6 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Cari Satpam</h3>
                <p className="text-sm text-gray-600">Browse vendor</p>
              </div>
            </Link>

            <Link
              href="/bookings"
              className="hover:border-primary-600 hover:bg-primary-50 group flex items-center gap-4 rounded-lg border-2 border-gray-200 p-4 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 transition group-hover:bg-purple-600">
                <FileText className="h-6 w-6 text-purple-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Riwayat Booking</h3>
                <p className="text-sm text-gray-600">Lihat semua</p>
              </div>
            </Link>

            <Link
              href="/profile"
              className="hover:border-primary-600 hover:bg-primary-50 group flex items-center gap-4 rounded-lg border-2 border-gray-200 p-4 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 transition group-hover:bg-green-600">
                <CheckCircle className="h-6 w-6 text-green-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Update Profile</h3>
                <p className="text-sm text-gray-600">Edit data</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
