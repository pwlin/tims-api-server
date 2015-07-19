TIMS API SERVER
===============

A REST API server for consuming London's live traffic disruptions data via [Traffic Information Management System (TIMS) feed ](https://api-portal.tfl.gov.uk/docs) which is provided by TfL (Transport for London).

Installation
------------
- Install all dependencies:

        npm install
- Rename `config.json.sample` to `config.json` and add your TIMS' `app_id` and `app_key`
- Run the server

        npm start
- If anything went well, your TIMS API server is now running at: `http://localhost:3000`

Current REST Endpoints
----------------------

`/disruptions` : Get a list of all disruptions in JSON format.

Using JSONP
-----------

If you want your response in [JSONP format](https://en.wikipedia.org/wiki/JSONP), append a `callback` query string to your request:

        http://localhost:3000/disruptions?callback=JSON_CALLBACK

Example Front end
-----------------
To see what you can do with this data, install [TIMS MAP UI](https://github.com/pwlin/tims-map-ui) app which shows all London's traffic disruptions. 


LICENSE
--------
The MIT License (MIT)

Copyright (c) 2015 pwlin - pwlin05@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

