"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Key, Bell, Globe, CreditCard } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 pt-8 pb-16">
        <Container>
          <div className="mb-10">
            <h1 className="text-3xl font-black tracking-tight">Settings</h1>
            <p className="text-muted mt-1">API keys & configuration</p>
          </div>

          <div className="space-y-6 max-w-2xl">
            <Card hover={false}>
              <div className="flex items-center gap-3 mb-6">
                <Key className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">API Keys</h3>
              </div>
              <div className="space-y-4">
                <Input label="Reloadly API Key" type="password" value="••••••••••••••••" id="reloadly-key" />
                <Input label="Daraja Consumer Key" type="password" value="••••••••••••••••" id="daraja-key" />
                <Input label="Daraja Consumer Secret" type="password" value="••••••••••••••••" id="daraja-secret" />
                <Input label="Resend API Key" type="password" value="••••••••••••••••" id="resend-key" />
                <Button>Save API Keys</Button>
              </div>
            </Card>

            <Card hover={false}>
              <div className="flex items-center gap-3 mb-6">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Notifications</h3>
              </div>
              <div className="space-y-4">
                <Input label="Email (Admin Notifications)" type="email" value="admin@gamesntech.co.ke" id="admin-email" />
                <Input label="SMS (Low Balance Alert)" type="tel" value="+254 712 345 678" id="admin-phone" />
                <Button>Save</Button>
              </div>
            </Card>

            <Card hover={false}>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">General</h3>
              </div>
              <div className="space-y-4">
                <Input label="Site Name" value="gamesntech" id="site-name" />
                <Input label="Support Email" type="email" value="support@gamesntech.co.ke" id="support-email" />
                <Input label="Currency" value="KES (Kenyan Shilling)" id="currency" />
                <Button>Save</Button>
              </div>
            </Card>
          </div>
        </Container>
      </main>
    </div>
  );
}
