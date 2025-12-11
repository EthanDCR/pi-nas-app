package main

import (
	"fmt"
	"net/http"
	"os"

	"example.com/fileShareServer/api"
)

func main() {
	PORT := 8080
	router := http.NewServeMux()
	router.HandleFunc("/api/uploadHandler", api.FileHandler)
	router.HandleFunc("/api/getFileNamesHandler", api.SendFileNames)
	router.HandleFunc("/api/sendFileHandler", api.SendFileToClient)
	router.HandleFunc("/api/getStorageHandler", api.GetStorageHandler)

	// check for react prod build dir
	_, err := os.ReadDir("../client/dist")
	if err != nil {
		fmt.Printf("Production build not found\nListening on port %d\n", PORT)
		fmt.Println("=======================================================================")
		err := http.ListenAndServe(":8080", router)
		if err != nil {
			panic("error starting server")
		}
	}
	fmt.Printf("Production build found\nListening on port %d\n Access URL: http://192.168.1.175:8080\n", PORT)
	fmt.Println("=======================================================================")
	fs := http.FileServer(http.Dir("../client/dist"))
	router.Handle("/", fs)
	http.ListenAndServe(":8080", router)
}
