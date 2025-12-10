package main

import (
	"fmt"
	"net/http"

	"example.com/fileShareServer/api"
)

func main() {
	PORT := 8080
	router := http.NewServeMux()
	router.HandleFunc("/api/uploadHandler", api.FileHandler)
	router.HandleFunc("/api/getFileNamesHandler", api.SendFileNames)
	router.HandleFunc("/api/sendFileHandler", api.SendFileToClient)

	fmt.Printf("Listening on port %d\n", PORT)
	fmt.Println("=======================================================================")
	err := http.ListenAndServe(":8080", router)
	if err != nil {
		panic("error starting server")
	}
}
