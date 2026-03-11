export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    let token = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        let errorMsg = 'An error occurred';
        try {
            const errorData = await response.json();
            errorMsg = errorData.message || errorMsg;
        } catch (e) {
            errorMsg = response.statusText;
        }
        throw new ApiError(errorMsg, response.status);
    }

    // Not all responses will be JSON (e.g., 204 No Content), but assuming most are
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

export const api = {
    // Auth
    login: (data: any) => fetchWithAuth('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    register: (data: any) => fetchWithAuth('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

    // Services
    getServices: () => fetchWithAuth('/services'),

    // Subscriptions
    createSubscription: (data: { serviceId: string }) => fetchWithAuth('/subscriptions/create', { method: 'POST', body: JSON.stringify(data) }),
    getMySubscriptions: () => fetchWithAuth('/subscriptions/my-subscriptions'),

    // Billing
    createBilling: (data: any) => fetchWithAuth('/billing/create', { method: 'POST', body: JSON.stringify(data) }),

    // User Profile
    getProfile: () => fetchWithAuth('/users/profile'),
};
