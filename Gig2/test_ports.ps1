5180..5190 | ForEach-Object {
    $port = $_
    try {
        $res = Invoke-WebRequest -Uri "http://localhost:$port" -UseBasicParsing -TimeoutSec 3
        Write-Output "Port $port : $($res.StatusCode) OK"
    } catch {
        Write-Output "Port $port : FAILED"
    }
}
