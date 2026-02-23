"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CongratsMessage() {
    const router = useRouter();

    return (
        <div className="relative flex flex-col items-center text-center w-full min-h-[calc(100vh-200px)]">
            {/* Content Card */}
            <div className="w-full max-w-[360px] flex flex-col items-center">
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-black text-white shadow-xl"
                >
                    <Check className="h-10 w-10 stroke-[3]" />
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 text-[32px] font-bold tracking-tight text-gray-900"
                >
                    Congrats!
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10 text-base leading-relaxed text-gray-600"
                >
                    Lorem Ipsum is simply dummy text of the<br />
                    printing and typese. Lorem Ipsum is simply<br />
                    dummy text of the printing and typese.
                </motion.p>

                {/* Action Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full"
                >
                    <Button
                        onClick={() => router.push("/dashboard")}
                        className="h-14 w-full rounded-xl bg-[#1a2332] text-base font-semibold text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:bg-[#243044] hover:shadow-[0_12px_40px_rgb(0,0,0,0.16)] active:scale-[0.98]"
                    >
                        Continue to Dashboard
                    </Button>
                </motion.div>
            </div>

            {/* Clapping Illustration - Pinned to absolute bottom of this relative container */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-full max-w-[500px] pointer-events-none"
            >
                <Image
                    src="/image7.svg"
                    alt="Celebration"
                    width={500}
                    height={250}
                    className="w-full h-auto opacity-[1]"
                />
            </motion.div>
        </div>
    );
}
