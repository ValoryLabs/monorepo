package utils

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
)

func StartServer(a *fiber.App) {
	// Run server.
	if err := a.Listen(os.Getenv("SERVER_URL")); err != nil {
		log.Printf("Oops... Server is not running! Reason: %v", err)
	}
}
