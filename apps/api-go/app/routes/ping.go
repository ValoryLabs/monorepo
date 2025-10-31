package routes

import (
	controllers "github.com/ValoryLabs/monorepo/app/controllers"
	"github.com/danielgtaylor/huma/v2"
	"github.com/gofiber/fiber/v2"
)

func PingRoutes(app *fiber.App, api huma.API) {
	huma.Get(api, "/ping", controllers.Ping)
}
