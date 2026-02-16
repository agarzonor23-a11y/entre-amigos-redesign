import { useState, useEffect } from "react";
import { useAllSiteContent, useUpdateSiteContent } from "@/hooks/useSiteContent";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Save, Loader2, ChevronDown, ChevronRight, CheckCircle2, AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const DEFAULT_CONTENT: Record<string, Record<string, string>> = {
  hero: {
    badge: "Fintech de crédito digital 🇨🇴",
    title_line1: "Crédito para",
    title_line2: "tu negocio",
    description: "Accede a créditos digitales diseñados para microempresarios en Colombia.",
    description_bold: "Sin cobros por solicitud ni desembolso.",
    cta_primary: "Solicita tu crédito",
    cta_secondary: "Simula tu crédito",
    feature_1: "100% seguro",
    feature_2: "Rápido y fácil",
    feature_3: "Sin cobros ocultos",
  },
  stats: {
    stat_1_value: "+5.000", stat_1_label: "Créditos otorgados",
    stat_2_value: "$15.000M", stat_2_label: "Desembolsados",
    stat_3_value: "98%", stat_3_label: "Satisfacción",
    stat_4_value: "24h", stat_4_label: "Tiempo de respuesta",
  },
  products: {
    badge: "Productos", title: "Soluciones de crédito", title_gradient: "para todos",
    subtitle: "Encuentra el producto ideal para tu necesidad",
    product_1_title: "Microcrédito", product_1_desc: "Para independientes y microempresarios",
    product_2_title: "Productivo Plus", product_2_desc: "Capital de trabajo para tu negocio",
    product_3_title: "Impulsacrédito", product_3_desc: "Crédito rotativo flexible",
    product_4_title: "Crédito de consumo", product_4_desc: "Para empleados y particulares",
  },
  transparency: {
    badge: "Transparencia", title: "Comprometidos con", title_gradient: "la confianza",
    subtitle: "Operamos bajo los más altos estándares de transparencia",
    item_1_title: "Regulados", item_1_desc: "Supervisados por la Supersolidaria",
    item_2_title: "Sin letra menuda", item_2_desc: "Condiciones claras desde el inicio",
    item_3_title: "Tasas justas", item_3_desc: "Las mejores tasas del mercado",
    item_4_title: "Protección de datos", item_4_desc: "Tu información está segura",
    item_5_title: "Informes públicos", item_5_desc: "Reportes financieros disponibles",
    item_6_title: "Atención humana", item_6_desc: "Soporte personalizado siempre",
  },
  how_it_works: {
    badge: "Proceso", title: "¿Cómo funciona?", subtitle: "4 pasos sencillos",
    step_1_title: "Regístrate", step_1_desc: "Crea tu cuenta en minutos",
    step_2_title: "Solicita", step_2_desc: "Llena el formulario de solicitud",
    step_3_title: "Aprobación", step_3_desc: "Revisamos tu solicitud rápidamente",
    step_4_title: "Desembolso", step_4_desc: "Recibe el dinero en tu cuenta",
  },
  testimonials: {
    badge: "Testimonios", title: "Lo que dicen", title_gradient: "nuestros clientes",
    testimonial_1_name: "María García", testimonial_1_role: "Emprendedora", testimonial_1_text: "Excelente servicio, rápido y confiable.",
    testimonial_2_name: "Carlos López", testimonial_2_role: "Comerciante", testimonial_2_text: "Las mejores tasas del mercado.",
    testimonial_3_name: "Ana Martínez", testimonial_3_role: "Independiente", testimonial_3_text: "Proceso 100% digital y sin complicaciones.",
  },
  cta: {
    badge: "Empieza hoy", title_line1: "¿Listo para impulsar", title_line2: "tu negocio?",
    subtitle: "Solicita tu crédito en minutos y recibe respuesta rápida.",
    button_text: "Solicitar crédito ahora",
  },
  footer: {
    phone: "601 234 5678", phone_hours: "Lunes a viernes 8am - 6pm",
    email: "contacto@entreamigos.co", copyright: "© 2026 Entre Amigos. Todos los derechos reservados.",
  },
};

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

const SiteContentTab = () => {
  const { data: allContent, isLoading } = useAllSiteContent();
  const updateContent = useUpdateSiteContent();
  const [editData, setEditData] = useState<Record<string, Record<string, string>>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [savingSection, setSavingSection] = useState<string | null>(null);

  useEffect(() => {
    // Merge defaults with DB content
    const data: Record<string, Record<string, string>> = {};
    Object.entries(DEFAULT_CONTENT).forEach(([key, defaults]) => {
      const dbContent = allContent?.find((item) => item.section_key === key);
      data[key] = { ...defaults, ...(dbContent?.content as Record<string, string> || {}) };
    });
    setEditData(data);
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
      toast.success(`Sección "${SECTIONS_CONFIG[sectionKey]?.label}" guardada`);
    } catch (err: any) {
      toast.error(err.message || "Error al guardar");
    }
    setSavingSection(null);
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(SECTIONS_CONFIG).map(([sectionKey, section]) => {
        const isExpanded = expandedSections[sectionKey];
        const sectionData = editData[sectionKey] || {};

        return (
          <div key={sectionKey} className="bg-card rounded-2xl border border-border overflow-hidden">
            <button
              onClick={() => toggleSection(sectionKey)}
              className="w-full flex items-center justify-between p-5 hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-foreground">{section.label}</span>
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              {isExpanded ? <ChevronDown className="w-5 h-5 text-muted-foreground" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
            </button>

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
  );
};

export default SiteContentTab;
