$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$nodePath = 'C:\Program Files\nodejs\node.exe'
$serverScript = Join-Path $projectRoot 'serve-dist.mjs'

Set-Location $projectRoot
& $nodePath $serverScript
