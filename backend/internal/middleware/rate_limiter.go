package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)


	func RateLimiterMiddleware(rps int) gin.HandlerFunc {
		type client struct {
			limiter *rate.Limiter
			lastSeen time.Time
		}

		var (
			mu sync.Mutex

			clients = make(map[string]*client)
		)

		go func() {
			for {
					time.Sleep(time.Minute)
					mu.Lock()
					for ip, client := range clients {
						if time.Since(client.lastSeen) > 3*time.Minute {
							delete(clients, ip)
					}
			}
			mu.Unlock()
	}
}()

return func(c *gin.Context) {
	ip := c.ClientIP()
	mu.Lock()
	if _, found := clients[ip]; !found {
			clients[ip] = &client{
					limiter: rate.NewLimiter(rate.Limit(rps), 3*rps),
			}
	}
	clients[ip].lastSeen = time.Now()
	if !clients[ip].limiter.Allow() {
			mu.Unlock()
			c.JSON(http.StatusTooManyRequests, gin.H{"error": "Rate limit exceeded"})
			c.Abort()
			return
	}
	mu.Unlock()
	c.Next()
}
}
