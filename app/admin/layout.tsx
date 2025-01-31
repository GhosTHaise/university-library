import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import { ReactNode } from 'react'
import "@/styles/admin.css"
import Sidebar from '@/components/admin/sidebar';

const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    if (!session?.user?.id) redirect("/sign-in")

    return (
        <main className='flex min-h-screen w-full flex-row'>
            <Sidebar />

            <div className='admin-container'>
                <p>
                    Header
                </p>
                {
                    children
                }
            </div>
        </main>
    )
}

export default Layout