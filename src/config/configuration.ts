

export default () => {
    return {
        port: parseInt(process.env.PORT, 10) || 3000,
        portalAppBaseUrl: process.env.PORTAL_APP_BASE_URL || 'http://localhost:3000',
        apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001',
        jwt:{
            secret: process.env.JWT_SECRET || 'my-random-secret',
            expiry: process.env.JWT_EXPIRY || '1d',
        }
    }}