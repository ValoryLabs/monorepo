package main

import (
	"os"

	config "github.com/ValoryLabs/monorepo/app"
	fiber_middleware "github.com/ValoryLabs/monorepo/app/middlewares"
	routes "github.com/ValoryLabs/monorepo/app/routes"
	utils "github.com/ValoryLabs/monorepo/app/utils"
	"github.com/gofiber/fiber/v2"

	_ "github.com/joho/godotenv/autoload" // load .env file automatically

	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humafiber"
)

func main() {
	config := config.FiberConfig()

	app := fiber.New(config)

	fiber_middleware.FiberMiddleware(app)

	humaConfig := huma.DefaultConfig("Valory API", "1.0.0")
	humaConfig.Info.Description = "Valory API"

	humaConfig.OpenAPIPath = "/openapi"
	humaConfig.DocsPath = ""
	humaConfig.SchemasPath = "schemas"

	humaConfig.Servers = []*huma.Server{
		{URL: "http://" + os.Getenv("SERVER_URL") + "/", Description: "Development server"},
	}

	api := humafiber.New(app, humaConfig)

	app.Get("/docs", func(c *fiber.Ctx) error {
		var html = []byte(`<!doctype html>
<html>
<head>
    <title>Valory API Documentation</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        body { margin: 0; }
    </style>
</head>
<body>
    <script
        id="api-reference"
        data-url="/openapi.json"
        data-configuration='{"theme": "alternate"}'></script>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
</body>
</html>`)
		c.Set("Content-Type", "text/html")
		return c.Send(html)
	})

	routes.UsersRoutes(app, api)
	routes.PingRoutes(app, api)

	utils.StartServer(app)
}
