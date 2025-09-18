package routes

import (
	controllers "github.com/ValoryLabs/monorepo/app/controllers"
	"github.com/gofiber/fiber/v2"
)

func UsersRoutes(a *fiber.App) {
	route := a.Group("/api/v1")
	route.Get("/users", controllers.GetUsers)
}
