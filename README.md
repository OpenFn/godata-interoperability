# Getting Started

## Fetching data from HealthSites.io api

You can fetch data from [HealthSites.io api](https://healthsites.io/api/docs/) using the OpenFn [GET Health Sites Data](https://openfn.org/projects/3037/jobs/3849) job:

1. Login into [OpenFn](https://openfn.org/)
2. Go to the `Jobs` section
3. Find a job named `5a - GET Health Sites Data`
4. Click on `View`
5. Click on the `pencil` icon to **edit** the **endpoint** of the data you want to fetch, as in the steps below:

   - While in the **edit mode**:

     a). Edit Endpoint

     - Find a section named `alterState`
     - Edit the `url` and `description` of the `endpoint` [code block](https://github.com/OpenFn/godata-interoperability/blob/33dbde29609e105ad0cd5c44ebb77dbee98ffe1f/jobs/5a-GETHealthSitesData.js#L34-L37), to your desired `url` and `description`
     - Or, you can use any of the **example endpoints** listed at the beggining of the job

     b). Edit Query Parameters

     - Find a section named `alterState`
     - Find the `query` [code block](https://github.com/OpenFn/godata-interoperability/blob/33dbde29609e105ad0cd5c44ebb77dbee98ffe1f/jobs/5a-GETHealthSitesData.js#L42-L46)

     - Change the `country` parameter to fetch data for a given country
     - Change the `page` parameter to fetch data on a given page, from the api paginated result
     - Add any `other parameter`, supported by a given `endpoint`, to filter the returned results

6. Click on the `disc` icon to **save** the changes
7. Click on the `play` icon to **run** the job and fetch the desired data
8. Go to the `inbox` section and click on the respective messages
9. Click on `Message Body` to view the details of the data returned from **HealthSites.io**
