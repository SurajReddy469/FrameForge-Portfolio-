import React, { useState, useEffect } from 'react';
import { X, Feather, Stamp, Sparkles, Heart, Check, Ribbon, Award } from 'lucide-react';

export default function CalligraphyCardModal({ isOpen, onClose, onAttachCard }) {
  const [recipient, setRecipient] = useState('Chère Camille');
  const [message, setMessage] = useState('Que chaque bouchée de ce grand cru soit une promenade délicieuse dans les jardins secrets de Paris. Avec toute ma tendresse.');
  const [sender, setSender] = useState('Alexandre');
  const [inkColor, setInkColor] = useState('gold'); // gold, sepia
  const [waxColor, setWaxColor] = useState('burgundy'); // burgundy, gold, sage, noir
  const [sealEmblem, setSealEmblem] = useState('fleur'); // fleur, monogram, rose
  const [isStamped, setIsStamped] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const waxStyles = {
    burgundy: { bg: '#6e1119', border: '#420a0f', name: 'Rouge Bourgogne' },
    gold: { bg: '#c5a059', border: '#8c6c29', name: 'Or Royal Ancien' },
    sage: { bg: '#2d4a36', border: '#172b1e', name: 'Vert Botanique' },
    noir: { bg: '#1c1c1c', border: '#0a0a0a', name: 'Noir Velours' }
  };

  const handleSave = () => {
    if (onAttachCard) {
      onAttachCard({
        recipient,
        message,
        sender,
        waxColor: waxStyles[waxColor]?.name || waxColor,
        sealEmblem
      });
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calligraphy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-paris"
    >
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#1c100c] border border-[#c5a059]/40 rounded-xl shadow-2xl overflow-hidden my-8 z-10 text-[#fbf7f2]">
        {/* Header */}
        <div className="bg-[#241712] px-8 py-5 border-b border-[#352115] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Feather className="w-5 h-5 text-[#c5a059]" />
            <span className="text-[10px] uppercase tracking-widest text-[#c5a059]">
              STUDIO CALLIGRAPHIE // CARTE DE VOEUX A LA PLUME & SCEAU DE CIRE
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#9c8474] hover:text-[#fbf7f2] transition cursor-pointer"
            aria-label="Close calligraphy studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8 items-start">
          {/* Controls Left (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <label htmlFor="card-recipient" className="block text-xs uppercase tracking-wider text-[#c5a059] mb-1 font-sans">
                Destinataire (Recipient):
              </label>
              <input
                id="card-recipient"
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-[#241712] border border-[#352115] rounded px-3 py-2 text-sm text-[#fbf7f2] focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label htmlFor="card-message" className="block text-xs uppercase tracking-wider text-[#c5a059] mb-1 font-sans">
                Message Personnalisé (Max 160 caractères):
              </label>
              <textarea
                id="card-message"
                rows={3}
                maxLength={160}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#241712] border border-[#352115] rounded px-3 py-2 text-xs text-[#fbf7f2] focus:outline-none focus:border-[#c5a059] leading-relaxed resize-none"
              />
            </div>

            <div>
              <label htmlFor="card-sender" className="block text-xs uppercase tracking-wider text-[#c5a059] mb-1 font-sans">
                Signature (From):
              </label>
              <input
                id="card-sender"
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full bg-[#241712] border border-[#352115] rounded px-3 py-2 text-sm text-[#fbf7f2] focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            {/* Wax Color Palette */}
            <div>
              <span className="block text-xs uppercase tracking-wider text-[#c5a059] mb-1.5 font-sans">
                Couleur du Sceau de Cire (Wax Seal):
              </span>
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(waxStyles).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setWaxColor(key)}
                    className={`p-2 border rounded flex flex-col items-center gap-1 transition cursor-pointer ${
                      waxColor === key
                        ? 'border-[#c5a059] bg-[#2d1c16]'
                        : 'border-[#352115] bg-[#241712] hover:border-neutral-500'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-black/30 shadow-inner"
                      style={{ backgroundColor: waxStyles[key].bg }}
                    />
                    <span className="text-[9px] uppercase tracking-wider text-[#ded4ca] truncate w-full text-center">
                      {key}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="w-full py-3.5 bg-[#c5a059] hover:bg-[#b08c46] text-[#1c100c] text-xs uppercase tracking-widest font-bold rounded transition mt-4 cursor-pointer shadow-lg shadow-[#c5a059]/20"
            >
              {saved ? '✓ Carte Enregistrée!' : 'Attacher la Carte Calligraphiée (Offert)'}
            </button>
          </div>

          {/* Parchment Card Visual Preview Right (7 cols) */}
          <div className="md:col-span-7 bg-[#241712] border border-[#352115] p-6 sm:p-8 rounded-xl flex items-center justify-center">
            {/* Fine Cotton Parchment */}
            <div className="relative w-full max-w-sm aspect-[1.3] bg-[#fbf7ee] text-[#2c1d11] p-6 sm:p-8 rounded shadow-2xl border border-[#ded8cb] flex flex-col justify-between font-serif">
              {/* Header watermark */}
              <div className="text-center pb-2 border-b border-[#ebdcc7]">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#8c7462] block font-sans">
                  MAISON DU CACAO &bull; PARIS 1854
                </span>
                <span className="text-xs font-serif italic text-[#594637]">
                  {recipient || 'Chère Invité'}
                </span>
              </div>

              {/* Hand-lettered message */}
              <div className="py-3 text-xs leading-relaxed italic text-[#3d271d] font-serif text-center">
                "{message || 'Votre message calligraphié à la main par nos artisans parisiens.'}"
              </div>

              {/* Signature & Wax Seal */}
              <div className="flex items-end justify-between pt-2 border-t border-[#ebdcc7]">
                <div className="text-left font-sans">
                  <span className="text-[8px] uppercase tracking-wider text-[#8c7462] block">Signé</span>
                  <span className="text-xs font-serif italic text-[#3d271d]">{sender || 'Alexandre'}</span>
                </div>

                {/* Simulated 3D Wax Seal Stamp */}
                <div
                  className="w-12 h-12 rounded-full border-2 border-black/20 shadow-xl flex items-center justify-center text-white relative transition-transform hover:scale-105"
                  style={{ backgroundColor: waxStyles[waxColor].bg }}
                >
                  <Stamp className="w-5 h-5 text-white/90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
