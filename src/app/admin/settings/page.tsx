"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Key, Bell, Globe } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 pt-8 pb-16">
        <Container>
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-inter)]">Settings</h1>
            <p className="text-sm text-text-secondary mt-1">API keys & configuration</p>
          </div>

          <div className="space-y-5 max-w-xl">
            <Card hover={false} className="p-5">
              <div className="flex items-center gap-3 mb-5">
                <Key className="h-5 w-5 text-accent-purple" />
                <h3 className="text-sm font-bold font-[family-name:var(--font-inter)]">API Keys</h3>
              </div>
              <div className="space-y-4">
                <Input label="Reloadly API Key" type="password" value="••••••••••••••••" id="reloadly-key" />
                <Input label="Daraja Consumer Key" type="password" value="••••••••••••••••" id="daraja-key" />
                <Input label="Daraja Consumer Secret" type="password" value="••••••••••••••••" id="daraja-secret" />
                <Input label="Resend API Key" type="password" value="••••••••••••••••" id="resend-key" />
                <Button size="sm">Save API Keys</Button>
              </div>
            </Card>

            <Card hover={false} className="p-5">
              <div className="flex items-center gap-3 mb-5">
                <Bell className="h-5 w-5 text-accent-purple" />
                <h3 className="text-sm font-bold font-[family-name:var(--font-inter)]">Notifications</h3>
              </div>
              <div className="space-y-4">
                <Input label="Admin Email" type="email" value="admin@gamesntech.co.ke" id="admin-email" />
                <Input label="SMS Alert" type="tel" value="+254 712 345 678" id="admin-phone" />
                <Button size="sm">Save</Button>
              </div>
            </Card>

            <Card hover={false} className="p-5">
              <div className="flex items-center gap-3 mb-5">
                <Globe className="h-5 w-5 text-accent-purple" />
                <h3 className="text-sm font-bold font-[family-name:var(--font-inter)]">General</h3>
              </div>
              <div className="space-y-4">
                <Input label="Site Name" value="Games N Tech" id="site-name" />
                <Input label="Support Email" type="email" value="support@gamesntech.co.ke" id="support-email" />
                <Input label="Currency" value="KES (Kenyan Shilling)" id="currency" />
                <Button size="sm">Save</Button>
              </div>
            </Card>
          </div>
        </Container>
      </main>
    </div>
  );
}
