"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/lib/validations";

type Field = "name" | "email" | "whatsapp" | "password" | "confirmPassword";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    whatsapp: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Field;
        if (key && !fieldErrors[key]) {
          let msg = issue.message;
          if (msg === "Informe seu nome completo") msg = t("nameValidation");
          else if (msg === "E-mail inválido") msg = t("emailValidation");
          else if (msg === "WhatsApp muito longo") msg = t("whatsappValidation");
          else if (msg === "A senha precisa de pelo menos 8 caracteres") msg = t("passwordValidation");
          else if (msg === "As senhas não conferem") msg = t("confirmPasswordValidation");

          fieldErrors[key] = msg;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      setLoading(false);
      const data = await res.json().catch(() => ({}));
      setFormError(data.error ?? t("couldNotRegister"));
      return;
    }

    // Auto-login right after registering.
    const signInRes = await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
    setLoading(false);

    if (signInRes?.error) {
      // Account created, but auto-login failed — send them to login.
      router.push("/login");
      return;
    }
    router.push("/overview");
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{t("createAccount")}</CardTitle>
        <CardDescription>
          {t("registerToSaveProgress")}
        </CardDescription>
      </CardHeader>

      <form onSubmit={onSubmit} noValidate>
        <CardContent className="space-y-4">
          {formError && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {formError}
            </p>
          )}

          <Field
            id="name"
            label={t("nameLabel")}
            value={values.name}
            onChange={set("name")}
            error={errors.name}
            autoComplete="name"
            placeholder={t("fullNamePlaceholder")}
          />
          <Field
            id="email"
            label={t("emailLabel")}
            type="email"
            value={values.email}
            onChange={set("email")}
            error={errors.email}
            autoComplete="email"
            placeholder="voce@exemplo.com"
          />
          <Field
            id="whatsapp"
            label={t("whatsappLabel")}
            value={values.whatsapp}
            onChange={set("whatsapp")}
            error={errors.whatsapp}
            autoComplete="tel"
            placeholder={`(${t("optionalLabel")}) (11) 99999-9999`}
            optional
          />
          <Field
            id="password"
            label={t("passwordLabel")}
            type="password"
            value={values.password}
            onChange={set("password")}
            error={errors.password}
            autoComplete="new-password"
            placeholder={t("minCharactersPlaceholder")}
          />
          <Field
            id="confirmPassword"
            label={t("confirmPasswordLabel")}
            type="password"
            value={values.confirmPassword}
            onChange={set("confirmPassword")}
            error={errors.confirmPassword}
            autoComplete="new-password"
            placeholder={t("repeatPasswordPlaceholder")}
          />
        </CardContent>

        <CardFooter className="mt-6 flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="size-4 animate-spin" />}
            {t("createAccount")}
          </Button>
          <p className="text-center text-sm text-muted">
            {t("alreadyHaveAccount")}{" "}
            <Link
              href="/login"
              className="font-medium text-claude-soft hover:underline"
            >
              {t("signIn")}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  type,
  ...props
}: React.ComponentProps<typeof Input> & {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
}) {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {optional && (
          <span className="text-xs font-normal text-muted ml-1">({t("optionalLabel")})</span>
        )}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={isPassword ? (show ? "text" : "password") : type}
          aria-invalid={!!error}
          className={cn(isPassword ? "pr-10" : "")}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-cream focus:outline-none cursor-pointer"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
