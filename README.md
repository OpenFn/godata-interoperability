# Getting Started

## (1) Importing aggregate data to DHIS2

In DHIS2, aggregate data is captured as `dataValues` and is further defined across dimensions: `orgUnit`, `period`, and `dataElement` & `categories`. 

Once you have designed your hierarchies, calculations, and workflows, there are a few key configurations that need to be made.

### Organisation units
Aggregation by location in Go.Data is based on your `Location` hierarchy. Your `Locations` must align with DHIS2 `organisation units`. You will need to specify the DHIS2 `orgUnit` ID in order to upload aggregate results. 

### Period
All aggregate data reported is associated with a specific DHIS2 reporting `period`, which may be daily, weekly, monthly, yearly, etc. depending on the DHIS2 implementation. Examples: `20201205`, `202012`, `2020`

### Data sets
Users will need to know the specific name and ID of the destination `dataSet` in DHIS2. You will need to obtain the ID from the test or production DHIS2 environment.

### Data elements
Calculations for DHIS2 `indicators` are based on `dataElements`. For each DHIS2 data element, you will need to calculate the summary `value` to send to DHIS2. You will need to know both the `value` and `dataElement` DHIS2 Id in order to upload new `dataValues`. 

### Categories
Categories are another dimension commonly used to define data elements in aggregate reporting...  

### Learn More
Read more about setting up DHIS2 aggregated reporting [here](https://docs.dhis2.org/2.31/en/user/html/setting_up_reporting.html), and learn about [DHIS2 aggregation strategies](https://docs.dhis2.org/master/en/implementer/html/aggregation-strategy-in-dhis2.html). 

## (2) Fetching data from [HealthSites.io](https://healthsites.io/api/docs/) api

You can fetch data from [HealthSites.io](https://healthsites.io/api/docs/) api using the OpenFn [5a - GET Health Sites Data](https://openfn.org/projects/3037/jobs/3849) job:

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
