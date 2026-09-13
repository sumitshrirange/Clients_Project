import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageLightbox = ({ images = [], index, onClose, onChange }) => {
  const open = index !== null && index !== undefined;
  const src = open ? images[index] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] bg-ink/90 flex items-center justify-center p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="absolute top-5 right-5 w-10 h-10 grid place-items-center rounded-full bg-white/10 text-canvas hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onChange((index - 1 + images.length) % images.length); }}
                aria-label="Previous image"
                className="absolute left-4 sm:left-8 w-11 h-11 grid place-items-center rounded-full bg-white/10 text-canvas hover:bg-white/20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onChange((index + 1) % images.length); }}
                aria-label="Next image"
                className="absolute right-4 sm:right-8 w-11 h-11 grid place-items-center rounded-full bg-white/10 text-canvas hover:bg-white/20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          <motion.img
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={src}
            alt=""
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-floaty"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
