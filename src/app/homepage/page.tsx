'use client'
import CherryWebsite from "../components/cherry-website";
import { useRouter } from 'next/navigation';

export default function Homepage(){
    const router = useRouter();

    return <CherryWebsite onStartEditing={() => router.push('/homepage/editor')} />;
}