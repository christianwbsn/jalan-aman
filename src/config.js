const config = {
  production: {
    API_URL: 'http://example.com',
    GMAPS_API_KEY: 'AIzaSyAgjZh8SHgEypVCNwbAoZc4s7Sc1OgjYMg',
  },
  development: {
    API_URL: 'http://example.dev',
    GMAPS_API_KEY: 'AIzaSyAgjZh8SHgEypVCNwbAoZc4s7Sc1OgjYMg',
  },
};

export default config[process.env.NODE_ENV || 'development'];
