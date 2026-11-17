export const metadata = { title: "Admin | Winterior", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-linen text-ink">{children}</div>;
}