import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#120a07] text-[#ded4ca] border-t border-[#352115] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-xl font-normal font-paris uppercase tracking-[0.18em] mb-4 text-[#fbf7f2]">
              MAISON CACAO
            </h3>
            <p className="text-xs text-[#aa9585] font-light leading-relaxed mb-4">
              Purveyors of grand cru artisanal chocolates and single-estate Criollo ganaches since 1924. Confectioned by Meilleur Ouvrier de France chocolatiers.
            </p>
            <div className="text-[11px] text-[#7a6455] space-y-1">
              <p>Boutique: 28 Rue Jacob, 75006 Paris</p>
              <p>Atelier: Saint-Germain-des-Prés</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#c5a059] mb-4">
              Les Confections
            </h4>
            <ul className="text-xs space-y-2 text-[#aa9585] font-light">
              <li><a href="#coffrets" className="hover:text-[#c5a059] transition-colors">Prestige Ballotin 36</a></li>
              <li><a href="#coffrets" className="hover:text-[#c5a059] transition-colors">Champagne Rosé Truffles</a></li>
              <li><a href="#custom-box" className="hover:text-[#c5a059] transition-colors">Custom 16-Piece Box</a></li>
              <li><a href="#coffrets" className="hover:text-[#c5a059] transition-colors">Guérande Salt Caramels</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#c5a059] mb-4">
              Bespoke Services
            </h4>
            <ul className="text-xs space-y-2 text-[#aa9585] font-light">
              <li><a href="#custom-box" className="hover:text-[#c5a059] transition-colors">Wedding & Gala Favors</a></li>
              <li><a href="#corporate" className="hover:text-[#c5a059] transition-colors">Corporate Gifting Concierge</a></li>
              <li><a href="#corporate" className="hover:text-[#c5a059] transition-colors">Custom Monogram Packaging</a></li>
              <li><a href="#shipping" className="hover:text-[#c5a059] transition-colors">Cold-Chain Global Delivery</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#c5a059] mb-4">
              Le Journal du Cacao
            </h4>
            <p className="text-xs text-[#aa9585] font-light leading-relaxed mb-4">
              Receive tasting invitations and notice of limited seasonal harvest releases.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Bienvenue! You are enrolled in Le Journal du Cacao."); }} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="votre.email@domain.com"
                required
                className="bg-[#1c100c] border border-[#352115] px-3.5 py-2.5 text-xs text-[#fbf7f2] placeholder-[#7a6455] focus:outline-none focus:border-[#c5a059]"
              />
              <button
                type="submit"
                className="bg-[#c5a059] text-[#1c100c] py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#d8b775] transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#352115] pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#7a6455] uppercase tracking-widest gap-4">
          <div>
            &copy; {new Date().getFullYear()} MAISON CACAO PARIS SAS. TOUS DROITS RÉSERVÉS.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#c5a059]">Conditions Générales</a>
            <a href="#" className="hover:text-[#c5a059]">Politique de Confidentialité</a>
            <a href="#" className="hover:text-[#c5a059]">Certification Éthique</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
