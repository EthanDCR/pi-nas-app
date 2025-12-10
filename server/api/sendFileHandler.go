package api

import (
	"fmt"
	"net/http"
)

func SendFileToClient(res http.ResponseWriter, req *http.Request) {
	fileName := req.URL.Query().Get("fileName")
	fmt.Printf("url param: %v\n type: %T\n", fileName, fileName)
	filePath := "uploads/" + fileName
	fmt.Printf("attemting to send file from path: %s", filePath)
	http.ServeFile(res, req, filePath)
}
