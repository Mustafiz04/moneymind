'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
// import { Menu, X } from "lucide-react";
import { useState } from "react";


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex justify-end items-center p-4">
            {/* <SignedOut>
                <SignInButton />
            </SignedOut> */}
            <SignedIn>
                <div className="flex items-center gap-4">
                    <UserButton afterSignOutUrl="/"/>
                    {/* Uncomment if you want to add a menu button
                    <button onClick={toggleMenu}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    */}
                </div>
            </SignedIn>
        </div>
    )
}