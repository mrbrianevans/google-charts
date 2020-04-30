 # Daily improvement map
This shows a graph of America divided by states, showing the average number of days since cases started going down in that state (by county).
<hr>

- The PHP file pulls the last 14 days of case data from John Hopkins for each county in America.
- It loops through each day for each county, counting how many consecutive days there has been a lower number of new cases than the previous day.
- It then loops though each state and averages the number of days (only for including counties with more than 1 case) of a decline in new cases, county by county
- It passes the data in a format usable by Google Charts DataTable objects

<hr>

- The JavaScript makes an asynchronous call to the PHP script (it can take around 8 seconds to return)
- When the response is received, it converts the data (passed in JSON format) to a DataTable object
- Chart options are specified, and the chart is drawn

Here is an example of the output chart:

![Geo Chart of America showing decline in COVID cases](coronavirus/daily-improvement-map/example-screenshot.png)
