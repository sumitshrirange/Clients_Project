import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogIn } from "lucide-react";
import Logo from "../../components/layout/Logo";
import Button from "../../components/ui/Button";
import ThemeToggle from "../../components/ui/ThemeToggle";
import GridBackdrop from "../../components/ui/GridBackdrop";
import { Field, TextInput } from "../../components/ui/FormFields";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const AdminLogin = () => {
  const { signIn } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const redirectTo = location.state?.from?.pathname || "/admin/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-canvas-tint dark:bg-canvas-dark px-6 overflow-hidden">
      <GridBackdrop />
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className="relative w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-3xl border border-line dark:border-line-dark shadow-card p-8">
          <h1 className="font-display font-bold text-xl text-ink dark:text-canvas mb-1">Admin Login</h1>
          <p className="text-sm text-ink-soft dark:text-canvas/60 mb-6">Sign in to manage the portfolio.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Email">
              <TextInput
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="admin@example.com"
              />
            </Field>
            <Field label="Password">
              <TextInput
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
              />
            </Field>
            <Button type="submit" className="w-full justify-center" disabled={submitting}>
              <LogIn className="w-4 h-4" /> {submitting ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
