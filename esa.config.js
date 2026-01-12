export default {
  runtime: 'edge',
  regions: ['global'],
  build: {
    command: 'npm run build',
    output: 'dist'
  },
  environment: {
    OPENAI_API_KEY: process.env.ESA_OPENAI_API_KEY
  },
  routes: [
    {
      src: '/api/chat',
      dest: '/edge-functions/chat/api.js'
    },
    {
      src: '/(.*)',
      dest: '/dist/$1'
    }
  ]
};
