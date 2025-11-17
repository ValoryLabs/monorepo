package controllers

import (
	"context"
)

type User struct {
	ID    int    `json:"id" example:"1" doc:"Unique user ID"`
	Name  string `json:"name" example:"John Doe" doc:"User name"`
	Email string `json:"email" example:"john@example.com" doc:"User email"`
}

type GetUsersOutput struct {
	Body struct {
		Users   []User `json:"users" doc:"List of users"`
		Total   int    `json:"total" doc:"Total number of users"`
		Message string `json:"message" doc:"Status message"`
	}
}

func GetUsers(ctx context.Context, input *struct{}) (*GetUsersOutput, error) {
	users := []User{
		{ID: 1, Name: "John Doe", Email: "john@example.com"},
		{ID: 2, Name: "Jane Smith", Email: "jane@example.com"},
	}

	resp := &GetUsersOutput{}
	resp.Body.Users = users
	resp.Body.Total = len(users)
	resp.Body.Message = "Users retrieved successfully"

	return resp, nil
}
