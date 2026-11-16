$stores = 1..10 | ForEach-Object {
    $num = "{0:D2}" -f $_
    (Get-ChildItem -Path "c:\Users\Ch.Suraj Reddy\Desktop\Portfolio-1\Gig2" -Directory -Filter "Store$num*").FullName
}

$results = @()

foreach ($dir in $stores) {
    $name = Split-Path $dir -Leaf
    Write-Host "Verifying $name ..." -ForegroundColor Yellow
    Push-Location $dir
    $out = npx vite build 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  [PASS] $name build OK" -ForegroundColor Green
        $results += [PSCustomObject]@{ Store = $name; Status = "PASS" }
    } else {
        Write-Host "  [FAIL] $name build failed" -ForegroundColor Red
        $results += [PSCustomObject]@{ Store = $name; Status = "FAIL" }
    }
    Pop-Location
}

$results | Format-Table -AutoSize
