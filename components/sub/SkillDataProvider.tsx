"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Props {
    src: string;
    width: number;
    height: number;
    index: number;
    label?: string;
}

const SkillDataProvider = ({ src, width, height, index, label }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className="flex flex-col items-center gap-2"
        >
            <div className="flex items-center justify-center rounded-xl bg-white/90 hover:bg-white transition-colors p-3 shadow-sm">
                <Image
                    src={src}
                    width={width}
                    height={height}
                    alt={label || 'skill'}
                />
            </div>
            {label && (
                <span className="font-mono text-xs text-gray-400 text-center">{label}</span>
            )}
        </motion.div>
    )
}

export default SkillDataProvider
