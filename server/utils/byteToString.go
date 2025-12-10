package utils

// converts an array of Unit8 its (bytes) into a single string like a text file
func ByteToString(bytes []byte) (fileString string) {
	for _, byteValue := range bytes {
		char := string(byteValue)
		fileString += char
	}
	return fileString
}
