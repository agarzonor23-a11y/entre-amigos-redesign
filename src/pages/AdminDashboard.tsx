import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllSiteContent, useUpdateSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  LogOut, Save, Loader2, LayoutDashboard, Type, Image, MousePointerClick,
  ChevronDown, ChevronRight, CheckCircle2, AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import logoEntreamigos from "@/assets/logo-entreamigos.png";

// Define all editable sections with their fields
const SECTIONS_CONFIG: Record<string, { label: string; fields: Array<{ key: string; label: string; type: "text" | "textarea" | "url" | "image" }> }> = {
  hero: {
    label: "🏠 Hero Principal",
    fields: [
      { key: "badge", label: "Badge texto", type: "text" },
      { key: "title_line1", label: "Título línea 1", type: "text" },
      { key: "title_line2", label: "Título línea 2 (gradiente)", type: "text" },
      { key: "description", label: "Descripción", type: "textarea" },
      { key: "description_bold", label: "Texto destacado", type: "text" },
      { key: "cta_primary", label: "Botón principal", type: "text" },
      { key: "cta_secondary", label: "Botón secundario", type: "text" },
      { key: "feature_1", label: "Feature 1", type: "text" },
      { key: "feature_2", label: "Feature 2", type: "text" },
      { key: "feature_3", label: "Feature 3", type: "text" },
    ],
  },
  stats: {
    label: "📊 Estadísticas",
    fields: [
      { key: "stat_1_value", label: "Valor 1", type: "text" },
      { key: "stat_1_label", label: "Etiqueta 1", type: "text" },
      { key: "stat_2_value", label: "Valor 2", type: "text" },
      { key: "stat_2_label", label: "Etiqueta 2", type: "text" },
      { key: "stat_3_value", label: "Valor 3", type: "text" },
      { key: "stat_3_label", label: "Etiqueta 3", type: "text" },
      { key: "stat_4_value", label: "Valor 4", type: "text" },
      { key: "stat_4_label", label: "Etiqueta 4", type: "text" },
    ],
  },
  products: {
    label: "💡 Productos",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Título", type: "text" },
      { key: "title_gradient", label: "Título gradiente", type: "text" },
      { key: "subtitle", label: "Subtítulo", type: "text" },
      { key: "product_1_title", label: "Producto 1 - Título", type: "text" },
      { key: "product_1_desc", label: "Producto 1 - Descripción", type: "textarea" },
      { key: "product_2_title", label: "Producto 2 - Título", type: "text" },
      { key: "product_2_desc", label: "Producto 2 - Descripción", type: "textarea" },
      { key: "product_3_title", label: "Producto 3 - Título", type: "text" },
      { key: "product_3_desc", label: "Producto 3 - Descripción", type: "textarea" },
      { key: "product_4_title", label: "Producto 4 - Título", type: "text" },
      { key: "product_4_desc", label: "Producto 4 - Descripción", type: "textarea" },
    ],
  },
  transparency: {
    label: "🛡️ Transparencia",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Título", type: "text" },
      { key: "title_gradient", label: "Título gradiente", type: "text" },
      { key: "subtitle", label: "Subtítulo", type: "textarea" },
      { key: "item_1_title", label: "Item 1 - Título", type: "text" },
      { key: "item_1_desc", label: "Item 1 - Descripción", type: "textarea" },
      { key: "item_2_title", label: "Item 2 - Título", type: "text" },
      { key: "item_2_desc", label: "Item 2 - Descripción", type: "textarea" },
      { key: "item_3_title", label: "Item 3 - Título", type: "text" },
      { key: "item_3_desc", label: "Item 3 - Descripción", type: "textarea" },
      { key: "item_4_title", label: "Item 4 - Título", type: "text" },
      { key: "item_4_desc", label: "Item 4 - Descripción", type: "textarea" },
      { key: "item_5_title", label: "Item 5 - Título", type: "text" },
      { key: "item_5_desc", label: "Item 5 - Descripción", type: "textarea" },
      { key: "item_6_title", label: "Item 6 - Título", type: "text" },
      { key: "item_6_desc", label: "Item 6 - Descripción", type: "textarea" },
    ],
  },
  how_it_works: {
    label: "🚀 Cómo Funciona",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Título", type: "text" },
      { key: "subtitle", label: "Subtítulo", type: "text" },
      { key: "step_1_title", label: "Paso 1 - Título", type: "text" },
      { key: "step_1_desc", label: "Paso 1 - Descripción", type: "textarea" },
      { key: "step_2_title", label: "Paso 2 - Título", type: "text" },
      { key: "step_2_desc", label: "Paso 2 - Descripción", type: "textarea" },
      { key: "step_3_title", label: "Paso 3 - Título", type: "text" },
      { key: "step_3_desc", label: "Paso 3 - Descripción", type: "textarea" },
      { key: "step_4_title", label: "Paso 4 - Título", type: "text" },
      { key: "step_4_desc", label: "Paso 4 - Descripción", type: "textarea" },
    ],
  },
  testimonials: {
    label: "❤️ Testimonios",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Título", type: "text" },
      { key: "title_gradient", label: "Título gradiente", type: "text" },
      { key: "testimonial_1_name", label: "Testimonio 1 - Nombre", type: "text" },
      { key: "testimonial_1_role", label: "Testimonio 1 - Rol", type: "text" },
      { key: "testimonial_1_text", label: "Testimonio 1 - Texto", type: "textarea" },
      { key: "testimonial_2_name", label: "Testimonio 2 - Nombre", type: "text" },
      { key: "testimonial_2_role", label: "Testimonio 2 - Rol", type: "text" },
      { key: "testimonial_2_text", label: "Testimonio 2 - Texto", type: "textarea" },
      { key: "testimonial_3_name", label: "Testimonio 3 - Nombre", type: "text" },
      { key: "testimonial_3_role", label: "Testimonio 3 - Rol", type: "text" },
      { key: "testimonial_3_text", label: "Testimonio 3 - Texto", type: "textarea" },
    ],
  },
  cta: {
    label: "📣 Llamada a la Acción",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title_line1", label: "Título línea 1", type: "text" },
      { key: "title_line2", label: "Título línea 2 (color)", type: "text" },
      { key: "subtitle", label: "Subtítulo", type: "textarea" },
      { key: "button_text", label: "Texto del botón", type: "text" },
    ],
  },
  footer: {
    label: "🔗 Footer",
    fields: [
      { key: "phone", label: "Teléfono", type: "text" },
      { key: "phone_hours", label: "Horario de atención", type: "textarea" },
      { key: "email", label: "Email de contacto", type: "text" },
      { key: "copyright", label: "Texto copyright", type: "text" },
    ],
  },
};

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: allContent, isLoading } = useAllSiteContent();
  const updateContent = useUpdateSiteContent();

  const [editData, setEditData] = useState<Record<string, Record<string, string>>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [savingSection, setSavingSection] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  // Populate edit data from DB
  useEffect(() => {
    if (allContent) {
      const data: Record<string, Record<string, string>> = {};
      allContent.forEach((item) => {
        data[item.section_key] = item.content as Record<string, string>;
      });
      setEditData(data);
    }
  }, [allContent]);

  const handleFieldChange = (section: string, field: string, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [section]: { ...(prev[section] || {}), [field]: value },
    }));
  };

  const handleSave = async (sectionKey: string) => {
    setSavingSection(sectionKey);
    try {
      await updateContent.mutateAsync({
        sectionKey,
        content: editData[sectionKey] || {},
      });
      toast.success(`Sección "${SECTIONS_CONFIG[sectionKey]?.label}" guardada correctamente`);
    } catch (err: any) {
      toast.error(err.message || "Error al guardar");
    }
    setSavingSection(null);
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (authLoading || isLoading) {
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
          <p className="text-muted-foreground">Edita los textos, imágenes y botones de toda la página web.</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Type className="w-4 h-4" /> Texto</span>
          <span className="flex items-center gap-1.5"><Image className="w-4 h-4" /> Imagen (URL)</span>
          <span className="flex items-center gap-1.5"><MousePointerClick className="w-4 h-4" /> Botón</span>
        </div>

        <div className="space-y-4">
          {Object.entries(SECTIONS_CONFIG).map(([sectionKey, section]) => {
            const isExpanded = expandedSections[sectionKey];
            const sectionData = editData[sectionKey] || {};
            const hasData = Object.keys(sectionData).length > 0;

            return (
              <div key={sectionKey} className="bg-card rounded-2xl border border-border overflow-hidden">
                {/* Section header */}
                <button
                  onClick={() => toggleSection(sectionKey)}
                  className="w-full flex items-center justify-between p-5 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-foreground">{section.label}</span>
                    {hasData && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </div>
                  {isExpanded ? <ChevronDown className="w-5 h-5 text-muted-foreground" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
                </button>

                {/* Section fields */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-border">
                    <div className="grid md:grid-cols-2 gap-4 pt-5">
                      {section.fields.map((field) => (
                        <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                            {field.label}
                          </Label>
                          {field.type === "textarea" ? (
                            <Textarea
                              value={sectionData[field.key] || ""}
                              onChange={(e) => handleFieldChange(sectionKey, field.key, e.target.value)}
                              rows={3}
                              className="resize-none"
                            />
                          ) : (
                            <Input
                              type={field.type === "url" || field.type === "image" ? "url" : "text"}
                              value={sectionData[field.key] || ""}
                              onChange={(e) => handleFieldChange(sectionKey, field.key, e.target.value)}
                              placeholder={field.type === "image" ? "https://..." : ""}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end mt-5">
                      <Button
                        onClick={() => handleSave(sectionKey)}
                        disabled={savingSection === sectionKey}
                        className="gap-2 rounded-full px-6"
                      >
                        {savingSection === sectionKey ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Guardar sección
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Seed button for first use */}
        {allContent && allContent.length === 0 && (
          <div className="mt-8 bg-card rounded-2xl border border-border p-6 text-center">
            <AlertCircle className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">No hay contenido configurado</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Haz clic en cada sección para agregar el contenido inicial. Los cambios se guardarán en la base de datos.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
