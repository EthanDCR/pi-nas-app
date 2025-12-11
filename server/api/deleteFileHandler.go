package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type response struct {
	Message string `json:"message"`
}

func DeleteFile(res http.ResponseWriter, req *http.Request) {
	fileName := req.URL.Query().Get("fileName")
	filePath := "uploads/" + fileName
	err := os.Remove(filePath)
	if err != nil {
		resStruct := response{
			Message: "failure to delete selected file",
		}
		json.NewEncoder(res).Encode(resStruct)
	}
	fmt.Printf("Successfully deleted file: %s ", fileName)

	res.WriteHeader(http.StatusOK)

	resStruct := response{
		Message: "Successfully deleted selected file",
	}
	json.NewEncoder(res).Encode(resStruct)
}
