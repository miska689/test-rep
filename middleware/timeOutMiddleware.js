import ServiceController from "../controller/serviceController.js";

const rateLimit = 20;
const interval = 60 * 1000;

const requestCounts = {};

// Reset request count for each IP address every 'interval' milliseconds
setInterval(() => {
    Object.keys(requestCounts).forEach((ip) => {
        requestCounts[ip] = 0; // Reset request count for each IP address
    });
}, interval);

// Middleware function for rate limiting and timeout handling
function rateLimitAndTimeout(req, res, next) {
    const ip = req.ip; // Get client IP address

    // Update request count for the current IP
    requestCounts[ip] = (requestCounts[ip] || 0) + 1;

    // Check if request count exceeds the rate limit
    if (requestCounts[ip] > rateLimit) {
        // Respond with a 429 Too Many Requests status code
        return res.status(429).json({
            code: 429,
            status: "Error",
            message: "Rate limit exceeded.",
            data: null,
        });
    }

    // Set timeout for each request (example: 10 seconds)
    req.setTimeout(15000, () => {
        // Handle timeout error
        res.status(504).json({
            code: 504,
            status: "Error",
            message: "Gateway timeout.",
            data: null,
        });
        req.abort(); // Abort the request
    });

    next(); // Continue to the next middleware
}

export {rateLimitAndTimeout};