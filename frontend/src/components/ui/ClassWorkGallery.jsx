import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, Pin, Figma, Eye } from "lucide-react";
import Skeleton from "./Skeleton";
import EmptyState from "./EmptyState";
import Lightbox from "./Lightbox";

// Cheap, stable string hash so the same item always gets the same rotation
// and color — no re-shuffling on every re-render, but no fixed lookup table
// to maintain as new categories get added from the admin panel either.
const hashString = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const ROTATIONS = [-3, -1.5, 0, 1.5, 3];

// Each entry is a "sticker" pill treatment plus a matching soft card-border
// tint, cycled by category name so the same category always reads the same
// color across the whole gallery.
const CATEGORY_PALETTE = [
  { pill: "bg-primary text-canvas", border: "hover:border-primary/50 dark:hover:border-primary-light/50" },
  { pill: "bg-blue text-canvas", border: "hover:border-blue/50" },
  { pill: "bg-mint text-ink", border: "hover:border-mint/60" },
  { pill: "bg-cream text-ink", border: "hover:border-cream/70" },
  { pill: "bg-ink text-canvas dark:bg-primary-light dark:text-ink", border: "hover:border-ink/30 dark:hover:border-primary-light/50" },
];

const getCategoryStyle = (category) => CATEGORY_PALETTE[hashString(category) % CATEGORY_PALETTE.length];
const getRotation = (id) => ROTATIONS[hashString(id) % ROTATIONS.length];

const ClassWorkGallery = ({ items, loading, limit, showFilters = true }) => {
  const [category, setCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(null);

  const categories = useMemo(
    () => ["All", ...new Set((items || []).map((i) => i.category))],
    [items]
  );

  const filtered = useMemo(() => {
    const base = category === "All" ? items || [] : (items || []).filter((i) => i.category === category);
    return limit ? base.slice(0, limit) : base;
  }, [items, category, limit]);

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className={i % 3 === 0 ? "h-72" : "h-56"} />
        ))}
      </div>
    );
  }

  if (!items?.length) {
    return <EmptyState icon={Images} title="Class work coming soon" description="Design exercises and experiments will appear here." />;
  }

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                category === cat
                  ? "bg-gradient-to-br from-primary to-primary-dark text-canvas border-primary shadow-glow"
                  : "bg-white text-ink-soft border-line hover:border-primary/40 hover:-translate-y-0.5 dark:bg-surface-dark dark:text-canvas/70 dark:border-line-dark"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-7 [column-fill:_balance]">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => {
            const style = getCategoryStyle(item.category);
            const rotation = getRotation(item._id);

            return (
              <motion.button
                key={item._id}
                layout
                initial={{ opacity: 0, y: 24, rotate: rotation }}
                animate={{ opacity: 1, y: 0, rotate: rotation }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: (i % 6) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveIndex(i)}
                className={`group relative mb-7 w-full rounded-3xl overflow-hidden border-2 border-line dark:border-line-dark bg-white dark:bg-surface-dark text-left break-inside-avoid shadow-card hover:shadow-card-hover transition-shadow ${style.border}`}
              >
                {/* Pin, as if the card were tacked to a corkboard */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-white dark:bg-surface-dark border-2 border-line dark:border-line-dark shadow-sm" aria-hidden="true">
                  <Pin className="w-2.5 h-2.5 text-ink-faint dark:text-canvas/50 absolute inset-0 m-auto" />
                </div>

                <div className="relative overflow-hidden">
                  {item.images?.[0]?.url && (
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      className="w-full h-auto object-cover group-hover:scale-[1.06] transition-transform duration-500"
                    />
                  )}

                  {/* Category sticker, overlapping the image's top-left corner */}
                  <span
                    className={`absolute top-3 left-3 -rotate-3 text-[10px] font-mono uppercase tracking-wide px-2.5 py-1 rounded-full shadow-sm ${style.pill}`}
                  >
                    {item.category}
                  </span>

                  {item.figmaUrl && (
                    <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 dark:bg-surface-dark/90 grid place-items-center shadow-sm">
                      <Figma className="w-3.5 h-3.5 text-primary dark:text-primary-light" />
                    </span>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-canvas font-display font-bold text-base leading-snug">{item.title}</p>
                      {item.description && (
                        <p className="text-canvas/70 text-xs mt-1 line-clamp-2">{item.description}</p>
                      )}
                      <span className="inline-flex items-center gap-1.5 mt-2 text-canvas/80 text-xs">
                        <Eye className="w-3.5 h-3.5" /> View full size
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <Lightbox
        item={activeIndex !== null ? filtered[activeIndex] : null}
        onClose={() => setActiveIndex(null)}
        onPrev={filtered.length > 1 ? () => setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length) : undefined}
        onNext={filtered.length > 1 ? () => setActiveIndex((i) => (i + 1) % filtered.length) : undefined}
      />
    </div>
  );
};

export default ClassWorkGallery;
