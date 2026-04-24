import { useState, useEffect, Fragment } from "react";
import { Treatment, TreatmentProcessStep } from "@/data/treatments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, X, PlayCircle } from "lucide-react";
import { toast } from "sonner";
import { useTreatments } from "@/hooks/useTreatments";

const AdminTreatments = () => {
  const { treatments, loading, refetch } = useTreatments();
  const [list, setList] = useState<Treatment[]>([]);
  const [editing, setEditing] = useState<Treatment | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setList(treatments);
  }, [treatments]);

  const emptyTreatment: Treatment = {
    treatmentId: "", title: "", shortDescription: "", description: "",
    benefits: [], process: [], duration: "", image: "", category: "", videoUrl: "",
    gallery: [], isMainCategory: false
  };

  const openNew = () => { setEditing({ ...emptyTreatment, treatmentId: `t-${Date.now()}` }); setIsNew(true); };
  const openEdit = (t: Treatment) => { 
    if (editing?._id === t._id) {
      setEditing(null);
    } else {
      setEditing({ ...t }); 
      setIsNew(false); 
    }
  };
  const close = () => { setEditing(null); setIsNew(false); };

  const handleProcessChange = (index: number, field: keyof TreatmentProcessStep, value: string) => {
    if (!editing) return;
    const newProcess = [...editing.process];
    newProcess[index] = { ...newProcess[index], [field]: value };
    setEditing({ ...editing, process: newProcess });
  };

  const addProcessStep = () => {
    if (!editing) return;
    setEditing({ ...editing, process: [...editing.process, { name: "", description: "", image: "" }] });
  };

  const removeProcessStep = (index: number) => {
    if (!editing) return;
    const newProcess = [...editing.process];
    newProcess.splice(index, 1);
    setEditing({ ...editing, process: newProcess });
  };

  const save = async () => {
    if (!editing?.title) { toast.error("Title is required"); return; }

    try {
      if (isNew) {
        const res = await fetch("http://localhost:5000/api/treatments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing)
        });
        if (!res.ok) throw new Error("Failed to create");
        toast.success("Treatment added!");
      } else {
        const res = await fetch(`http://localhost:5000/api/treatments/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing)
        });
        if (!res.ok) throw new Error("Failed to update");
        toast.success("Treatment updated!");
      }
      refetch();
      close();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Are you sure you want to delete this treatment?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/treatments/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Treatment deleted!");
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const renderForm = () => {
    if (!editing) return null;
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center pb-4 border-b">
          <h3 className="font-display text-xl font-bold text-primary">{isNew ? "Create New" : "Update"} Treatment</h3>
          <Button variant="ghost" size="icon" onClick={close} className="rounded-full hover:bg-muted-foreground/10"><X size={20} /></Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Treatment ID</Label>
            <Input value={editing.treatmentId} disabled={!isNew} className="bg-muted/50" onChange={e => setEditing({ ...editing, treatmentId: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Title</Label>
            <Input value={editing.title} placeholder="e.g. Abhyanga Massage" onChange={e => setEditing({ ...editing, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Category</Label>
            <Input value={editing.category} placeholder="e.g. PANCHKARMA" onChange={e => setEditing({ ...editing, category: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Duration</Label>
            <Input value={editing.duration} placeholder="e.g. 60 min" onChange={e => setEditing({ ...editing, duration: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Main Image URL</Label>
            <Input value={editing.image} placeholder="https://unsplash.com/..." onChange={e => setEditing({ ...editing, image: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold flex items-center gap-1"><PlayCircle size={14} /> Video URL</Label>
            <Input value={editing.videoUrl || ""} placeholder="YouTube URL" onChange={e => setEditing({ ...editing, videoUrl: e.target.value })} />
          </div>

          <div className="flex items-center space-x-3 bg-primary/5 p-4 rounded-lg border border-primary/10">
            <input 
              type="checkbox" 
              id="isMainCategory" 
              checked={editing.isMainCategory || false} 
              onChange={e => setEditing({ ...editing, isMainCategory: e.target.checked })}
              className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
            />
            <Label htmlFor="isMainCategory" className="cursor-pointer font-medium">Feature on Homepage</Label>
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-semibold">Short Description</Label>
            <Textarea value={editing.shortDescription} placeholder="A brief summary for the cards..." onChange={e => setEditing({ ...editing, shortDescription: e.target.value })} />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-semibold">Gallery (comma separated URLs)</Label>
            <Input value={(editing.gallery || []).join(", ")} placeholder="url1, url2, url3" onChange={e => setEditing({ ...editing, gallery: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-semibold">Full Treatment Description</Label>
            <Textarea rows={6} value={editing.description} placeholder="Provide deep details about the therapy..." onChange={e => setEditing({ ...editing, description: e.target.value })} />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-semibold">Key Benefits (comma separated)</Label>
            <Input value={(editing.benefits || []).join(", ")} placeholder="Relaxation, Pain Relief, Detox..." onChange={e => setEditing({ ...editing, benefits: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} />
          </div>

          <div className="md:col-span-2 mt-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-lg font-bold">Treatment Steps</Label>
              <Button type="button" variant="outline" size="sm" onClick={addProcessStep} className="rounded-full shadow-sm">
                <Plus size={16} className="mr-1" /> Add Phase
              </Button>
            </div>
            <div className="space-y-4">
              {editing.process.map((step, idx) => (
                <div key={idx} className="p-5 border border-border rounded-xl relative bg-muted/30 group transition-all hover:border-primary/30">
                  <Button type="button" variant="ghost" size="icon" className="absolute top-3 right-3 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeProcessStep(idx)}>
                    <Trash2 size={16} />
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <Label className="text-xs font-bold uppercase text-muted-foreground">Phase Name</Label>
                      <Input value={step.name} placeholder="e.g. Preparation" onChange={e => handleProcessChange(idx, "name", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-bold uppercase text-muted-foreground">Illustration URL</Label>
                      <Input value={step.image || ""} placeholder="Image URL (Optional)" onChange={e => handleProcessChange(idx, "image", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-bold uppercase text-muted-foreground">Phase Description</Label>
                    <Textarea rows={2} value={step.description} placeholder="Describe this step..." onChange={e => handleProcessChange(idx, "description", e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mt-8 pt-6 border-t">
          <Button onClick={save} size="lg" className="rounded-xl px-8 shadow-lg shadow-primary/20">
            {isNew ? "Create Treatment" : "Update Treatment"}
          </Button>
          <Button variant="outline" onClick={close} size="lg" className="rounded-xl px-8">
            Dismiss
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Manage Treatments</h2>
        <Button onClick={openNew} className="rounded-full"><Plus size={16} className="mr-1" /> Add Treatment</Button>
      </div>

      {/* Add New Treatment Form (Stays at top for easy access) */}
      {editing && isNew && (
        <div className="bg-card rounded-xl p-6 shadow-sm border-2 border-primary/20 mb-6 animate-in slide-in-from-top duration-300">
          {renderForm()}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-muted-foreground">Loading treatments...</span>
        </div>
      ) : (
        <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold uppercase tracking-wider">Treatment</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left py-4 px-6 text-muted-foreground font-semibold uppercase tracking-wider hidden md:table-cell">Duration</th>
                <th className="text-right py-4 px-6 text-muted-foreground font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr><td colSpan={4} className="p-12 text-center text-muted-foreground italic">No treatments available. Start by adding one above.</td></tr>
              ) : list.map(t => (
                <Fragment key={t._id || t.treatmentId}>
                  <tr className={`border-b border-border/50 transition-colors hover:bg-muted/30 ${editing && editing._id === t._id ? 'bg-primary/5' : ''}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-semibold text-base">{t.title}</span>
                        {t.isMainCategory && (
                          <span className="bg-primary/20 text-primary text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest border border-primary/30">Main</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground hidden md:table-cell">
                      <span className="bg-secondary px-2 py-1 rounded-md text-xs">{t.category}</span>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground hidden md:table-cell font-mono">{t.duration}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant={editing?._id === t._id ? "default" : "ghost"} 
                          size="sm" 
                          className="rounded-full h-8 w-8 p-0" 
                          onClick={() => openEdit(t)}
                          title="Update Treatment"
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 rounded-full" 
                          onClick={() => t._id && remove(t._id)}
                          title="Delete Treatment"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Inline Update Form - Appears right after the selected treatment */}
                  {editing && !isNew && editing._id === t._id && (
                    <tr className="bg-muted/20 border-b border-primary/20 shadow-inner">
                      <td colSpan={4} className="p-0">
                        <div className="p-8 border-x-4 border-primary/30 animate-in slide-in-from-left duration-300">
                          {renderForm()}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTreatments;
