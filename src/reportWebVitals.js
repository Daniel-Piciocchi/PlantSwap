const reportWebVitals = onPerfEntry => {
  // Check if the onPerfEntry callback is provided and is a function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import 'web-vitals' library and then execute the callback functions to report performance metrics
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call the getCLS, getFID, getFCP, getLCP, and getTTFB functions with the onPerfEntry callback as an argument
      // These functions will report the Core Web Vitals metrics to the onPerfEntry callback
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
