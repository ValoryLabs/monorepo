package controllers

import (
	"context"
)

type PingOutput struct {
	Body struct {
		Message string `json:"message" doc:"Pong message"`
	}
}

func Ping(ctx context.Context, input *struct{}) (*PingOutput, error) {

	resp := &PingOutput{}
	resp.Body.Message = "Pong!"

	return resp, nil
}
