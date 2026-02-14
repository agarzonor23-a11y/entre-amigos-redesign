import { useState } from "react";
import {
  useMarketplaceProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  type MarketplaceProduct,
} from "@/hooks/useMarketplaceProducts";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Plus, Loader2, Save, Trash2, Package, Edit2, X, ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES } from "@/data/marketplace-products";

const EMPTY_PRODUCT = {
  name: "",
  description: "",
  price: 0,
  original_price: null as number | null,
  image_url: "",
  category: "general",
  badge: "",
  seller: "",
  location: "",
  stock: 0,
  features: [] as string[],
  free_shipping: false,
  is_active: true,
};

const MarketplaceTab = () => {
  const { data: products, isLoading } = useMarketplaceProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [featuresText, setFeaturesText] = useState("");

  const openNew = () => {
    setEditingId(null);
    setForm(EMPTY_PRODUCT);
    setFeaturesText("");
    setShowForm(true);
  };

  const openEdit = (p: MarketplaceProduct) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      description: p.description || "",
      price: p.price,
      original_price: p.original_price,
      image_url: p.image_url || "",
      category: p.category,
      badge: p.badge || "",
      seller: p.seller || "",
      location: p.location || "",
      stock: p.stock,
      features: p.features || [],
      free_shipping: p.free_shipping,
      is_active: p.is_active,
    });
    setFeaturesText((p.features || []).join(", "));
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }
    const payload = {
      ...form,
      features: featuresText.split(",").map((f) => f.trim()).filter(Boolean),
      original_price: form.original_price || null,
      badge: form.badge || null,
      seller: form.seller || null,
      location: form.location || null,
      image_url: form.image_url || null,
      description: form.description || null,
    };

    try {
      if (editingId) {
        await updateProduct.mutateAsync({ id: editingId, ...payload });
        toast.success("Producto actualizado");
      } else {
        await createProduct.mutateAsync(payload);
        toast.success("Producto creado");
      }
      setShowForm(false);
      setEditingId(null);
    } catch (err: any) {
      toast.error(err.message || "Error al guardar");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Producto eliminado");
    } catch (err: any) {
      toast.error(err.message || "Error al eliminar");
    }
  };

  const formatCOP = (n: number) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground text-sm">
          {products?.length || 0} productos en el marketplace
        </p>
        <Button onClick={openNew} className="gap-2 rounded-full">
          <Plus className="w-4 h-4" /> Nuevo producto
        </Button>
      </div>

      {/* Product Form */}
      {showForm && (
        <div className="bg-card rounded-2xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-foreground">
              {editingId ? "Editar producto" : "Nuevo producto"}
            </h3>
            <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Nombre *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Descripción</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="resize-none" />
            </div>
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Precio (COP) *</Label>
              <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
            </div>
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Precio original (COP)</Label>
              <Input type="number" value={form.original_price || ""} onChange={(e) => setForm({ ...form, original_price: e.target.value ? Number(e.target.value) : null })} placeholder="Opcional" />
            </div>
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Stock *</Label>
              <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
            </div>
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Categoría</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                  <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                ))}
                <option value="general">General</option>
              </select>
            </div>
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">URL de imagen</Label>
              <Input type="url" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Badge</Label>
              <Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Ej: Nuevo, Oferta, Popular" />
            </div>
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Vendedor</Label>
              <Input value={form.seller} onChange={(e) => setForm({ ...form, seller: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Ubicación</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Características (separadas por coma)</Label>
              <Input value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder="Ej: 8GB RAM, 256GB SSD, WiFi 6" />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.free_shipping} onCheckedChange={(v) => setForm({ ...form, free_shipping: v })} />
              <Label className="text-sm">Envío gratis</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
              <Label className="text-sm">Activo (visible)</Label>
            </div>
          </div>

          <div className="flex justify-end mt-5 gap-3">
            <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-full">Cancelar</Button>
            <Button
              onClick={handleSave}
              disabled={createProduct.isPending || updateProduct.isPending}
              className="gap-2 rounded-full px-6"
            >
              {(createProduct.isPending || updateProduct.isPending) ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {editingId ? "Actualizar" : "Crear producto"}
            </Button>
          </div>
        </div>
      )}

      {/* Product list */}
      {!products?.length ? (
        <div className="bg-card rounded-2xl border border-border p-10 text-center">
          <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-bold text-foreground mb-1">Sin productos</h3>
          <p className="text-muted-foreground text-sm">Agrega tu primer producto al marketplace.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="bg-card rounded-2xl border border-border p-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-foreground truncate">{p.name}</h4>
                  {p.badge && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{p.badge}</span>}
                  {!p.is_active && <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Inactivo</span>}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="font-bold text-foreground">{formatCOP(p.price)}</span>
                  <span>Stock: {p.stock}</span>
                  <span>{p.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketplaceTab;
