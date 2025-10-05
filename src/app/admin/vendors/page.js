"use client";

import DashboardLayout from "@/components/DashboardLayout";

export default function AdminVendorsPage() {
  return (
    <DashboardLayout role="super_admin">
      <div className="rounded-xl bg-white p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Kelola Vendors
        </h1>
        <p className="text-gray-600">
          Halaman untuk approve/reject vendors akan segera dibuat.
        </p>
      </div>
    </DashboardLayout>
  );
}
