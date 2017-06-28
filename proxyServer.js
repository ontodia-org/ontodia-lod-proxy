const path = require('path');
const express = require('express');
const request = require('request');

module.exports = {
  app: function () {
    const app = express();

    app.get('/lod-proxy/*', function(req, res){
      const prefix = '/lod-proxy/';
      const index = req.originalUrl.indexOf(prefix) + prefix.length;
      const resultUrl = req.originalUrl.substring(index, req.originalUrl.length);

      console.log('Redirect to ' + resultUrl)
      
      const options = {
        // host to forward to
        url: resultUrl,
        // path to forward to
        method: 'GET',
        headers: {
          accept: req.headers.accept,
        }
      };

      request(options, function (error, response, body) {
        res.write(body);
        res.end();
      })
    });

    return app;
  }
}
