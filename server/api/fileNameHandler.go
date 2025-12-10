package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type FileNames struct {
	FileNames []string `json"fileNames"`
}

func makeFileNamesStruct(files []string) FileNames {
	return FileNames{
		FileNames: files,
	}
}

func SendFileNames(res http.ResponseWriter, req *http.Request) {
	data, err := os.ReadDir("uploads")
	if err != nil {
		panic("error reading uploads directory")
	}
	fileNames := make([]string, 0, len(data))
	for _, element := range data {
		fileNames = append(fileNames, element.Name())
	}
	filesToSend := makeFileNamesStruct(fileNames)
	if err != nil {
		panic("erorr creating the struct to send to client")
	}
	fmt.Printf("Type: %T\n Value: %v\n", data, data)
	json.NewEncoder(res).Encode(filesToSend)
}
