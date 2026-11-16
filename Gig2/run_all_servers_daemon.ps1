# Start Port 5180 Master Showroom Hub
$processes = @()
$hubProc = Start-Process -FilePath "node" -ArgumentList "c:\Users\Ch.Suraj Reddy\Desktop\Portfolio-1\Gig2\serve_hub.js" -WorkingDirectory "c:\Users\Ch.Suraj Reddy\Desktop\Portfolio-1\Gig2" -PassThru -NoNewWindow
$processes += $hubProc
Write-Host "Started Master Showroom Hub (PID: $($hubProc.Id)) on port 5180"

$stores = @(
  @{ Name = "Store01-VanguardChrono"; Port = 5181 },
  @{ Name = "Store02-ZeroGravityNYC"; Port = 5182 },
  @{ Name = "Store03-AuraBotanica"; Port = 5183 },
  @{ Name = "Store04-NordicRoast"; Port = 5184 },
  @{ Name = "Store05-KeyCraftLabs"; Port = 5185 },
  @{ Name = "Store06-VeloCoreAthletics"; Port = 5186 },
  @{ Name = "Store07-AtelierForma"; Port = 5187 },
  @{ Name = "Store08-MaisonCacao"; Port = 5188 },
  @{ Name = "Store09-PawAndCobble"; Port = 5189 },
  @{ Name = "Store10-CanvasCurator"; Port = 5190 }
)

foreach ($s in $stores) {
  $dir = "c:\Users\Ch.Suraj Reddy\Desktop\Portfolio-1\Gig2\$($s.Name)"
  $p = Start-Process -FilePath "npx.cmd" -ArgumentList "vite", "--port", "$($s.Port)" -WorkingDirectory $dir -PassThru -NoNewWindow
  $processes += $p
  Write-Host "Started $($s.Name) (PID: $($p.Id)) on port $($s.Port)"
}

# Wait on all processes
$processes | Wait-Process
