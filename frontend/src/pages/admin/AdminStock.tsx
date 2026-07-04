import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, X, AlertTriangle, PackagePlus, PackageMinus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

const API = "http://localhost:5000/api/medicines";

const AdminStock = () => {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Restock dialog state
  const [restockTarget, setRestockTarget] = useState<any | null>(null);
  const [restockQty, setRestockQty] = useState("");
  const [restockDialogOpen, setRestockDialogOpen] = useState(false);

  const fetchMedicines = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setMedicines(data);
    } catch {
      toast.error("Failed to load medicines. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMedicines(); }, [fetchMedicines]);

  const emptyMed = { name: "", category: "", description: "", pricePerUnit: "", stockQuantity: "" };
  const openNew = () => { setEditing({ ...emptyMed }); setIsNew(true); };
  const openEdit = (m: any) => { setEditing({ ...m, pricePerUnit: m.pricePerUnit?.toString() || "", stockQuantity: m.stockQuantity?.toString() || "" }); setIsNew(false); };
  const close = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!editing?.name) return toast.error("Medicine name is required");
    try {
      const body = {
        ...editing,
        pricePerUnit: editing.pricePerUnit === "" ? 0 : Number(editing.pricePerUnit),
        stockQuantity: editing.stockQuantity === "" ? 0 : Number(editing.stockQuantity),
      };
      const res = await fetch(isNew ? API : `${API}/${editing._id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save");
      toast.success(isNew ? "Medicine added to stock!" : "Medicine updated!");
      fetchMedicines();
      close();
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this medicine from stock?")) return;
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      toast.success("Medicine deleted");
      fetchMedicines();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const openRestock = (m: any) => {
    setRestockTarget(m);
    setRestockQty("");
    setRestockDialogOpen(true);
  };

  const doRestock = async () => {
    const qty = Number(restockQty);
    if (!qty || qty <= 0) return toast.error("Enter a valid quantity");
    try {
      const res = await fetch(`${API}/${restockTarget._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stockQuantity: (restockTarget.stockQuantity || 0) + qty }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(`Added ${qty} units to ${restockTarget.name}`);
      setRestockDialogOpen(false);
      fetchMedicines();
    } catch {
      toast.error("Failed to restock");
    }
  };

  const lowStock = medicines.filter(m => (m.stockQuantity || 0) <= 10);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Stock Management</h2>
          <p className="text-muted-foreground text-sm">Add medicines to stock. Stock auto-decreases when dispensed to patients.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={fetchMedicines} title="Refresh">
            <RefreshCw size={16} />
          </Button>
          <Button onClick={openNew} className="rounded-full shadow-md">
            <Plus size={16} className="mr-2" /> Add Medicine
          </Button>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-amber-600 text-sm">Low Stock Warning</p>
            <p className="text-sm text-muted-foreground">
              {lowStock.map(m => `${m.name} (${m.stockQuantity || 0} left)`).join(" • ")}
            </p>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {editing && (
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-border/50 mb-5">
            <h3 className="font-display text-lg font-semibold">{isNew ? "Add New Medicine to Stock" : "Edit Medicine"}</h3>
            <Button variant="ghost" size="icon" onClick={close}><X size={18} /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label>Medicine Name *</Label>
              <Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="e.g. CLOTONE WITH IRON-3" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} placeholder="e.g. Syrup, Tablet" />
            </div>
            <div className="space-y-2">
              <Label>Initial Stock Quantity</Label>
              <Input type="text" value={editing.stockQuantity} onChange={e => setEditing({ ...editing, stockQuantity: e.target.value })} placeholder="e.g. 100" />
            </div>
            <div className="space-y-2">
              <Label>Price Per Unit (₹)</Label>
              <Input type="text" value={editing.pricePerUnit} onChange={e => setEditing({ ...editing, pricePerUnit: e.target.value })} placeholder="e.g. 150" />
            </div>
            <div className="space-y-2 md:col-span-3">
              <Label>Description (Optional)</Label>
              <Input value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} placeholder="Any notes about this medicine..." />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <Button onClick={save} className="px-8">{isNew ? "Add to Stock" : "Update"}</Button>
            <Button variant="outline" onClick={close} className="px-8">Cancel</Button>
          </div>
        </div>
      )}

      {/* Restock Dialog */}
      <Dialog open={restockDialogOpen} onOpenChange={setRestockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restock: {restockTarget?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">
              Current Stock: <span className="font-bold text-foreground">{restockTarget?.stockQuantity || 0} units</span>
            </p>
            <div className="space-y-2">
              <Label>Quantity to Add</Label>
              <Input type="number" value={restockQty} onChange={e => setRestockQty(e.target.value)} placeholder="e.g. 50" autoFocus />
            </div>
            <Button onClick={doRestock} className="w-full">
              <PackagePlus size={16} className="mr-2" /> Add to Stock
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Stock Table */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Medicine Name</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold hidden md:table-cell">Category</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-semibold">Stock</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-semibold hidden md:table-cell">Price/Unit</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.length === 0 ? (
                <tr><td colSpan={5} className="py-10 text-center text-muted-foreground italic">No medicines in stock. Add your first medicine!</td></tr>
              ) : (
                medicines.map(m => {
                  const stock = m.stockQuantity || 0;
                  const isLow = stock <= 10;
                  const isOut = stock === 0;
                  return (
                    <tr key={m._id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">
                        <div className="flex items-center gap-2">
                          {isLow && <AlertTriangle size={14} className="text-amber-500 shrink-0" />}
                          {m.name}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{m.category || '—'}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          isOut ? 'bg-red-100 text-red-700' :
                          isLow ? 'bg-amber-100 text-amber-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {isOut ? 'OUT OF STOCK' : `${stock} units`}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-muted-foreground hidden md:table-cell">
                        {m.pricePerUnit ? `₹${m.pricePerUnit}` : '—'}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <Button variant="outline" size="sm" className="h-7 mr-1 text-xs" onClick={() => openRestock(m)}>
                          <PackagePlus size={12} className="mr-1" /> Restock
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(m)}>
                          <Pencil size={13} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => remove(m._id)}>
                          <Trash2 size={13} />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminStock;
