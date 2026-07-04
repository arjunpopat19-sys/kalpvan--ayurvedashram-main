import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, X, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AdminDailyLog() {
  const [records, setRecords] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);

  const [newPatient, setNewPatient] = useState({ name: "", phone: "", address: "" });
  const [patientDialogOpen, setPatientDialogOpen] = useState(false);

  // New Medicine State
  const [newMedicine, setNewMedicine] = useState({ name: "", pricePerUnit: 0 });
  const [medicineDialogOpen, setMedicineDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [recRes, patRes, medRes] = await Promise.all([
        fetch("http://localhost:5000/api/records"),
        fetch("http://localhost:5000/api/patients"),
        fetch("http://localhost:5000/api/medicines")
      ]);
      
      const isJson = (res: Response) => res.headers.get("content-type")?.includes("application/json");
      
      if (!isJson(recRes) || !isJson(patRes) || !isJson(medRes)) {
         throw new Error("Server returned HTML instead of JSON. Please restart your backend server!");
      }
      
      const [recData, patData, medData] = await Promise.all([
        recRes.json(), patRes.json(), medRes.json()
      ]);
      setRecords(Array.isArray(recData) ? recData : []);
      setPatients(Array.isArray(patData) ? patData : []);
      setMedicines(Array.isArray(medData) ? medData : []);
    } catch (err: any) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const createPatient = async () => {
    if (!newPatient.name) return toast.error("Patient name is required");
    try {
      const res = await fetch("http://localhost:5000/api/patients", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatient)
      });
      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
          data = await res.json();
      } else {
          throw new Error("Server returned an invalid response. Please restart your backend server!");
      }
      
      if (!res.ok) throw new Error(data.message || "Failed to create patient");
      
      setPatients([...patients, data]);
      setNewPatient({ name: "", phone: "", address: "" });
      setPatientDialogOpen(false);
      toast.success("Patient created");
      
      if (editing) {
          setEditing({ ...editing, patient: data._id, patientName: data.name });
      }
    } catch (err: any) { toast.error(err.message || "Failed to create patient"); }
  };

  const createMedicine = async () => {
    if (!newMedicine.name) return toast.error("Medicine name is required");
    try {
      const res = await fetch("http://localhost:5000/api/medicines", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMedicine)
      });
      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
          data = await res.json();
      } else {
          throw new Error("Server returned an invalid response. Please restart your backend server!");
      }
      
      if (!res.ok) throw new Error(data.message || "Failed to create medicine");

      setMedicines([...medicines, data]);
      setNewMedicine({ name: "", pricePerUnit: 0 });
      setMedicineDialogOpen(false);
      toast.success("Medicine created");
    } catch (err: any) { toast.error(err.message || "Failed to create medicine"); }
  };

  const emptyRecord = {
    date: new Date().toISOString().split('T')[0],
    patient: "", patientName: "",
    weight: "", disease: "",
    treatmentSuggested: "", treatmentStarted: "",
    treatmentCharge: "", treatmentPaymentReceived: "", treatmentPaymentMode: "",
    medicines: [], medicineDays: "", medicineCharge: "", medicinePaymentReceived: "", medicinePaymentMode: "",
    remark: ""
  };

  const openNew = () => { setEditing({ ...emptyRecord }); setIsNew(true); };
  const openEdit = (r: any) => { 
    setEditing({
      ...r,
      date: new Date(r.date).toISOString().split('T')[0],
      patient: r.patient?._id || r.patient,
      patientName: r.patient?.name || r.patientName,
      medicines: r.medicines ? r.medicines.map((m: any) => ({
          ...m,
          medicine: m.medicine?._id || m.medicine
      })) : []
    }); 
    setIsNew(false); 
  };
  const close = () => { setEditing(null); setIsNew(false); };

  const addMedicineEntry = () => {
    setEditing({
      ...editing,
      medicines: [...editing.medicines, { medicine: "", medicineName: "", days: "", quantity: 1 }]
    });
  };

  const updateMedicineEntry = (index: number, field: string, value: any) => {
    const newMeds = [...editing.medicines];
    newMeds[index][field] = value;
    if (field === "medicine") {
      const m = medicines.find(x => x._id === value);
      if (m) newMeds[index].medicineName = m.name;
    }
    setEditing({ ...editing, medicines: newMeds });
  };

  const removeMedicineEntry = (index: number) => {
    const newMeds = [...editing.medicines];
    newMeds.splice(index, 1);
    setEditing({ ...editing, medicines: newMeds });
  };

  const save = async () => {
    if (!editing.patient) return toast.error("Patient is required");
    
    const cleanedEditing = {
      ...editing,
      medicines: editing.medicines.filter((m: any) => m.medicine && m.medicineName)
    };
    
    try {
      const url = "http://localhost:5000/api/records" + (isNew ? "" : `/${editing._id}`);
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedEditing)
      });
      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
          data = await res.json();
      } else {
          throw new Error("Server returned an invalid response. Please restart your backend server!");
      }
      if (!res.ok) throw new Error(data?.message || "Failed to save");
      toast.success(`Record ${isNew ? "created" : "updated"}!`);
      fetchData();
      close();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this record?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/records/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Record deleted");
      fetchData();
    } catch (err: any) { toast.error(err.message); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Daily Log</h2>
            <p className="text-muted-foreground text-sm">Manage daily patient, treatment and stock records.</p>
        </div>
        <Button onClick={openNew} className="rounded-full shadow-md"><Plus size={16} className="mr-2" /> New Record</Button>
      </div>

      {editing && (
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center pb-4 border-b border-border/50 mb-6">
            <h3 className="font-display text-lg font-semibold">{isNew ? "Create" : "Edit"} Record</h3>
            <Button variant="ghost" size="icon" onClick={close}><X size={18} /></Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2 md:col-span-1">
              <Label>Date</Label>
              <Input type="date" value={editing.date} onChange={e => setEditing({...editing, date: e.target.value})} />
            </div>

            <div className="space-y-2 md:col-span-3 flex flex-col">
              <Label>Patient Name</Label>
              <div className="flex gap-2">
                <div className="flex-1">
                    <Select value={editing.patient || ""} onValueChange={(val) => setEditing({...editing, patient: val})}>
                        <SelectTrigger><SelectValue placeholder="Select Patient" /></SelectTrigger>
                        <SelectContent>
                            {patients.map(p => (
                            <SelectItem key={p._id} value={p._id}>{p.name} {p.phone ? `(${p.phone})` : ''}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Dialog open={patientDialogOpen} onOpenChange={setPatientDialogOpen}>
                  <DialogTrigger asChild><Button variant="outline" size="icon"><Plus size={16}/></Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Add New Patient</DialogTitle></DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2"><Label>Name</Label><Input value={newPatient.name} onChange={e => setNewPatient({...newPatient, name: e.target.value})} /></div>
                      <div className="space-y-2"><Label>Phone (Optional)</Label><Input value={newPatient.phone} onChange={e => setNewPatient({...newPatient, phone: e.target.value})} /></div>
                      <div className="space-y-2"><Label>Address (Optional)</Label><Input value={(newPatient as any).address || ""} onChange={e => setNewPatient({...newPatient, address: e.target.value})} /></div>
                      <Button onClick={createPatient} className="w-full">Save Patient</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Weight</Label>
              <Input value={editing.weight} onChange={e => setEditing({...editing, weight: e.target.value})} placeholder="e.g. 65 kg" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label>Disease</Label>
              <Input value={editing.disease} onChange={e => setEditing({...editing, disease: e.target.value})} placeholder="e.g. Skin Disease" />
            </div>

            <div className="space-y-4 md:col-span-2 bg-muted/20 p-4 rounded-xl border border-border/50">
                <h4 className="font-semibold text-sm text-primary uppercase tracking-wider mb-2">Treatment Details</h4>
                <div className="space-y-2">
                    <Label>Treatment Suggested</Label>
                    <Input value={editing.treatmentSuggested} onChange={e => setEditing({...editing, treatmentSuggested: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label>Treatment Started</Label>
                    <Input value={editing.treatmentStarted} onChange={e => setEditing({...editing, treatmentStarted: e.target.value})} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-2">
                        <Label className="text-xs">Charge (₹)</Label>
                        <Input type="text" className="h-8" value={editing.treatmentCharge} onChange={e => setEditing({...editing, treatmentCharge: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs">Payment (₹)</Label>
                        <Input type="text" className="h-8" value={editing.treatmentPaymentReceived} onChange={e => setEditing({...editing, treatmentPaymentReceived: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs">Mode</Label>
                        <Select value={editing.treatmentPaymentMode} onValueChange={(val) => setEditing({...editing, treatmentPaymentMode: val})}>
                            <SelectTrigger className="h-8"><SelectValue placeholder="Mode" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CASH">CASH</SelectItem>
                                <SelectItem value="GPAY">GPAY</SelectItem>
                                <SelectItem value="CASH-A">CASH-A</SelectItem>
                                <SelectItem value="FREE">FREE</SelectItem>
                                <SelectItem value="PENDING">PENDING</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="space-y-4 md:col-span-2 bg-muted/20 p-4 rounded-xl border border-border/50">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-sm text-primary uppercase tracking-wider">Medicines Dispensed</h4>
                    <div className="flex gap-2">
                        <Dialog open={medicineDialogOpen} onOpenChange={setMedicineDialogOpen}>
                            <DialogTrigger asChild><Button variant="outline" size="sm" className="h-8"><Plus size={14} className="mr-1"/> New Med</Button></DialogTrigger>
                            <DialogContent>
                                <DialogHeader><DialogTitle>Add New Medicine</DialogTitle></DialogHeader>
                                <div className="space-y-4 py-4">
                                <div className="space-y-2"><Label>Medicine Name</Label><Input value={newMedicine.name} onChange={e => setNewMedicine({...newMedicine, name: e.target.value})} /></div>
                                <div className="space-y-2"><Label>Price Per Unit</Label><Input type="number" value={newMedicine.pricePerUnit} onChange={e => setNewMedicine({...newMedicine, pricePerUnit: +e.target.value})} /></div>
                                <Button onClick={createMedicine} className="w-full">Save Medicine</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                
                {editing.medicines.map((m: any, idx: number) => (
                    <div key={idx} className="flex gap-2 items-start border border-border/50 p-2 rounded bg-background">
                        <div className="flex-1 space-y-2">
                            <Select value={m.medicine || ""} onValueChange={(val) => updateMedicineEntry(idx, "medicine", val)}>
                                <SelectTrigger className="h-8"><SelectValue placeholder="Select Medicine..." /></SelectTrigger>
                                <SelectContent>
                                    {medicines.map(med => (<SelectItem key={med._id} value={med._id}>{med.name}</SelectItem>))}
                                </SelectContent>
                            </Select>
                            <Input className="h-8 w-24" type="number" placeholder="Qty" value={m.quantity} onChange={e => updateMedicineEntry(idx, "quantity", +e.target.value)} />
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeMedicineEntry(idx)}><X size={14} /></Button>
                    </div>
                ))}
                <Button variant="secondary" size="sm" onClick={addMedicineEntry} className="w-full text-xs h-8"><Plus size={14} className="mr-1"/> Add Item</Button>

                <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-border/50">
                    <div className="space-y-2">
                        <Label className="text-xs">Med. Days</Label>
                        <Input type="text" className="h-8" placeholder="e.g. 15 Days" value={editing.medicineDays} onChange={e => setEditing({...editing, medicineDays: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs">Med. Charge (₹)</Label>
                        <Input type="text" className="h-8" value={editing.medicineCharge} onChange={e => setEditing({...editing, medicineCharge: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs">Med. Payment (₹)</Label>
                        <Input type="text" className="h-8" value={editing.medicinePaymentReceived} onChange={e => setEditing({...editing, medicinePaymentReceived: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs">Mode</Label>
                        <Select value={editing.medicinePaymentMode} onValueChange={(val) => setEditing({...editing, medicinePaymentMode: val})}>
                            <SelectTrigger className="h-8"><SelectValue placeholder="Mode" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CASH">CASH</SelectItem>
                                <SelectItem value="GPAY">GPAY</SelectItem>
                                <SelectItem value="CASH-A">CASH-A</SelectItem>
                                <SelectItem value="FREE">FREE</SelectItem>
                                <SelectItem value="PENDING">PENDING</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="space-y-2 md:col-span-4">
              <Label>Remark</Label>
              <Input value={editing.remark} onChange={e => setEditing({...editing, remark: e.target.value})} />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6 pt-4 border-t border-border/50">
            <Button onClick={save} className="px-8">{isNew ? "Save Record" : "Update Record"}</Button>
            <Button variant="outline" onClick={close} className="px-8">Cancel</Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
      ) : (
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-x-auto w-full">
            <div className="min-w-max">
                <table className="w-full text-xs md:text-sm">
                    <thead>
                        <tr className="border-b border-border bg-muted/40">
                            <th className="py-3 px-3 text-left font-semibold text-muted-foreground whitespace-nowrap">Month</th>
                            <th className="py-3 px-3 text-left font-semibold text-muted-foreground whitespace-nowrap">Date</th>
                            <th className="py-3 px-3 text-left font-semibold text-muted-foreground whitespace-nowrap">Patient Name</th>
                            <th className="py-3 px-3 text-left font-semibold text-muted-foreground whitespace-nowrap">Weight</th>
                            <th className="py-3 px-3 text-left font-semibold text-muted-foreground whitespace-nowrap">Contact No</th>
                            <th className="py-3 px-3 text-left font-semibold text-muted-foreground whitespace-nowrap">Address</th>
                            <th className="py-3 px-3 text-left font-semibold text-muted-foreground whitespace-nowrap">Disease</th>
                            <th className="py-3 px-3 text-left font-semibold text-muted-foreground whitespace-nowrap">Treatment Suggested</th>
                            <th className="py-3 px-3 text-left font-semibold text-muted-foreground whitespace-nowrap">Treatment Started</th>
                            <th className="py-3 px-3 text-right font-semibold text-muted-foreground whitespace-nowrap">Charge</th>
                            <th className="py-3 px-3 text-right font-semibold text-muted-foreground whitespace-nowrap">Payment</th>
                            <th className="py-3 px-3 text-center font-semibold text-muted-foreground whitespace-nowrap">GPAY / CAS</th>
                            <th className="py-3 px-3 text-left font-semibold text-muted-foreground min-w-[200px]">Medicines</th>
                            <th className="py-3 px-3 text-left font-semibold text-muted-foreground whitespace-nowrap">Medicine Days</th>
                            <th className="py-3 px-3 text-right font-semibold text-muted-foreground whitespace-nowrap">Charge</th>
                            <th className="py-3 px-3 text-right font-semibold text-muted-foreground whitespace-nowrap">Payment</th>
                            <th className="py-3 px-3 text-center font-semibold text-muted-foreground whitespace-nowrap">GPAY / CAS</th>
                            <th className="py-3 px-3 text-left font-semibold text-muted-foreground">Remark</th>
                            <th className="py-3 px-3 text-right font-semibold text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length === 0 ? (
                            <tr><td colSpan={12} className="py-8 text-center text-muted-foreground italic"><FileSpreadsheet className="mx-auto h-8 w-8 mb-2 opacity-20"/>No records found</td></tr>
                        ) : records.map(r => (
                            <tr key={r._id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                                <td className="py-3 px-3 whitespace-nowrap font-medium text-xs uppercase">{new Date(r.date).toLocaleString('default', { month: 'long' })}</td>
                                <td className="py-3 px-3 whitespace-nowrap font-medium">{new Date(r.date).toLocaleDateString('en-GB')}</td>
                                <td className="py-3 px-3 font-semibold text-primary">{r.patient?.name || r.patientName}</td>
                                <td className="py-3 px-3">{r.weight || '-'}</td>
                                <td className="py-3 px-3">{r.patient?.phone || '-'}</td>
                                <td className="py-3 px-3">{r.patient?.address || '-'}</td>
                                <td className="py-3 px-3">{r.disease || '-'}</td>
                                <td className="py-3 px-3">{r.treatmentSuggested}</td>
                                <td className="py-3 px-3">{r.treatmentStarted}</td>
                                <td className="py-3 px-3 text-right font-mono">{r.treatmentCharge || ''}</td>
                                <td className="py-3 px-3 text-right font-mono">{r.treatmentPaymentReceived || ''}</td>
                                <td className="py-3 px-3 text-center text-[10px] font-bold">{r.treatmentPaymentMode}</td>
                                <td className="py-3 px-3">
                                    <ul className="list-disc pl-4 text-xs space-y-1">
                                        {r.medicines?.map((m: any, i: number) => (
                                            <li key={i}><span className="font-medium">{m.medicine?.name || m.medicineName}</span> {m.quantity > 1 ? `- ${m.quantity}` : ''}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="py-3 px-3 text-xs">
                                    {r.medicineDays || '-'}
                                </td>
                                <td className="py-3 px-3 text-right font-mono">{r.medicineCharge || ''}</td>
                                <td className="py-3 px-3 text-right font-mono">{r.medicinePaymentReceived || ''}</td>
                                <td className="py-3 px-3 text-center text-[10px] font-bold">{r.medicinePaymentMode}</td>
                                <td className="py-3 px-3 text-xs text-muted-foreground">{r.remark}</td>
                                <td className="py-3 px-3 text-right whitespace-nowrap">
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(r)}><Pencil size={14} /></Button>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => remove(r._id)}><Trash2 size={14} /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  );
}
