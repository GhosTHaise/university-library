import { getInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { Button } from './button'

const Header = ({session} : {session : Session}) => {

    return (
        <header className='mt-10 flex justify-between gap-5'>
            <Link href="/">
                <Image src="/icons/logo.svg" width={40} height={40} alt="logo" loading='lazy' />
            </Link>

            <ul className='flex flex-row items-start gap-8'>
                <li>
                    <form action={async () => {
                        'use server';

                        await signOut()
                    }}
                        className='mb-10'
                    >
                        <Button>Logout</Button>
                    </form>
                </li>
                <li>
                    <Link href="/my-profile">
                        <Avatar>
                            <AvatarFallback className='bg-amber-100'>{getInitials(session.user?.name || 'IN')}</AvatarFallback>
                        </Avatar>
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header