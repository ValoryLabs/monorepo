package main

import (
	config "github.com/ValoryLabs/monorepo/app"
	fiber_middleware "github.com/ValoryLabs/monorepo/app/middlewares"
	routes "github.com/ValoryLabs/monorepo/app/routes"
	utils "github.com/ValoryLabs/monorepo/app/utils"
	"github.com/gofiber/fiber/v2"

	_ "github.com/joho/godotenv/autoload" // load .env file automatically
)

func main() {
	config := config.FiberConfig()

	app := fiber.New(config)

	fiber_middleware.FiberMiddleware(app)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	routes.UsersRoutes(app)

	utils.StartServer(app)
}
