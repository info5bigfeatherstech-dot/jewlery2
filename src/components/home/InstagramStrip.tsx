import React from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, ArrowUpRight } from 'lucide-react'
import { InstagramIcon } from '@/components/ui/SocialIcons'
import { instagramPosts } from '@/data/instagram'

export const InstagramStrip: React.FC = () => {
  return (
    <section className="py-16 bg-[#FAF7F0] border-t border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1C42]/10 text-[#0A1C42] text-xs font-semibold uppercase tracking-wider mb-2">
              <InstagramIcon className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>@aurelia.jewels On Instagram</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#06142E] tracking-tight">
              Behind The Scenes & Styling Diwas
            </h2>
          </div>

          <a
            href="https://www.instagram.com/aurelia.jewels"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D81B60] to-[#8E24AA] hover:from-[#C2185B] hover:to-[#7B1FA2] text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all group"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow @aurelia.jewels</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* 6 Square Tiles Grid with Hover Overlay */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-festive transition-all"
            >
              <img
                src={post.image}
                alt="Instagram post from Aurelia Jewels"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Dark Overlay with stats & caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#051025]/90 via-[#051025]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3.5 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-md">
                    <InstagramIcon className="w-3.5 h-3.5 text-white" />
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-3 text-xs font-semibold mb-1.5">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                      {post.comments}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/90 line-clamp-2 leading-tight">
                    {post.caption}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
