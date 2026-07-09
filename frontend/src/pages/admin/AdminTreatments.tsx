import { useState, useEffect, Fragment } from "react";
import { Treatment, TreatmentProcessStep } from "@/data/treatments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, X, PlayCircle } from "lucide-react";
import { toast } from "sonner";
import { useTreatments } from "@/hooks/useTreatments";
import { API_BASE_URL } from "@/lib/api";

const CATEGORY_ORDER = [
  "SKIN & ADVANCED FACIAL TREATMENTS",
  "HAIR & SCALP TREATMENTS",
  "PANCHKARMA (MAIN DETOX THERAPIES)",
  "OTHER PANCHKARMA & SUPPORTIVE THERAPIES",
  "WEIGHT LOSS & BODY DETOX",
  "WELLNESS, WOMEN & IMMUNITY CARE",
];

const AdminTreatments = () => {
  const { treatments, loading, refetch } = useTreatments();
  const [list, setList] = useState<Treatment[]>([]);
  const [editing, setEditing] = useState<Treatment | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [editLang, setEditLang] = useState<'en' | 'hi'>('en');
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  // Dynamically extract all unique categories
  const dynamicCategories = Array.from(new Set([
    ...CATEGORY_ORDER,
    ...treatments.map(t => t.category)
  ])).filter(Boolean);

  useEffect(() => {
    // Sort treatments: First by main category's sequence, then by CATEGORY_ORDER, then main categories first, then by sequence
    const sorted = [...treatments].sort((a, b) => {
      // Find the main category for 'a' and 'b' to get their category-level sequence
      const mainA = treatments.find(t => t.category === a.category && t.isMainCategory);
      const mainB = treatments.find(t => t.category === b.category && t.isMainCategory);
      
      const catSeqA = mainA?.sequence || 999;
      const catSeqB = mainB?.sequence || 999;

      // Sort by Category Sequence first
      if (catSeqA !== catSeqB) {
         return catSeqA - catSeqB;
      }

      // If category sequence is the same, sort by CATEGORY_ORDER
      const idxA = CATEGORY_ORDER.indexOf(a.category);
      const idxB = CATEGORY_ORDER.indexOf(b.category);
      
      if (idxA !== idxB) {
        if (idxA === -1) return 1;
        if (idxB === -1) return -1;
        return idxA - idxB;
      }
      
      // If same category, ensure Main Category is always at the top
      if (a.isMainCategory !== b.isMainCategory) {
        return a.isMainCategory ? -1 : 1;
      }
      
      // If same category and both are main or both are sub, sort by sequence number
      const seqA = a.sequence || 999;
      const seqB = b.sequence || 999;
      if (seqA !== seqB) return seqA - seqB;
      
      // Fallback to alphabetical title if sequence is the same
      return (a.title || "").localeCompare(b.title || "");
    });
    setList(sorted);
  }, [treatments]);

  const emptyTreatment: Treatment = {
    treatmentId: "", title: "", shortDescription: "", description: "",
    benefits: [], 
    process: [
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" }
    ], 
    duration: "", image: "", category: "", videoUrl: "",
    gallery: [], isMainCategory: false, sequence: 0
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
    const newEditing = { ...editing, process: [...editing.process, { name: "", description: "", image: "" }] };
    if (newEditing.processHi && newEditing.processHi.length > 0) {
      newEditing.processHi = [...newEditing.processHi, { name: "", description: "" }];
    }
    setEditing(newEditing);
  };

  const removeProcessStep = (index: number) => {
    if (!editing) return;
    const newProcess = [...editing.process];
    newProcess.splice(index, 1);
    
    const newEditing = { ...editing, process: newProcess };
    if (newEditing.processHi && newEditing.processHi.length > 0) {
      const newProcessHi = [...newEditing.processHi];
      newProcessHi.splice(index, 1);
      newEditing.processHi = newProcessHi;
    }
    setEditing(newEditing);
  };

  const save = async () => {
    if (!editing?.title) { toast.error("Title is required"); return; }
    if (!editing?.category) { toast.error("Please select a Category from the dropdown"); return; }

    try {
      const payload = {
        ...editing,
        gallery: (editing.gallery || [])
          .flatMap(s => s.split(/[\n,]+/))
          .map(s => s.trim())
          .filter(Boolean)
      };

      if (isNew) {
        const res = await fetch(`${API_BASE_URL}/api/treatments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to create");
        }
        toast.success("Treatment added!");
      } else {
        const res = await fetch(`${API_BASE_URL}/api/treatments/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to update");
        }
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
      const res = await fetch(`${API_BASE_URL}/api/treatments/${id}`, {
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b gap-4">
          <h3 className="font-display text-xl font-bold text-primary">{isNew ? "Create New" : "Update"} Treatment</h3>
          <div className="flex items-center gap-4">
            <div className="flex bg-muted rounded-full p-1 border border-border">
              <button 
                type="button"
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${editLang === 'en' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setEditLang('en')}
              >
                English
              </button>
              <button 
                type="button"
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${editLang === 'hi' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setEditLang('hi')}
              >
                Hindi (हिन्दी)
              </button>
            </div>
            <Button variant="ghost" size="icon" onClick={close} className="rounded-full hover:bg-muted-foreground/10"><X size={20} /></Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Treatment ID</Label>
            <Input value={editing.treatmentId} disabled={!isNew} className="bg-muted/50" onChange={e => setEditing({ ...editing, treatmentId: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Title</Label>
            <Input 
              value={editLang === 'en' ? editing.title : (editing.titleHi || "")} 
              placeholder={editLang === 'en' ? "e.g. Abhyanga Massage" : "उदा. अभ्यंग मालिश"} 
              onChange={e => editLang === 'en' 
                ? setEditing({ ...editing, title: e.target.value }) 
                : setEditing({ ...editing, titleHi: e.target.value })} 
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold flex justify-between">
              Category
              {isCustomCategory && (
                <button type="button" onClick={() => { setIsCustomCategory(false); setEditing({ ...editing, category: "" }); }} className="text-xs text-primary hover:underline">
                  Cancel Custom
                </button>
              )}
            </Label>
            {isCustomCategory ? (
              <Input 
                value={editing.category} 
                placeholder="Enter custom category name..." 
                onChange={e => setEditing({ ...editing, category: e.target.value.toUpperCase() })} 
                autoFocus
              />
            ) : (
              <select
                value={dynamicCategories.includes(editing.category) ? editing.category : ""}
                onChange={e => {
                  if (e.target.value === "__CUSTOM__") {
                    setIsCustomCategory(true);
                    setEditing({ ...editing, category: "" });
                  } else {
                    setEditing({ ...editing, category: e.target.value });
                  }
                }}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled>Select a Category...</option>
                {dynamicCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="__CUSTOM__" className="font-bold text-primary">+ Add Custom Category...</option>
              </select>
            )}
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
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-primary">Display Sequence</Label>
            <select
              value={editing.sequence || 0}
              onChange={e => setEditing({ ...editing, sequence: Number(e.target.value) })}
              className="flex h-10 w-full rounded-md border border-primary/50 bg-primary/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value={0}>Unassigned (Alphabetical)</option>
              {(() => {
                const scopeTreatments = treatments.filter(t => 
                  t.isMainCategory === (editing.isMainCategory || false) && 
                  (editing.isMainCategory ? true : t.category === editing.category)
                );
                const maxSeq = Math.max(15, scopeTreatments.length + 2);
                const taken = scopeTreatments
                  .filter(t => t.treatmentId !== editing.treatmentId && t.sequence && t.sequence > 0)
                  .map(t => t.sequence);
                
                const opts = [];
                for (let i = 1; i <= maxSeq; i++) {
                  if (!taken.includes(i)) opts.push(i);
                }
                
                return opts.map(num => (
                  <option key={num} value={num}>Position {num}</option>
                ));
              })()}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 bg-primary/5 p-4 rounded-lg border border-primary/10">
              <input 
                type="checkbox" 
                id="isFeatured" 
                checked={editing.isFeatured || false} 
                onChange={e => setEditing({ ...editing, isFeatured: e.target.checked })}
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <Label htmlFor="isFeatured" className="cursor-pointer font-medium">Feature on Homepage</Label>
            </div>

            <div className="flex items-center space-x-3 bg-primary/5 p-4 rounded-lg border border-primary/10">
              <input 
                type="checkbox" 
                id="isMainCategory" 
                checked={editing.isMainCategory || false} 
                onChange={e => setEditing({ ...editing, isMainCategory: e.target.checked })}
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <Label htmlFor="isMainCategory" className="cursor-pointer font-medium text-xs">Set as MAIN Category Banner (Do NOT check for sub-treatments)</Label>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-semibold">Short Description</Label>
            <Textarea 
              value={editLang === 'en' ? editing.shortDescription : (editing.shortDescriptionHi || "")} 
              placeholder="A brief summary for the cards..." 
              onChange={e => editLang === 'en' 
                ? setEditing({ ...editing, shortDescription: e.target.value })
                : setEditing({ ...editing, shortDescriptionHi: e.target.value })} 
            />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-semibold">Gallery (one URL per line)</Label>
            <Textarea 
              value={(editing.gallery || []).join("\n")} 
              placeholder="https://image1.jpg&#10;https://image2.jpg" 
              onChange={e => setEditing({ ...editing, gallery: e.target.value.split("\n") })} 
              rows={3}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-semibold">Full Treatment Description</Label>
            <Textarea 
              rows={6} 
              value={editLang === 'en' ? editing.description : (editing.descriptionHi || "")} 
              placeholder="Provide deep details about the therapy..." 
              onChange={e => editLang === 'en' 
                ? setEditing({ ...editing, description: e.target.value })
                : setEditing({ ...editing, descriptionHi: e.target.value })} 
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-semibold">Key Benefits (comma separated)</Label>
            <Input 
              value={editLang === 'en' ? (editing.benefits || []).join(", ") : (editing.benefitsHi || []).join(", ")} 
              placeholder="Relaxation, Pain Relief, Detox..." 
              onChange={e => {
                const arr = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                if (editLang === 'en') setEditing({ ...editing, benefits: arr });
                else setEditing({ ...editing, benefitsHi: arr });
              }} 
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-semibold">Who Can Benefit (comma separated)</Label>
            <Input 
              value={editLang === 'en' ? (editing.whoCanBenefit || []).join(", ") : (editing.whoCanBenefitHi || []).join(", ")} 
              placeholder="Acne, Fine Lines, Dull Skin..." 
              onChange={e => {
                const arr = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                if (editLang === 'en') setEditing({ ...editing, whoCanBenefit: arr });
                else setEditing({ ...editing, whoCanBenefitHi: arr });
              }} 
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-semibold">Why Choose Us (comma separated)</Label>
            <Input 
              value={editLang === 'en' ? (editing.whyChooseUs || []).join(", ") : (editing.whyChooseUsHi || []).join(", ")} 
              placeholder="Experienced Doctors, Herbal Treatments..." 
              onChange={e => {
                const arr = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                if (editLang === 'en') setEditing({ ...editing, whyChooseUs: arr });
                else setEditing({ ...editing, whyChooseUsHi: arr });
              }} 
            />
          </div>

          <div className="md:col-span-2 mt-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-lg font-bold">Treatment Steps</Label>
              <Button type="button" variant="outline" size="sm" onClick={addProcessStep} className="rounded-full shadow-sm">
                <Plus size={16} className="mr-1" /> Add Phase
              </Button>
            </div>
            <div className="space-y-4">
              {(() => {
                // Ensure processHi exists if editing in Hindi, or fallback to english array length
                const processArr = editLang === 'en' ? editing.process : (editing.processHi?.length > 0 ? editing.processHi : editing.process.map(() => ({ name: "", description: "" })));
                return processArr.map((step, idx) => (
                  <div key={idx} className="p-5 border border-border rounded-xl relative bg-muted/30 group transition-all hover:border-primary/30">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-3 right-3 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeProcessStep(idx)}>
                      <Trash2 size={16} />
                    </Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-1">
                        <Label className="text-xs font-bold uppercase text-muted-foreground">Phase Name</Label>
                        <Input 
                          value={step.name || ""} 
                          placeholder="e.g. Preparation" 
                          onChange={e => {
                            if (editLang === 'en') {
                              handleProcessChange(idx, "name", e.target.value);
                            } else {
                              const newProcessHi = [...(editing.processHi?.length > 0 ? editing.processHi : editing.process.map(() => ({ name: "", description: "" })))];
                              newProcessHi[idx] = { ...newProcessHi[idx], name: e.target.value };
                              setEditing({ ...editing, processHi: newProcessHi });
                            }
                          }} 
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-bold uppercase text-muted-foreground">Illustration URL</Label>
                        <Input 
                          value={editLang === 'en' ? (editing.process[idx]?.image || "") : (editing.process[idx]?.image || "")} 
                          disabled={editLang === 'hi'}
                          placeholder={editLang === 'hi' ? "(Switch to English to edit image)" : "Image URL (Optional)"} 
                          onChange={e => handleProcessChange(idx, "image", e.target.value)} 
                        />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-bold uppercase text-muted-foreground">Phase Description</Label>
                    <Textarea 
                      rows={2} 
                      value={step.description || ""} 
                      placeholder="Describe this step..." 
                      onChange={e => {
                        if (editLang === 'en') {
                          handleProcessChange(idx, "description", e.target.value);
                        } else {
                          const newProcessHi = [...(editing.processHi?.length > 0 ? editing.processHi : editing.process.map(() => ({ name: "", description: "" })))];
                          newProcessHi[idx] = { ...newProcessHi[idx], description: e.target.value };
                          setEditing({ ...editing, processHi: newProcessHi });
                        }
                      }} 
                    />
                  </div>
                </div>
              ));
            })()}
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
                <th className="text-center py-4 px-6 text-muted-foreground font-semibold uppercase tracking-wider">Order</th>
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
                    <td className="py-4 px-6 text-center text-foreground font-bold text-lg">
                      {t.sequence || 0}
                    </td>
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
