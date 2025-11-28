package dto

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
