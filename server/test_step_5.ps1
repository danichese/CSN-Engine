# Ensure server is running on localhost:3001 before running this.

# 1. Initialize Session
Write-Host "Initializing Session..."
$initResponse = Invoke-RestMethod -Uri "http://localhost:3001/api/chat" -Method Post -ContentType "application/json" -Body '{}'
$sid = $initResponse.sessionId
Write-Host "Session ID: $sid"
Write-Host "Initial State: $($initResponse.state)"
Write-Host "Response: $($initResponse.response)"
Write-Host "--------------------------------"

# 2. Send Message 1 (State 1 -> 2)
Write-Host "Sending 'I need a permit' (expecting State 1 response)..."
$res1 = Invoke-RestMethod -Uri "http://localhost:3001/api/chat" -Method Post -ContentType "application/json" -Body (@{sessionId=$sid; message="I need a permit"} | ConvertTo-Json)
Write-Host "State: $($res1.state)"
Write-Host "Response: $($res1.response)"
Write-Host "--------------------------------"

# 3. Send Message 2 (State 2 -> 3)
Write-Host "Sending 'I need a permit' again (expecting State 2 response)..."
$res2 = Invoke-RestMethod -Uri "http://localhost:3001/api/chat" -Method Post -ContentType "application/json" -Body (@{sessionId=$sid; message="I need a permit"} | ConvertTo-Json)
Write-Host "State: $($res2.state)"
Write-Host "Response: $($res2.response)"
Write-Host "--------------------------------"

# 4. Send Message 3 (State 3 -> 4)
# This seems to be what you wanted to test in Step 5 (State 2-3 transition or acting IN state 3)
Write-Host "Sending 'Please?' (expecting State 3 response)..."
$res3 = Invoke-RestMethod -Uri "http://localhost:3001/api/chat" -Method Post -ContentType "application/json" -Body (@{sessionId=$sid; message="Please?"} | ConvertTo-Json)
Write-Host "State: $($res3.state)"
Write-Host "Screen Shake: $($res3.screenShake)"
Write-Host "Response: $($res3.response)"
Write-Host "--------------------------------"
