import { useState, useEffect } from "react";

export function getStorageItem(key: string) {
    let item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    } else {
        return undefined;
    }
}

export default function useStorage(key: string, defaultValues: Record<any, any>) {
    const [isMounted, setIsMounted] = useState(false);
    const [lastStorage, setLastStorage] = useState('');
    const [storage, setStorage] = useState(getStorageItem(key) || defaultValues);

    useEffect(() => {
        if (isMounted) {
            if (storage === null) {
                setLastStorage(() => '');
                localStorage.removeItem(key);
            } else {
                const value = JSON.stringify(storage);
                if (value !== lastStorage) {
                    setLastStorage(() => value);
                    localStorage.setItem(key, value);
                }
            }
        } else {
            setIsMounted(true);
        }
    }, [storage]);

    return [storage, setStorage];
}

