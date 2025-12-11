package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/shirou/gopsutil/v3/disk"
)

type DiskUsage struct {
	Total       uint64 `json:"total"`
	Free        uint64 `json:"free"`
	UsedPercent int    `json:"used"`
}

// req body empty need to get system stats using os , convert it to json object
// then encode the struct to json and send the struct over http to the client
// containing the system info (use json new encoder encode the message)
func GetStorageHandler(res http.ResponseWriter, req *http.Request) {
	usage, err := disk.Usage("/")
	if err != nil {
		panic(err)
	}
	fmt.Printf("Total: %v GB\n", usage.Total/1024/1024/1024)
	fmt.Printf("Used: %v GB\n", usage.Used/1024/1024/1024)
	fmt.Printf("Free: %v GB\n", usage.Free/1024/1024/1024)
	fmt.Printf("Used Percent type %T\n", usage.UsedPercent)
	percentInt := int(usage.UsedPercent)
	if err != nil {
		panic("error converting string back to int")
	}

	diskUsage := DiskUsage{
		Total:       usage.Total / 1024 / 1024 / 1024,
		Free:        usage.Free / 1024 / 1024 / 1024,
		UsedPercent: percentInt,
	}

	err = json.NewEncoder(res).Encode(diskUsage)
	if err != nil {
		http.Error(res, "error retreving disk stats from fs", http.StatusInternalServerError)
	}
}
