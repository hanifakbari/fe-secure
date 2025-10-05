"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuthStore from "@/store/authStore";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, initialize } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    initialize();
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, initialize, router]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    const result = await login(data);

    if (result.success) {
      // Redirect based on role
      const role = result.user.role;
      if (role === "super_admin") {
        router.push("/admin/dashboard");
      } else if (role === "vendor") {
        router.push("/vendor/dashboard");
      } else {
        router.push("/dashboard");
      }
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="bg-primary-600 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Satpam Marketplace
          </h1>
          <p className="mt-2 text-gray-600">Masuk ke akun Anda</p>
        </div>

        {/* Login Form */}
        <div className="rounded-lg bg-white p-8 shadow-xl">
          {error && (
            <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
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
                  placeholder="nama@perusahaan.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password wajib diisi",
                  })}
                  className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 py-3 pr-12 pl-10 transition outline-none focus:border-transparent focus:ring-2"
                  placeholder="Masukkan password"
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
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Ingat saya
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Lupa password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-200 w-full rounded-lg py-3 font-medium text-black transition focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">
                Belum punya akun?
              </span>
            </div>
          </div>

          {/* Register Links */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/register/vendor"
              className="border-primary-600 text-primary-600 hover:bg-primary-50 rounded-lg border-2 px-4 py-3 text-center font-medium transition"
            >
              Daftar Vendor
            </Link>
            <Link
              href="/register/client"
              className="rounded-lg border-2 border-gray-300 px-4 py-3 text-center font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Daftar Client
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          © 2025 Satpam Marketplace. All rights reserved.
        </p>
      </div>
    </div>
  );
}
