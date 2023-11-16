"use client"

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        router.push('/overview');
    }, []);

    return (
        <div>
            <h1>Hello, Redirecting you to overview!</h1>
        </div>
    );
}