"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import {
  Shield,
  Star,
  MapPin,
  Phone,
  Mail,
  Building2,
  Users,
  CheckCircle,
  Award,
  Clock,
  Calendar,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

export default function VendorDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, user } = useAuthStore();
  const [vendor, setVendor] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPersonnel, setSelectedPersonnel] = useState([]);

  useEffect(() => {
    // Fetch vendor data based on ID
    // Untuk sekarang pakai mock data
    const mockVendor = {
      id: params.id,
      companyName: "PT Satpam Jaya Abadi",
      rating: 4.8,
      totalReviews: 45,
      location: "Jakarta Selatan",
      address: "Jl. Sudirman No. 123, Jakarta Selatan 12190",
      phone: "081234567890",
      email: "info@satpamjaya.com",
      description:
        "PT Satpam Jaya Abadi adalah penyedia jasa keamanan profesional dengan pengalaman lebih dari 10 tahun. Kami menyediakan personil satpam terlatih dan bersertifikat untuk berbagai kebutuhan keamanan perusahaan.",
      founded: "2014",
      totalPersonnel: 150,
      availablePersonnel: 15,
      startingPrice: 5000000,
      certifications: [
        "ISO 9001:2015",
        "Badan Koordinasi Keamanan Laut",
        "Sertifikat Gada Pratama",
      ],
      services: [
        "Keamanan Gedung Perkantoran",
        "Keamanan Kawasan Industri",
        "Keamanan Perumahan",
        "Keamanan Event",
        "Patrol & Monitoring",
      ],
      personnel: [
        {
          id: 1,
          name: "Budi Santoso",
          age: 35,
          experience: "8 tahun",
          certification: "Gada Pratama",
          skills: ["Patrol", "CCTV Monitoring", "First Aid"],
          available: true,
          pricePerMonth: 5000000,
        },
        {
          id: 2,
          name: "Ahmad Hidayat",
          age: 32,
          experience: "6 tahun",
          certification: "Gada Pratama",
          skills: ["Access Control", "Fire Safety", "Emergency Response"],
          available: true,
          pricePerMonth: 5200000,
        },
        {
          id: 3,
          name: "Joko Widodo",
          age: 40,
          experience: "12 tahun",
          certification: "Gada Madya",
          skills: [
            "Security Management",
            "Team Coordination",
            "Risk Assessment",
          ],
          available: true,
          pricePerMonth: 6000000,
        },
        {
          id: 4,
          name: "Rudi Hartono",
          age: 28,
          experience: "4 tahun",
          certification: "Gada Pratama",
          skills: ["Patrol", "Guest Registration", "Parking Control"],
          available: true,
          pricePerMonth: 4800000,
        },
        {
          id: 5,
          name: "Hendra Gunawan",
          age: 38,
          experience: "10 tahun",
          certification: "Gada Madya",
          skills: ["Crowd Control", "VIP Protection", "Crisis Management"],
          available: false,
          pricePerMonth: 6500000,
        },
      ],
      reviews: [
        {
          id: 1,
          clientName: "PT ABC Indonesia",
          rating: 5,
          date: "2025-09-15",
          comment:
            "Sangat profesional dan responsif. Personil yang ditempatkan sangat terlatih dan disiplin.",
        },
        {
          id: 2,
          clientName: "CV Maju Jaya",
          rating: 4,
          date: "2025-08-20",
          comment:
            "Pelayanan baik, harga kompetitif. Recommended untuk perusahaan yang butuh keamanan berkualitas.",
        },
        {
          id: 3,
          clientName: "PT Sejahtera Abadi",
          rating: 5,
          date: "2025-07-10",
          comment:
            "Sudah bekerja sama 2 tahun. Sangat puas dengan layanan dan profesionalisme tim.",
        },
      ],
    };

    setVendor(mockVendor);
  }, [params.id]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      // Save intended destination
      localStorage.setItem("redirectAfterLogin", `/vendor/${params.id}`);
      router.push("/login");
    } else {
      // Proceed to booking
      router.push(`/booking/${params.id}`);
    }
  };

  const togglePersonnelSelection = (personnelId) => {
    if (selectedPersonnel.includes(personnelId)) {
      setSelectedPersonnel(
        selectedPersonnel.filter((id) => id !== personnelId),
      );
    } else {
      setSelectedPersonnel([...selectedPersonnel, personnelId]);
    }
  };

  const getTotalPrice = () => {
    if (!vendor) return 0;
    return selectedPersonnel.reduce((total, id) => {
      const personnel = vendor.personnel.find((p) => p.id === id);
      return total + (personnel?.pricePerMonth || 0);
    }, 0);
  };

  if (!vendor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="mx-auto mb-4 h-16 w-16 animate-pulse text-gray-300" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary-600 flex h-10 w-10 items-center justify-center rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                SatpamMarket
              </span>
            </Link>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/bookings"
                    className="hover:text-primary-600 font-medium text-gray-700"
                  >
                    Booking Saya
                  </Link>
                  <Link
                    href="/profile"
                    className="hover:text-primary-600 font-medium text-gray-700"
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hover:text-primary-600 font-medium text-gray-700"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register/client"
                    className="bg-primary-600 hover:bg-primary-700 rounded-lg px-6 py-2 font-medium text-white transition"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="hover:text-primary-600 text-gray-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/" className="hover:text-primary-600 text-gray-600">
              Vendors
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-900">
              {vendor.companyName}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Vendor Header */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              {/* Cover Image */}
              <div className="relative flex h-64 items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800">
                <Shield className="absolute h-48 w-48 text-white opacity-20" />
                <div className="absolute bottom-4 left-4 rounded-lg bg-white px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-current text-yellow-500" />
                    <span className="text-2xl font-bold text-gray-900">
                      {vendor.rating}
                    </span>
                    <span className="text-gray-600">
                      ({vendor.totalReviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                      {vendor.companyName}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>{vendor.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>Berdiri sejak {vendor.founded}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-700">
                      Terverifikasi
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <Users className="text-primary-600 mx-auto mb-2 h-6 w-6" />
                    <div className="text-2xl font-bold text-gray-900">
                      {vendor.totalPersonnel}
                    </div>
                    <div className="text-sm text-gray-600">Total Personil</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <CheckCircle className="mx-auto mb-2 h-6 w-6 text-green-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {vendor.availablePersonnel}
                    </div>
                    <div className="text-sm text-gray-600">Tersedia</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <Award className="mx-auto mb-2 h-6 w-6 text-orange-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {vendor.certifications.length}
                    </div>
                    <div className="text-sm text-gray-600">Sertifikasi</div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                  <div className="flex gap-8">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`pb-4 font-medium transition ${
                        activeTab === "overview"
                          ? "text-primary-600 border-primary-600 border-b-2"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("personnel")}
                      className={`pb-4 font-medium transition ${
                        activeTab === "personnel"
                          ? "text-primary-600 border-primary-600 border-b-2"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Personil ({vendor.availablePersonnel})
                    </button>
                    <button
                      onClick={() => setActiveTab("reviews")}
                      className={`pb-4 font-medium transition ${
                        activeTab === "reviews"
                          ? "text-primary-600 border-primary-600 border-b-2"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Reviews ({vendor.totalReviews})
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-3 text-xl font-bold text-gray-900">
                        Tentang Kami
                      </h3>
                      <p className="leading-relaxed text-gray-700">
                        {vendor.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-3 text-xl font-bold text-gray-900">
                        Layanan Kami
                      </h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        {vendor.services.map((service, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-gray-700">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-xl font-bold text-gray-900">
                        Sertifikasi
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {vendor.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="bg-primary-50 text-primary-700 rounded-lg px-4 py-2 text-sm font-medium"
                          >
                            <Award className="mr-1 inline h-4 w-4" />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "personnel" && (
                  <div className="space-y-4">
                    {vendor.personnel.map((person) => (
                      <div
                        key={person.id}
                        className={`rounded-lg border-2 p-4 transition ${
                          selectedPersonnel.includes(person.id)
                            ? "border-primary-600 bg-primary-50"
                            : "border-gray-200 hover:border-gray-300"
                        } ${!person.available ? "opacity-50" : ""}`}
                      >
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="mb-1 text-lg font-bold text-gray-900">
                              {person.name}
                            </h4>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                              <span>{person.age} tahun</span>
                              <span>•</span>
                              <span>{person.experience} pengalaman</span>
                              <span>•</span>
                              <span className="text-primary-600 font-medium">
                                {person.certification}
                              </span>
                            </div>
                          </div>
                          {person.available ? (
                            <button
                              onClick={() =>
                                togglePersonnelSelection(person.id)
                              }
                              className={`rounded-lg px-4 py-2 font-medium transition ${
                                selectedPersonnel.includes(person.id)
                                  ? "bg-primary-600 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {selectedPersonnel.includes(person.id)
                                ? "Terpilih"
                                : "Pilih"}
                            </button>
                          ) : (
                            <span className="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-500">
                              Tidak Tersedia
                            </span>
                          )}
                        </div>

                        <div className="mb-3 flex flex-wrap gap-2">
                          {person.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="text-right">
                          <span className="text-sm text-gray-600">Harga: </span>
                          <span className="text-lg font-bold text-gray-900">
                            Rp {(person.pricePerMonth / 1000000).toFixed(1)}
                            jt/bulan
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    {vendor.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {review.clientName}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {review.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-current text-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-6">
                <p className="mb-2 text-sm text-gray-600">Harga mulai dari</p>
                <div className="mb-1 text-3xl font-bold text-gray-900">
                  Rp {(vendor.startingPrice / 1000000).toFixed(1)}jt
                </div>
                <p className="text-sm text-gray-600">per bulan per personil</p>
              </div>

              {selectedPersonnel.length > 0 && (
                <div className="bg-primary-50 mb-6 rounded-lg p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      Personil Dipilih:
                    </span>
                    <span className="text-primary-600 font-bold">
                      {selectedPersonnel.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Harga:</span>
                    <span className="text-lg font-bold text-gray-900">
                      Rp {(getTotalPrice() / 1000000).toFixed(1)}jt/bulan
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBookNow}
                className="mb-4 w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 py-4 font-bold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
              >
                {isAuthenticated ? "Book Now" : "Login untuk Booking"}
              </button>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <a
                    href={`tel:${vendor.phone}`}
                    className="hover:text-primary-600"
                  >
                    {vendor.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <a
                    href={`mailto:${vendor.email}`}
                    className="hover:text-primary-600"
                  >
                    {vendor.email}
                  </a>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span>{vendor.address}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Vendor Terverifikasi</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="text-primary-600 h-4 w-4" />
                  <span>Pembayaran Aman</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <Link
        href="/"
        className="fixed bottom-8 left-8 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 font-medium text-gray-700 shadow-lg transition hover:shadow-xl"
      >
        <ArrowLeft className="h-5 w-5" />
        Kembali ke Home
      </Link>
    </div>
  );
}
