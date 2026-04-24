import { useEffect, useState } from "react";
import { Review } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { API_BASE_URL, getAuthHeaders, getAuthToken } from "@/lib/api";

const defaultForm = { patientName: "", treatment: "", rating: 5, text: "" };

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews`);
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.message ?? "Unable to load reviews");
      }
      setReviews((Array.isArray(payload) ? payload : []) as Review[]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load reviews";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const remove = async (id: string) => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Please log in as admin to delete reviews.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
        method: "DELETE",
        headers: {
          ...getAuthHeaders()
        }
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.message ?? "Unable to delete review");
      }
      setReviews(prev => prev.filter(r => r.id !== id));
      toast.success("Review deleted");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete review";
      toast.error(message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patientName || !form.treatment || !form.text) {
      toast.error("Please fill all required fields.");
      return;
    }
    if (form.rating < 1 || form.rating > 5) {
      toast.error("Rating must be between 1 and 5.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      toast.error("Please log in as admin to add reviews.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders()
        },
        body: JSON.stringify(form)
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload) {
        throw new Error(payload?.message ?? "Unable to add review");
      }
      setReviews(prev => [payload as Review, ...prev]);
      setForm(defaultForm);
      toast.success("Review added");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to add review";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Manage Reviews</h2>

      <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 border border-border shadow-sm mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Patient Name *</label>
            <Input value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })} required />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Treatment *</label>
            <Input value={form.treatment} onChange={(e) => setForm({ ...form, treatment: e.target.value })} required />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Rating (1-5) *</label>
            <Input
              type="number"
              min={1}
              max={5}
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-muted-foreground mb-2 block">Review *</label>
            <Textarea rows={3} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
          </div>
        </div>
        <Button type="submit" className="rounded-full" disabled={saving}>
          {saving ? "Saving..." : "Add Review"}
        </Button>
      </form>

      <div className="grid gap-4">
        {loading ? (
          <p className="text-muted-foreground text-center py-8">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No reviews yet.</p>
        ) : (
          reviews.map(r => (
            <div key={r.id} className="bg-card rounded-xl p-6 shadow-sm border border-border flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{r.patientName}</span>
                  <span className="text-xs text-muted-foreground">• {r.treatment}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">"{r.text}"</p>
                <p className="text-xs text-muted-foreground mt-2">{new Date(r.createdAt ?? Date.now()).toLocaleDateString()}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-destructive" onClick={() => remove(r.id)}>
                <Trash2 size={16} />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
