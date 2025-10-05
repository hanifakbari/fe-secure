"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Search,
  MapPin,
  Star,
  Users,
  Filter,
  Building2,
  Phone,
  Mail,
} from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  // Mock data vendors - nanti ganti dengan data dari API
  const vendors = [
    {
      id: 1,
      companyName: "PT Satpam Jaya Abadi",
      rating: 4.8,
      totalReviews: 45,
      location: "Jakarta Selatan",
      availablePersonnel: 15,
      startingPrice: 5000000,
      description:
        "Penyedia jasa keamanan profesional dengan pengalaman 10 tahun",
      phone: "081234567890",
      email: "info@satpamjaya.com",
    },
    {
      id: 2,
      companyName: "CV Keamanan Terpercaya",
      rating: 4.9,
      totalReviews: 67,
      location: "Tangerang",
      availablePersonnel: 20,
      startingPrice: 4500000,
      description: "Satpam bersertifikat dengan training berkala",
      phone: "081234567891",
      email: "admin@keamananterpadu.com",
    },
    {
      id: 3,
      companyName: "PT Guardian Security",
      rating: 4.7,
      totalReviews: 32,
      location: "Jakarta Pusat",
      availablePersonnel: 12,
      startingPrice: 5500000,
      description: "Solusi keamanan terintegrasi untuk berbagai kebutuhan",
      phone: "081234567892",
      email: "contact@guardian.com",
    },
    {
      id: 4,
      companyName: "PT Bina Satpam Indonesia",
      rating: 4.6,
      totalReviews: 28,
      location: "Bekasi",
      availablePersonnel: 18,
      startingPrice: 4800000,
      description: "Personil terlatih untuk keamanan gedung dan kawasan",
      phone: "081234567893",
      email: "info@binasatpam.com",
    },
    {
      id: 5,
      companyName: "CV Aman Sejahtera",
      rating: 4.5,
      totalReviews: 21,
      location: "Jakarta Timur",
      availablePersonnel: 10,
      startingPrice: 4200000,
      description: "Layanan keamanan 24/7 dengan sistem monitoring modern",
      phone: "081234567894",
      email: "admin@amansejahtera.com",
    },
    {
      id: 6,
      companyName: "PT Security Prima",
      rating: 4.9,
      totalReviews: 89,
      location: "Jakarta Selatan",
      availablePersonnel: 25,
      startingPrice: 6000000,
      description: "Premium security service untuk perusahaan besar",
      phone: "081234567895",
      email: "info@securityprima.com",
    },
  ];

  // Filter vendors based on search and location
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      selectedLocation === "all" || vendor.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  // Sort vendors
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price-low") return a.startingPrice - b.startingPrice;
    if (sortBy === "price-high") return b.startingPrice - a.startingPrice;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-600/30">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">eGuards</span>
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="font-medium text-gray-700 transition hover:text-blue-600"
              >
                Masuk
              </Link>
              <Link
                href="/register/vendor"
                className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700"
              >
                Daftar Vendor
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Security Visual */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 py-20">
        {/* Security Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px),
                             repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px)`,
            }}
          ></div>
        </div>

        {/* Shield Icons Pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <Shield className="absolute top-10 left-20 h-32 w-32 rotate-12" />
          <Shield className="absolute right-32 bottom-20 h-40 w-40 -rotate-12" />
          <Shield className="absolute top-32 right-10 h-24 w-24 rotate-45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-2xl bg-blue-500/20 p-4 ring-2 ring-blue-400/30 backdrop-blur-sm">
                <Shield className="h-16 w-16 text-blue-300" strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
              Keamanan Terpercaya
              <span className="block text-blue-300">Untuk Bisnis Anda</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-blue-100">
              Platform terdepan untuk menemukan vendor satpam profesional dan
              tersertifikasi
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-blue-900/10">
              <div className="flex gap-3">
                <div className="flex flex-1 items-center gap-3 rounded-xl bg-gray-50 px-4">
                  <Search className="h-5 w-5 text-blue-600" />
                  <input
                    type="text"
                    placeholder="Cari vendor satpam profesional..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent py-4 text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>
                <button className="rounded-xl bg-blue-600 px-10 py-4 font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl">
                  Cari Sekarang
                </button>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-3 gap-8">
            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm">
              <div className="mb-3 text-5xl font-bold text-white">500+</div>
              <div className="text-blue-200">Vendor Terverifikasi</div>
            </div>
            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm">
              <div className="mb-3 text-5xl font-bold text-white">2000+</div>
              <div className="text-blue-200">Personil Bersertifikat</div>
            </div>
            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm">
              <div className="mb-3 text-5xl font-bold text-white">24/7</div>
              <div className="text-blue-200">Dukungan Pelanggan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Vendor List */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filter:</span>
          </div>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Lokasi</option>
            <option value="Jakarta Selatan">Jakarta Selatan</option>
            <option value="Jakarta Pusat">Jakarta Pusat</option>
            <option value="Jakarta Timur">Jakarta Timur</option>
            <option value="Tangerang">Tangerang</option>
            <option value="Bekasi">Bekasi</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="rating">Urutkan: Rating Tertinggi</option>
            <option value="price-low">Harga Terendah</option>
            <option value="price-high">Harga Tertinggi</option>
          </select>

          <div className="ml-auto text-sm text-gray-600">
            Menampilkan{" "}
            <span className="font-semibold">{sortedVendors.length}</span> vendor
          </div>
        </div>

        {/* Vendor Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100"
            >
              {/* Vendor Image Placeholder */}
              <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100">
                <Shield className="absolute h-32 w-32 text-blue-600 opacity-10" />
                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-lg shadow-blue-900/10">
                  <Star className="h-4 w-4 fill-current text-blue-600" />
                  <span className="font-bold text-gray-900">
                    {vendor.rating}
                  </span>
                </div>
                {/* Security Badge */}
                <div className="absolute bottom-4 left-4 rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                  Terverifikasi
                </div>
              </div>

              <div className="p-6">
                {/* Company Name */}
                <h3 className="mb-2 text-xl font-bold text-gray-900 transition group-hover:text-blue-600">
                  {vendor.companyName}
                </h3>

                {/* Rating & Reviews */}
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(vendor.rating) ? "fill-current text-blue-600" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({vendor.totalReviews} ulasan)
                  </span>
                </div>

                {/* Location */}
                <div className="mb-2 flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{vendor.location}</span>
                </div>

                {/* Available Personnel */}
                <div className="mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-green-600">
                    {vendor.availablePersonnel} personil siap
                  </span>
                </div>

                {/* Description */}
                <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                  {vendor.description}
                </p>

                {/* Price & CTA */}
                <div className="flex items-end justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="mb-1 text-xs font-medium text-gray-500">
                      Mulai dari
                    </p>
                    <p className="text-xl font-bold text-blue-600">
                      Rp {(vendor.startingPrice / 1000000).toFixed(1)}jt
                      <span className="text-sm font-normal text-gray-500">
                        /bulan
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`/vendor/${vendor.id}`}
                    className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 hover:shadow-xl"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedVendors.length === 0 && (
          <div className="py-16 text-center">
            <Shield className="mx-auto mb-4 h-24 w-24 text-gray-300" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Vendor tidak ditemukan
            </h3>
            <p className="text-gray-600">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 36px)`,
            }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-blue-500/20 p-4 ring-2 ring-blue-400/30 backdrop-blur-sm">
              <Building2 className="h-12 w-12 text-blue-300" />
            </div>
          </div>
          <h2 className="mb-4 text-4xl font-bold text-white">
            Anda Penyedia Jasa Keamanan?
          </h2>
          <p className="mb-10 text-xl text-blue-100">
            Bergabunglah dengan platform terpercaya dan kembangkan bisnis Anda
          </p>
          <Link
            href="/register/vendor"
            className="inline-block rounded-xl bg-white px-10 py-4 font-bold text-blue-900 shadow-2xl transition hover:bg-blue-50 hover:shadow-blue-500/20"
          >
            Daftar Sebagai Vendor
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-600/30">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">eGuards</span>
              </div>
              <p className="text-sm text-gray-400">
                Platform marketplace keamanan terpercaya di Indonesia
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="transition hover:text-blue-400">
                    Cari Satpam
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register/vendor"
                    className="transition hover:text-blue-400"
                  >
                    Daftar Vendor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="transition hover:text-blue-400"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Bantuan</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="transition hover:text-blue-400">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-blue-400">
                    Cara Booking
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-blue-400">
                    Kontak
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Kontak</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: info@satpammarket.com</li>
                <li>Phone: +62 21 1234 5678</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-gray-400">
            © 2025 SatpamMarket. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
