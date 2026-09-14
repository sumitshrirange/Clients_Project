import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const Lightbox = ({ item, onClose, imageIndex, setImageIndex }) => {
  const images = item?.images || [];

  const handlePrevImage = () => {
    setImageIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const handleNextImage = () => {
    setImageIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] bg-ink/90 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="absolute top-5 right-5 w-10 h-10 grid place-items-center rounded-full bg-white/10 text-canvas hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous Image */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 w-11 h-11 grid place-items-center rounded-full bg-white/10 text-canvas hover:bg-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Next Image */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 w-11 h-11 grid place-items-center rounded-full bg-white/10 text-canvas hover:bg-white/20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[imageIndex]?.url}
              alt={`${item.title} - image ${imageIndex + 1}`}
              className="max-h-[70vh] w-auto rounded-2xl object-contain shadow-floaty"
            />

            {images.length > 1 && (
              <span className="text-sm text-canvas/70">
                {imageIndex + 1} / {images.length}
              </span>
            )}

            <div className="flex items-center gap-3 text-canvas">
              <h3 className="font-display font-semibold">{item.title}</h3>

              {item.figmaUrl && (
                <a
                  href={item.figmaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-mint hover:underline"
                >
                  View in Figma <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
