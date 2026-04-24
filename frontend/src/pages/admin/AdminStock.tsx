import { useState } from "react";
import { dummyMedicines, Medicine } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, X, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const AdminStock = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(dummyMedicines);
  const [editing, setEditing] = useState<Medicine | null>(null);
  const [isNew, setIsNew] = useState(false);

  const empty: Medicine = { id: "", name: "", category: "", quantity: 0, unit: "bottles", pricePerUnit: 0 };

  const openNew = () => { setEditing({ ...empty, id: Date.now().toString() }); setIsNew(true); };
  const openEdit = (m: Medicine) => { setEditing({ ...m }); setIsNew(false); };
  const close = () => { setEditing(null); setIsNew(false); };

  const save = () => {
    if (!editing?.name) { toast.error("Name is required"); return; }
    if (isNew) {
      setMedicines(prev => [...prev, editing]);
      toast.success("Medicine added!");
    } else {
      setMedicines(prev => prev.map(m => m.id === editing.id ? editing : m));
      toast.success("Medicine updated!");
    }
    close();
  };

  const remove = (id: string) => {
    setMedicines(prev => prev.filter(m => m.id !== id));
    toast.success("Medicine deleted!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Stock Management</h2>
        <Button onClick={openNew} className="rounded-full"><Plus size={16} className="mr-1" /> Add Medicine</Button>
      </div>

      {editing && (
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display text-lg font-semibold">{isNew ? "Add" : "Edit"} Medicine</h3>
            <Button variant="ghost" size="icon" onClick={close}><X size={18} /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><Label>Name</Label><Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></div>
            <div><Label>Category</Label><Input value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} /></div>
            <div><Label>Unit</Label><Input value={editing.unit} onChange={e => setEditing({ ...editing, unit: e.target.value })} /></div>
            <div><Label>Quantity</Label><Input type="number" value={editing.quantity} onChange={e => setEditing({ ...editing, quantity: +e.target.value })} /></div>
            <div><Label>Price per Unit (₹)</Label><Input type="number" value={editing.pricePerUnit} onChange={e => setEditing({ ...editing, pricePerUnit: +e.target.value })} /></div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={save} className="rounded-full">Save</Button>
            <Button variant="outline" onClick={close} className="rounded-full">Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Medicine</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">Category</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Qty</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">Price/Unit</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map(m => (
              <tr key={m.id} className="border-b border-border/50 hover:bg-muted/20">
                <td className="py-3 px-4 text-foreground font-medium flex items-center gap-2">
                  {m.quantity < 35 && <AlertTriangle size={14} className="text-amber-500" />}
                  {m.name}
                </td>
                <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{m.category}</td>
                <td className="py-3 px-4 text-foreground">{m.quantity} {m.unit}</td>
                <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">₹{m.pricePerUnit}</td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(m)}><Pencil size={15} /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => remove(m.id)}><Trash2 size={15} /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStock;
