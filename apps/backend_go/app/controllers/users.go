package controllers

import (
	"github.com/gofiber/fiber/v2"
)

func GetUsers(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "Get users controller",
	})
}
