const env = process.env.NODE_ENV;

if(
  !process.env.DATABASE ||
  !process.env.LOG_FILE_PATH ||
  !process.env.EMAIL_ADDRESS_FROM ||
  !process.env.EMAIL_PASSWORD ||
  !process.env.EMAIL_ADDRESS_TO ||
  !process.env.CLOUDINARY_COULD_NAME ||
  !process.env.CLOUDINARY_KEY ||
  !process.env.CLOUDINARY_SECRET
) {
  throw new Error('Please check your environment variables.')
}

const dev = {
  app: {
    serverPort: process.env.SERVER_PORT || 4101,
    clientPort: process.env.CLIENT_PORT || 4100,
    host: process.env.SERVER_HOST || 'http://localhost'
  },
  db: {
    connectionString: process.env.DATABASE
  },
  logs: {
    filePath: process.env.LOG_FILE_PATH
  },
  email: {
    emailAddressFrom: process.env.EMAIL_ADDRESS_FROM,
    emailPassword: process.env.EMAIL_PASSWORD,
    emailAddressTo: process.env.EMAIL_ADDRESS_TO
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_COULD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET
  }
}

const config = { dev };

module.exports = config[env];