import { useEffect, useState } from "react";
import { Appointment } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { Check, RefreshCw, X } from "lucide-react";
import { toast } from "sonner";
import { API_BASE_URL, getAuthHeaders, getAuthToken } from "@/lib/api";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAppointments = async () => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Please log in as admin to view appointments.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders()
        }
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.message ?? "Unable to load appointments");
      }
      const data = (Array.isArray(payload) ? payload : []) as Appointment[];
      setAppointments(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load appointments";
      toast.error(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id: string, status: Appointment["status"]) => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Please log in as admin to manage appointments.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders()
        },
        body: JSON.stringify({ status })
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload) {
        throw new Error(payload?.message ?? "Unable to update status");
      }

      const updated = payload as Appointment;
      setAppointments(prev => prev.map(a => (a.id === updated.id ? updated : a)));
      toast.success(`Appointment ${status}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update status";
      toast.error(message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Manage Appointments</h2>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => { setRefreshing(true); fetchAppointments(); }} disabled={refreshing}>
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-auto">
          {loading ? (
            <p className="py-6 text-center text-muted-foreground">Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p className="py-6 text-center text-muted-foreground">No appointments yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Patient</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">Phone</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Treatment</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="py-3 px-4 text-foreground font-medium">
                      <div>{a.patientName}</div>
                      {a.email && <p className="text-xs text-muted-foreground">{a.email}</p>}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{a.phone}</td>
                    <td className="py-3 px-4 text-foreground">{a.treatment}</td>
                    <td className="py-3 px-4 text-muted-foreground">{a.date}{a.time ? ` • ${a.time}` : ""}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        a.status === "approved" ? "bg-primary/10 text-primary" :
                        a.status === "rejected" ? "bg-destructive/10 text-destructive" :
                        "bg-amber-100 text-amber-700"
                      }`}>{a.status}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {a.status === "pending" && (
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="text-primary" onClick={() => updateStatus(a.id, "approved")}><Check size={16} /></Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => updateStatus(a.id, "rejected")}><X size={16} /></Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;
