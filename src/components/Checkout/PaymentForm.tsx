"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Calendar, Lock, User, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod";

const paymentSchema = z.object({
    number: z.string().regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Invalid card number format"),
    expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry (MM/YY)"),
    cvc: z.string().regex(/^\d{3,4}$/, "3 or 4 digits required"),
    name: z.string().min(2, "Full name is required"),
});

type PaymentData = z.infer<typeof paymentSchema>;

export default function PaymentForm() {
    const [form, setForm] = useState({
        number: "",
        expiry: "",
        cvc: "",
        name: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof PaymentData, string>>>({});
    const [success, setSuccess] = useState(false);

    // Formatters
    const formatCardNumber = (val: string) => {
        const v = val.replace(/\D/g, "").slice(0, 16);
        const parts = [];
        for (let i = 0; i < v.length; i += 4) {
            parts.push(v.slice(i, i + 4));
        }
        return parts.join(" ");
    };

    const formatExpiry = (val: string) => {
        const v = val.replace(/\D/g, "").slice(0, 4);
        if (v.length >= 2) {
            return `${v.slice(0, 2)}/${v.slice(2)}`;
        }
        return v;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formatted = value;

        if (name === "number") formatted = formatCardNumber(value);
        if (name === "expiry") formatted = formatExpiry(value);
        if (name === "cvc") formatted = value.replace(/\D/g, "").slice(0, 4);

        setForm((prev) => ({ ...prev, [name]: formatted }));

        // Clear error on retry
        if (errors[name as keyof PaymentData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = paymentSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors: any = {};
            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });
            setErrors(fieldErrors);
            // Shake animation trigger logic could go here
        } else {
            setErrors({});
            setSuccess(true);
            // Mock API trigger
            setTimeout(() => setSuccess(false), 3000);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="text-blue-500" /> Payment Details
            </h2>

            {success ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-green-500"
                >
                    <CheckCircle size={64} className="mb-4" />
                    <p className="text-xl font-semibold">Payment Verified</p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Card Number */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Card Number</label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                name="number"
                                value={form.number}
                                onChange={handleChange}
                                placeholder="0000 0000 0000 0000"
                                className={`w-full bg-neutral-950 border ${errors.number ? 'border-red-500' : 'border-neutral-700'} rounded-lg py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                            />
                        </div>
                        {errors.number && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.number}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Expiry */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Expiry</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                                <input
                                    name="expiry"
                                    value={form.expiry}
                                    onChange={handleChange}
                                    placeholder="MM/YY"
                                    className={`w-full bg-neutral-950 border ${errors.expiry ? 'border-red-500' : 'border-neutral-700'} rounded-lg py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                />
                            </div>
                            {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                        </div>

                        {/* CVC */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">CVC</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                                <input
                                    name="cvc"
                                    value={form.cvc}
                                    onChange={handleChange}
                                    placeholder="123"
                                    type="password"
                                    maxLength={4}
                                    className={`w-full bg-neutral-950 border ${errors.cvc ? 'border-red-500' : 'border-neutral-700'} rounded-lg py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                />
                            </div>
                            {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Cardholder Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className={`w-full bg-neutral-950 border ${errors.name ? 'border-red-500' : 'border-neutral-700'} rounded-lg py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg mt-4 transition-colors shadow-lg shadow-blue-900/20"
                    >
                        Pay Now
                    </button>
                </form>
            )}
        </div>
    );
}
