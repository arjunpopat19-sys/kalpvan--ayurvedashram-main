import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast.success("Login successful!");
      const stored = localStorage.getItem("kalpvan_user");
      const user = stored ? JSON.parse(stored) : null;
      navigate(user?.role === "admin" ? "/admin" : "/");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-secondary/30 pt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card rounded-2xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-primary" size={28} />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground text-sm mt-1">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@kalpvan.com" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full rounded-full">Login</Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
        </div>

        <div className="mt-4 p-3 bg-secondary rounded-lg text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Demo Credentials:</p>
          <p>Admin: admin@kalpvan.com / admin123</p>
          <p>User: user@kalpvan.com / user123</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
