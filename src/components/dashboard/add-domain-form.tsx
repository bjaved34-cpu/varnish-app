"use client";

import { LucideIcon, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    icon: LucideIcon;
    className?: string;
}
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
};
const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {

};

export function AddDomainForm() {
    return (<>


    </>);
}
