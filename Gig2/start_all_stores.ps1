# Start Port 5180 Master Showroom Hub & all 10 E-Commerce Flagship Stores across unique ports
$stores = @(
  @{ Name = "Store01-VanguardChrono"; Port = 5181; Title = "Vanguard Chrono (Swiss Horology)" },
  @{ Name = "Store02-ZeroGravityNYC"; Port = 5182; Title = "ZERO//GRAVITY (Cyber-Streetwear)" },
  @{ Name = "Store03-AuraBotanica"; Port = 5183; Title = "Aura Botanica (Japandi Skincare)" },
  @{ Name = "Store04-NordicRoast"; Port = 5184; Title = "Nordic Roast Co. (Specialty Coffee)" },
  @{ Name = "Store05-KeyCraftLabs"; Port = 5185; Title = "KeyCraft Labs (Custom Keyboards)" },
  @{ Name = "Store06-VeloCoreAthletics"; Port = 5186; Title = "VeloCore Athletics (Activewear)" },
  @{ Name = "Store07-AtelierForma"; Port = 5187; Title = "Atelier Forma (Bauhaus Furniture)" },
  @{ Name = "Store08-MaisonCacao"; Port = 5188; Title = "Maison Cacao (Parisian Chocolatier)" },
  @{ Name = "Store09-PawAndCobble"; Port = 5189; Title = "Paw & Cobble (Eco-Luxury Pet)" },
  @{ Name = "Store10-CanvasCurator"; Port = 5190; Title = "Canvas & Curator (Fine Art Gallery)" }
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  GIG 2: 10 RADICALLY DIFFERENT E-COMMERCE STORES + HUB" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# Start Master Showroom Hub
Write-Host "Starting Master Showroom Hub on http://localhost:5180 ..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node 'c:\Users\Ch.Suraj Reddy\Desktop\Portfolio-1\Gig2\serve_hub.js'"

foreach ($s in $stores) {
  Write-Host "Starting $($s.Title) on http://localhost:$($s.Port) ..." -ForegroundColor Green
  Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Ch.Suraj Reddy\Desktop\Portfolio-1\Gig2\$($s.Name)'; npx vite --port $($s.Port)"
}

Write-Host "`nAll 11 servers running! Open http://localhost:5180 for the Master Showroom Hub." -ForegroundColor Cyan
