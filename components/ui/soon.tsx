import React from 'react'

export default function Soon() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="group relative">

                {/* Outer glow */}
                <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 blur-3xl animate-pulse" />

                {/* Rotating ring */}
                <div className="absolute -inset-6 rounded-full border border-red-500/10 animate-[spin_8s_linear_infinite]" />
                <div className="absolute -inset-10 rounded-full border border-purple-500/10 animate-[spin_12s_linear_infinite_reverse]" />

                {/* Floating dots */}
                <span className="absolute -left-8 top-2 h-1.5 w-1.5 animate-ping rounded-full bg-red-400" />
                <span className="absolute -right-7 top-8 h-1 w-1 animate-pulse rounded-full bg-purple-400" />
                <span className="absolute -bottom-5 left-8 h-1 w-1 animate-ping rounded-full bg-blue-400" />
                <span className="absolute -bottom-7 right-10 h-1.5 w-1.5 animate-pulse rounded-full bg-pink-400" />

                {/* Main card */}
                <div className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 shadow-2xl backdrop-blur-xl transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_50px_rgba(168,85,247,0.15)]">

                    {/* Moving shine */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                    {/* Top gradient line */}
                    <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent" />

                    {/* Status */}
                    <div className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/60" />
                        <span className="relative h-3 w-3 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                    </div>

                    {/* Text */}
                    <div className="relative flex flex-col">
                        <span className="bg-gradient-to-r from-red-500 via-zinc-200 to-zinc-500 bg-clip-text text-sm font-black tracking-[0.3em] ">
                            SOON
                        </span>

                        <span className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                            Something is coming
                        </span>
                    </div>

                    {/* Loading */}
                    <div className="relative ml-1 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-400" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400 [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:300ms]" />
                    </div>
                </div>

                {/* Bottom glow */}
                <div className="absolute -bottom-5 left-1/2 h-4 w-24 -translate-x-1/2 rounded-full bg-purple-500/20 blur-xl" />

            </div>
        </div>
    )
}
