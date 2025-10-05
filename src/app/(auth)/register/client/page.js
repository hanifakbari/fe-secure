"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuthStore from "@/store/authStore";
import {
  Eye,
  EyeOff,
  Users,
  Mail,
  Lock,
  Phone,
  MapPin,
  User,
  AlertCircle,
} from "lucide-react";

export default function RegisterClientPage() {
  const router = useRouter();
  const { register: registerUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    setValidationErrors([]);

    const result = await registerUser(data, "client");

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.message);
      if (result.errors) {
        setValidationErrors(result.errors);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="bg-primary-600 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Daftar Sebagai Client
          </h1>
          <p className="mt-2 text-gray-600">
            Temukan personil satpam terbaik untuk perusahaan Anda
          </p>
        </div>

        {/* Form */}
        <div className="rounded-lg bg-white p-8 shadow-xl">
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">{error}</p>
                {validationErrors.length > 0 && (
                  <ul className="mt-2 list-inside list-disc text-sm text-red-700">
                    {validationErrors.map((err, idx) => (
                      <li key={idx}>{err.msg}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Person */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nama Lengkap (PIC) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  {...register("contact_person", {
                    required: "Nama lengkap wajib diisi",
                  })}
                  className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition outline-none focus:border-transparent focus:ring-2"
                  placeholder="Budi Santoso"
                />
              </div>
              {errors.contact_person && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.contact_person.message}
                </p>
              )}
            </div>

            {/* Company Name (Optional) */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nama Perusahaan{" "}
                <span className="text-xs text-gray-400">(Opsional)</span>
              </label>
              <div className="relative">
                <Users className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  {...register("company_name")}
                  className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition outline-none focus:border-transparent focus:ring-2"
                  placeholder="PT ABC Indonesia"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email wajib diisi",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Format email tidak valid",
                    },
                  })}
                  className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition outline-none focus:border-transparent focus:ring-2"
                  placeholder="budi@perusahaan.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nomor Telepon <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Nomor telepon wajib diisi",
                    pattern: {
                      value: /^(\+62|62|0)[0-9]{9,12}$/,
                      message:
                        "Format nomor telepon tidak valid (contoh: 081234567890)",
                    },
                  })}
                  className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition outline-none focus:border-transparent focus:ring-2"
                  placeholder="081234567890"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address (Optional) */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Alamat <span className="text-xs text-gray-400">(Opsional)</span>
              </label>
              <div className="relative">
                <MapPin className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <textarea
                  {...register("address")}
                  rows={3}
                  className="focus:ring-primary-500 w-full resize-none rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition outline-none focus:border-transparent focus:ring-2"
                  placeholder="Jl. Gatot Subroto, Jakarta"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password wajib diisi",
                    minLength: {
                      value: 8,
                      message: "Password minimal 8 karakter",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message:
                        "Password harus mengandung huruf besar, huruf kecil, dan angka",
                    },
                  })}
                  className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 py-3 pr-12 pl-10 transition outline-none focus:border-transparent focus:ring-2"
                  placeholder="Minimal 8 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Password harus minimal 8 karakter dengan kombinasi huruf besar,
                kecil, dan angka
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Konfirmasi Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Konfirmasi password wajib diisi",
                    validate: (value) =>
                      value === password || "Password tidak cocok",
                  })}
                  className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition outline-none focus:border-transparent focus:ring-2"
                  placeholder="Ulangi password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                {...register("terms", {
                  required: "Anda harus menyetujui syarat dan ketentuan",
                })}
                className="text-primary-600 focus:ring-primary-500 mt-1 h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                Saya menyetujui{" "}
                <Link
                  href="/terms"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Syarat dan Ketentuan
                </Link>{" "}
                serta{" "}
                <Link
                  href="/privacy"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Kebijakan Privasi
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-200 w-full rounded-lg py-3 font-medium text-white transition focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Mendaftar..." : "Daftar Sekarang"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
