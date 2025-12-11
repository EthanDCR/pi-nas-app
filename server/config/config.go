package config

//- Has a Config struct with fields like Port, UploadDir, Host
//   - Has a Load() function that reads environment variables using os.Getenv()
//  - Provides defaults if env vars aren't set (for convenience)
// - Returns the config struct
//2. In main.go - Import your config package and load it once at startup:
// cfg := config.Load()
// Then use cfg.UploadDir, cfg.Port, etc.
//3. Pass config to your handlers - Either through function parameters or make it globally accessible

type Config struct {
	PORT      int
	Host      string
	UploadDir string
	Load      func() string
}


Config.Load = func() string{

}
