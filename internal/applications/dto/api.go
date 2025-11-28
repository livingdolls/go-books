package dto

import (
	"encoding/json"
	"net/http"
)

type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

func NewAPIResponse(success bool, message string, data interface{}) *APIResponse {
	return &APIResponse{
		Success: success,
		Message: message,
		Data:    data,
	}
}

func WriteJSONResponse(w http.ResponseWriter, statusCode int, response *APIResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	_ = json.NewEncoder(w).Encode(response)
}
