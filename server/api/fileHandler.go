package api

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func FileHandler(res http.ResponseWriter, req *http.Request) {
	fileStream, metaData, err := req.FormFile("file")
	if err != nil {
		panic("error getting the bytes from uploaded file")
	}

	fmt.Printf("Recived file:  %s\n", metaData.Filename)
	rawBytes, err := io.ReadAll(fileStream)
	if err != nil {
		panic("error converting fileStream into bytes to view")
	}

	filePath := "uploads/" + metaData.Filename

	err = os.WriteFile(filePath, rawBytes, 0o600)
	if err != nil {
		panic("error writing file to filesystem")
	}

	fileStream.Close()
}
