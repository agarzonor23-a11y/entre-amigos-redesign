import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2, LayoutDashboard, Globe, ShoppingBag } from "lucide-react";
import logoEntreamigos from "@/assets/logo-entreamigos.png";
import SiteContentTab from "@/components/admin/SiteContentTab";
import MarketplaceTab from "@/components/admin/MarketplaceTab";

const TABS = [
  { id: "site", label: "Sitio Web", icon: Globe },
  { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
] as const;

type TabId = (typeof TABS)[number]["id"];

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("site");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-muted">
      {/* Top bar */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoEntreamigos} alt="Entre Amigos" className="h-8" />
            <div className="flex items-center gap-2 text-sm">
              <LayoutDashboard className="w-4 h-4 text-primary" />
              <span className="font-bold text-foreground">Panel CMS</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-sm">
              Ver sitio
            </Button>
            <Button variant="outline" size="sm" onClick={signOut} className="gap-1.5">
              <LogOut className="w-4 h-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground mb-2">Gestión de Contenido</h1>
          <p className="text-muted-foreground">Edita los textos del sitio web y administra los productos del marketplace.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "site" && <SiteContentTab />}
        {activeTab === "marketplace" && <MarketplaceTab />}
      </main>
    </div>
  );
};

export default AdminDashboard;
