"use client";

import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

export function PaymentMethodCard() {
    const [cards, setCards] = useState<any[]>([]);

    const getToken = () => {
        return (
            sessionStorage.getItem("onboarding_jwt") ||
            localStorage.getItem("onboarding_jwt")
        );
    };

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const token = getToken();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/billing/payment-methods`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();

                setCards(Array.isArray(data) ? data : data.data || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCards();
    }, []);
    console.log(cards)
    return (
        <div className="w-full bg-white rounded-xl border p-6">
            <div className="mb-6">
                <h2 className="text-sm font-semibold text-[#1a2332]">Payment Method</h2>
                <p className="text-sm text-[#8899aa]">Your saved cards</p>
            </div>

            <div className="space-y-3">
                {cards.length === 0 && (
                    <p className="text-sm text-gray-400">No cards added</p>
                )}

                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="flex items-start gap-4 p-4 rounded-lg border hover:bg-gray-50"
                    >
                        <CreditCard className="h-5 w-5 text-gray-500" />

                        <div className="flex-1">
                            <h3 className="text-sm font-medium">
                                {card.brand} ****{card.last4}
                            </h3>
                            <p className="text-sm text-gray-500">
                                Expiry {card.expiry}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}