# DenoRestAPI Example


## Install Deno via Package Manager (recommended)

### Chocolatey (Windows)
```
choco install deno
```

### Homebrew (Mac)
```
brew install deno
```

## Install Deno via command

### PowerShell (Windows)
```
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

### Shell (Mac)
```
curl -fsSL https://deno.land/x/install/install.sh | sh
```

## Check if installation worked
```
deno --version
```

## Get help
```
deno --help
```

## Start the server
```
deno  run --allow-net server.ts
```

### Example endpoints
```
GET http://localhost:8280/employees
GET http://localhost:8280/employees/1
...

```