import { useState } from "react";
import { dummyBills, Bill, BillItem } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, FileText, X } from "lucide-react";
import { toast } from "sonner";

const AdminBilling = () => {
  const [bills, setBills] = useState<Bill[]>(dummyBills);
  const [creating, setCreating] = useState(false);
  const [newBill, setNewBill] = useState<Omit<Bill, "id" | "total">>({
    patientName: "", phone: "", date: new Date().toISOString().split("T")[0], items: [],
  });

  const addItem = () => {
    setNewBill(prev => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, rate: 0, amount: 0 }],
    }));
  };

  const updateItem = (idx: number, field: keyof BillItem, value: string | number) => {
    setNewBill(prev => {
      const items = [...prev.items];
      items[idx] = { ...items[idx], [field]: value };
      items[idx].amount = items[idx].quantity * items[idx].rate;
      return { ...prev, items };
    });
  };

  const removeItem = (idx: number) => {
    setNewBill(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));
  };

  const total = newBill.items.reduce((s, item) => s + item.amount, 0);

  const saveBill = () => {
    if (!newBill.patientName || newBill.items.length === 0) {
      toast.error("Add patient name and at least one item");
      return;
    }
    const bill: Bill = { ...newBill, id: Date.now().toString(), total };
    setBills(prev => [bill, ...prev]);
    toast.success("Bill created!");
    setCreating(false);
    setNewBill({ patientName: "", phone: "", date: new Date().toISOString().split("T")[0], items: [] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Billing</h2>
        <Button onClick={() => setCreating(!creating)} className="rounded-full">
          {creating ? <><X size={16} className="mr-1" /> Cancel</> : <><Plus size={16} className="mr-1" /> New Bill</>}
        </Button>
      </div>

      {creating && (
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-6">
          <h3 className="font-display text-lg font-semibold mb-4">Create New Bill</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div><Label>Patient Name</Label><Input value={newBill.patientName} onChange={e => setNewBill({ ...newBill, patientName: e.target.value })} /></div>
            <div><Label>Phone</Label><Input value={newBill.phone} onChange={e => setNewBill({ ...newBill, phone: e.target.value })} /></div>
            <div><Label>Date</Label><Input type="date" value={newBill.date} onChange={e => setNewBill({ ...newBill, date: e.target.value })} /></div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label>Bill Items</Label>
              <Button variant="outline" size="sm" onClick={addItem}><Plus size={14} className="mr-1" /> Add Item</Button>
            </div>
            {newBill.items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 mb-2 items-end">
                <div className="col-span-5">
                  <Input placeholder="Description" value={item.description} onChange={e => updateItem(idx, "description", e.target.value)} />
                </div>
                <div className="col-span-2">
                  <Input type="number" placeholder="Qty" value={item.quantity} onChange={e => updateItem(idx, "quantity", +e.target.value)} />
                </div>
                <div className="col-span-2">
                  <Input type="number" placeholder="Rate" value={item.rate} onChange={e => updateItem(idx, "rate", +e.target.value)} />
                </div>
                <div className="col-span-2 text-right font-medium text-foreground py-2">₹{item.amount}</div>
                <div className="col-span-1">
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeItem(idx)}><Trash2 size={14} /></Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <p className="text-lg font-bold text-foreground">Total: ₹{total.toLocaleString()}</p>
            <Button onClick={saveBill} className="rounded-full">Save Bill</Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {bills.map(bill => (
          <div key={bill.id} className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-foreground">{bill.patientName}</p>
                <p className="text-xs text-muted-foreground">{bill.phone} • {bill.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-primary">₹{bill.total.toLocaleString()}</p>
                <Button variant="outline" size="sm" onClick={() => toast.info("PDF download coming with backend integration")}>
                  <FileText size={14} className="mr-1" /> Invoice
                </Button>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 text-muted-foreground font-medium">Item</th>
                  <th className="text-center py-2 text-muted-foreground font-medium">Qty</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Rate</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bill.items.map((item, i) => (
                  <tr key={i} className="border-b border-border/30">
                    <td className="py-2 text-foreground">{item.description}</td>
                    <td className="py-2 text-center text-muted-foreground">{item.quantity}</td>
                    <td className="py-2 text-right text-muted-foreground">₹{item.rate}</td>
                    <td className="py-2 text-right text-foreground">₹{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBilling;
