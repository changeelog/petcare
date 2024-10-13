'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/Tabs'
import { useFilteredTips } from '../lib/useFilteredTips'
import { TipCard } from './TipCard'

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function LatestTips() {
  const { filter, setFilter, filteredTips } = useFilteredTips()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center text-gray-900">
          Последние советы
        </h2>
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setFilter}
        >
          <TabsList className="mb-8 flex justify-center size-fit mx-auto flex-wrap">
            {['all', 'cats', 'dogs', 'other'].map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-4 py-2 text-sm font-medium transition-colors duration-200"
              >
                {category === 'all'
                  ? 'Все'
                  : category === 'cats'
                  ? 'Кошки'
                  : category === 'dogs'
                  ? 'Собаки'
                  : 'Другие питомцы'}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={filter}>
            <AnimatePresence>
              <motion.div
                className="grid gap-6 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                {filteredTips.map((tip) => (
                  <motion.div
                    key={tip.id}
                    variants={variants}
                    transition={{ duration: 0.3 }}
                  >
                    <TipCard tip={tip} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
