import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL, getAuthHeaders } from "@/lib/api";
import { Upload } from "lucide-react";

const AdminSettings = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      let headers = getAuthHeaders();
      // Ensure the token doesn't have accidental quotes if it was saved wrong in the past
      if (headers.Authorization) {
        headers.Authorization = headers.Authorization.replace(/"/g, '');
      }
      
      const res = await fetch(`${API_BASE_URL}/api/settings/upload-doctor-image`, {
        method: "POST",
        headers,
        body: formData
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Doctor image uploaded successfully.",
        });
        setSelectedFile(null);
        setPreview(null);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Upload failed");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-display font-bold text-foreground">Settings</h2>
      
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Home Page Doctor Image</h3>
        <p className="text-muted-foreground text-sm mb-6">Upload a new picture of the doctor to be displayed on the home page and about page.</p>
        
        <div className="flex flex-col gap-4 max-w-sm">
          <Input 
            type="file" 
            accept="image/jpeg, image/png, image/webp" 
            onChange={handleFileChange} 
          />
          
          {preview && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Preview:</p>
              <img src={preview} alt="Preview" className="w-full h-auto max-h-[300px] object-cover rounded-lg shadow-md" />
            </div>
          )}

          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || uploading}
            className="w-full mt-4"
          >
            {uploading ? "Uploading..." : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
