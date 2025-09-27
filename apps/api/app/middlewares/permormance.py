import time
import logging
from typing import Dict, Any

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

logger = logging.getLogger(__name__)


class PerformanceMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, slow_request_threshold: float = 1.0):
        super().__init__(app)
        self.slow_request_threshold = slow_request_threshold
        self._request_stats: Dict[str, Any] = {
            "total_requests": 0,
            "slow_requests": 0,
            "avg_response_time": 0.0,
            "max_response_time": 0.0
        }

    async def dispatch(self, request: Request, call_next):
        start_time = time.perf_counter()
        
        # Extract request info for logging
        method = request.method
        path = request.url.path
        client_ip = request.client.host if request.client else "unknown"
        
        try:
            response = await call_next(request)
            process_time = time.perf_counter() - start_time
            
            # Add performance headers
            response.headers["X-Process-Time"] = f"{process_time:.6f}"
            response.headers["X-Server-Time"] = str(int(time.time()))
            
            # Update stats
            self._update_stats(process_time)
            
            # Log slow requests
            if process_time > self.slow_request_threshold:
                logger.warning(
                    f"Slow request detected: {method} {path} took {process_time:.3f}s "
                    f"from {client_ip} (status: {response.status_code})"
                )
                self._request_stats["slow_requests"] += 1
            
            # Log request for monitoring
            logger.debug(
                f"{method} {path} - {response.status_code} - "
                f"{process_time:.3f}s - {client_ip}"
            )
            
            return response
            
        except Exception as e:
            process_time = time.perf_counter() - start_time
            logger.error(
                f"Request error: {method} {path} took {process_time:.3f}s "
                f"from {client_ip} - Error: {str(e)}"
            )
            raise

    def _update_stats(self, process_time: float):
        """Update internal performance statistics."""
        self._request_stats["total_requests"] += 1
        
        # Update average (simple moving average)
        current_avg = self._request_stats["avg_response_time"]
        total_requests = self._request_stats["total_requests"]
        self._request_stats["avg_response_time"] = (
            (current_avg * (total_requests - 1) + process_time) / total_requests
        )
        
        # Update max
        if process_time > self._request_stats["max_response_time"]:
            self._request_stats["max_response_time"] = process_time

    def get_stats(self) -> Dict[str, Any]:
        """Get current performance statistics."""
        return self._request_stats.copy()
