package fiber_middleware

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func FiberMiddleware(a *fiber.App) {
	a.Use(
		cors.New(),
		logger.New(),
		limiter.New(limiter.Config{
			Expiration: 60 * time.Second,
			Max:        10,
		}),
	)
}
