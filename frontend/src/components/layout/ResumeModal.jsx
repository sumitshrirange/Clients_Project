import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, FileWarning, ExternalLink, Loader2 } from "lucide-react";
import Button from "../ui/Button";

const slugifyName = (name) =>
  (name || "resume")
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const ResumeModal = ({ open, onClose, resumeUrl, name }) => {
  const [blobUrl, setBlobUrl] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error

  const fileName = `${slugifyName(name)}-Resume.pdf`;

  useEffect(() => {
    if (!open || !resumeUrl) return;

    let cancelled = false;
    setStatus("loading");

    // Many hosts (including Cloudinary's raw file delivery) serve PDFs with
    // a Content-Disposition: attachment header and an internal hash as the
    // filename. That breaks two things at once: a plain <iframe src=...>
    // triggers a download instead of rendering, and a plain <a download>
    // gets ignored by the browser for cross-origin URLs, so the saved file
    // ends up named after Cloudinary's public_id instead of "resume.pdf".
    // Fetching the bytes ourselves and working from a blob: URL (which is
    // always same-origin) fixes both: the iframe renders it inline, and the
    // download attribute's filename is honored.
    fetch(resumeUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch resume");
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        const pdfBlob = blob.type === "application/pdf" ? blob : blob.slice(0, blob.size, "application/pdf");
        const url = URL.createObjectURL(pdfBlob);
        setBlobUrl(url);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [open, resumeUrl]);

  // Revoke the blob URL once the modal closes so it doesn't leak memory.
  useEffect(() => {
    if (!open && blobUrl) {
      URL.revokeObjectURL(blobUrl);
      setBlobUrl(null);
      setStatus("idle");
    }
  }, [open, blobUrl]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/60 dark:bg-black/70 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl h-[85vh] bg-white dark:bg-surface-dark rounded-3xl shadow-floaty overflow-hidden flex flex-col border border-line dark:border-line-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-line dark:border-line-dark bg-gradient-to-r from-lavender/50 to-blue/10 dark:from-primary/10 dark:to-transparent">
              <h2 className="font-display font-bold text-lg text-ink dark:text-canvas">Resume</h2>
              <div className="flex items-center gap-2">
                {resumeUrl && (
                  <Button
                    as="a"
                    href={blobUrl || resumeUrl}
                    download={blobUrl ? fileName : undefined}
                    target={blobUrl ? undefined : "_blank"}
                    rel="noreferrer"
                    variant="outline"
                    className="!px-4 !py-2 text-sm"
                    aria-disabled={status === "loading"}
                  >
                    <Download className="w-4 h-4" /> Download
                  </Button>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="w-9 h-9 grid place-items-center rounded-full hover:bg-white/60 dark:hover:bg-white/10 text-ink-soft dark:text-canvas/70"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-canvas-tint dark:bg-canvas-dark">
              {!resumeUrl ? (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-ink-faint dark:text-canvas/40">
                  <FileWarning className="w-8 h-8" />
                  <p className="text-sm">Resume hasn't been added yet.</p>
                </div>
              ) : status === "loading" || status === "idle" ? (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-ink-faint dark:text-canvas/40">
                  <Loader2 className="w-7 h-7 animate-spin" />
                  <p className="text-sm">Loading resume…</p>
                </div>
              ) : status === "error" ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center px-6">
                  <FileWarning className="w-8 h-8 text-ink-faint dark:text-canvas/40" />
                  <p className="text-sm text-ink-soft dark:text-canvas/70 max-w-xs">
                    The preview couldn't load here. You can still open it in a new tab.
                  </p>
                  <Button as="a" href={resumeUrl} target="_blank" rel="noreferrer" variant="outline" className="!px-4 !py-2 text-sm">
                    <ExternalLink className="w-4 h-4" /> Open in new tab
                  </Button>
                </div>
              ) : (
                <iframe src={blobUrl} title="Resume preview" className="w-full h-full" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
