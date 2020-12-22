# Getting Started

## (1) Importing aggregate data to DHIS2

One of the first things you’ll need to do is identify the specific DHIS2 `data set` that you plan to integrate your Go.Data data with. In DHIS2, aggregate data captured as `dataValueSets` and is further defined across different dimensions called `orgUnit`, `period`, and `dataElement` & `categories`. 

### Data sets
Users will need to know the specific name and ID of the destination `dataSet` in DHIS2. You will need to obtain the ID from the test or production DHIS2 environment.

### Organisation units
Aggregation by location in Go.Data is based on your `Location` hierarchy. Your `Locations` must align with DHIS2 `organisation units`. You will need to specify the DHIS2 `orgUnit` ID in order to upload aggregate results. 

### Period
All aggregate data reported is associated with a specific DHIS2 reporting `period`, which may be daily, weekly, monthly, yearly, etc. depending on the DHIS2 implementation. Examples: `20201205`, `202012`, `2020`

### Data elements
Calculations for DHIS2 `indicators` are based on `dataElements`. For each DHIS2 data element, you will need to calculate the summary `value` to send to DHIS2. You will need to know both the `value` and `dataElement` DHIS2 Id in order to upload new `dataValues`. 

### Categories
Categories are another dimension commonly used to define data elements in aggregate reporting...  

### Example steps for preparing data import for New Measles Cases
#### Step 1. Identify the `orgUnit` for which this data will be submitted

- In this example,  we will use the **[Gbenikoro MCHP](https://play.dhis2.org/2.35.1/api/organisationUnits/y77LiPqLMoq)** organisation unit from DHIS2 play instance.
- The `Id` of this `orgUnit` is `y77LiPqLMoq`
- You can get a list of available organisation units by inspecting the results of this [endpoint](https://play.dhis2.org/2.35.1/api/organisationUnits).

#### Step 2. Identify the `period` for which this data will be submitted

- In this example, we will use `202011` as the month of reporting
- You can learn about the `allowed reporting frequency` for a given `dataSet` by inspecting the result of the call to this [endpoint](https://play.dhis2.org/2.35.1/api/dataSets/eZDhcZi6FLP), on a property named `periodType`

#### Step 3. Identify the `dataSet` associated with the data you will be uploading
- A `data value set` represents a set of data values which have a logical relationship, usually from being captured off the same data entry form or by belonging to the same `dataSet`.
- So this step helps you identify that **logical grouping** of the **data values** you will be uploading.
- In this example,  we will use the **[Morbidity data set](https://play.dhis2.org/2.35.1/api/dataSets/eZDhcZi6FLP)** from DHIS2 play instance, of which, the data element used to collect data values for Measles cases, is a member.
- We would need to find and take note of the `id(eZDhcZi6FLP)` of the `Morbidity data set`.
- You can get the list of available `dataSets` for a given `orgUnit` by inspecting the results of this [endpoint](https://play.dhis2.org/2.35.1/api/dataSets?orgUnit=y77LiPqLMoq)

#### Step 4. Identify the dataElement Id(s) (in this case the `Id` of [`Measles new`](https://play.dhis2.org/2.35.1/api/dataElements/GCvqIM3IzN0) data element)

- The `Id` of the `Measles new` dataElement is `GCvqIM3IzN0`
- You can get the list of available `dataElements` for a given `dataSet` by inspecting the results of this [endpoint](https://play.dhis2.org/2.35.1/api/dataElements?orgUnit=y77LiPqLMoq&dataSet=eZDhcZi6FLP&pageSize=1035&fields=*).
- Note also that you are **not limited** to working with `only one data element`. 
- You can include all or as many data elements as data is available for. But in this example we will only send data for **one** data element(**Measles new**), for brevity.

#### Step 5. Identify the CategoryComboOptions(Disaggregate Options) associated with a given data element

- In this example, the CategoryComboOptions associated with the `Measles new` data element can be found [here](https://play.dhis2.org/2.35.1/api/categoryOptionCombos?fields=*&filter=categoryCombo.id:eq:t3aNCvHsoSn), or as below:
```
{ "id": "S34ULMcHMca","name": "0-11m", "id": "wHBMVthqIX4","name": "12-59m",  "id": "SdOUI2yT46H","name": "5-14y", "id": "jOkIbJVhECg","name": "15y+"}
```
- Take note of the `Id`(s).

#### Step 6. Based on the information collected in steps `1-5`, design the `payload` to be uploaded to DHIS2 as shown below
- Also note that a given `data element` can be **repeated multiple times** in the payload, equivalent to the number of `categoryOptionCombos`(disaggregates) designated for that data element
- In this case, `data values` for the **same data element(GCvqIM3IzN0)** is repeated **4 times**, equivalent to `categoryOptionCombo` values `0-11m(S34ULMcHMca)`, `12-59m(wHBMVthqIX4)`, `5-14y(SdOUI2yT46H)` and `15y+(jOkIbJVhECg)`, respectively:
```json
{
    "dataValues": [
         {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": "60"
        },
        {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": "45"
        },
        {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": "3"
        },
        {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": "70"
        }     
    ]
}
```

#### Setp 7. Uploading data to DHIS2

- There are two ways **aggregate data** can be uploaded to DHIS2:

##### _a.) Upload data and associate it with a `dataSet`_

  - In this case, you will need to modify the `payload` in `Step 6` to look as below. Note the use of `completeDate` to denote the `date` the `data set was completed or entered`:
  
  ```josn
  {
  "dataSet": "eZDhcZi6FLP",
  "completeDate": "2011-11-01",
  "period": "202011",
  "orgUnit": "y77LiPqLMoq",
    "dataValues": [
         {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "S34ULMcHMca",
            "value": "60"
        },
        {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "wHBMVthqIX4",
            "value": "45"
        },
        {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "SdOUI2yT46H",
            "value": "3"
        },
        {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "jOkIbJVhECg",
            "value": "70"
        }     
    ]
}
  ```
##### _b.) Upload data without associating it with a `dataSet`(useful for Bulk uploading data for various orgUnits and Periods in a single request)_
  - In this case, you will **not need** to modify the `payload` in `Step 6`:
  ```json
  {
    "dataValues": [
         {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": "60"
        },
        {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": "45"
        },
        {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": "3"
        },
        {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": "70"
        }     
    ]
}
  ```
  
#### Step 8. Tools for uploading to DHIS2

##### _1. OpenFn DHIS2 Adaptor_

- You can use the [`createDataValueSet`](https://github.com/OpenFn/language-dhis2#current-fetchdata-api-expression-optional-posturl-for-a-complete-fetch) helper function of the adaptor to upload the data, or 

##### _2.  Http Client_

- You can use any http client such as [`curl`](https://github.com/curl/curl), [`axios`](https://github.com/axios/axios) or [`postman`](https://www.postman.com/) to upload the data via the http`POST` request to this endpoint: https://play.dhis2.org/2.35.1/api/dataValueSets

###### Notes
- Note that you can easily get a **template of the dataValueSets Payload** by querying the `dataSets` endpoint as in the example,below:
```json
GET https://play.dhis2.org/2.35.1/api/dataSets/eZDhcZi6FLP/dataValueSet.json?orgUnit=y77LiPqLMoq&period=202011
```
_where `eZDhcZi6FLP` is the `dataSet Id` for the data set you wish to upload, `orgUnit` is the organisation unit for which you are submitting data, `period` is the reporting month_

- This would return a result that would help you easily identify the data element `Ids` available, associated `categoryOptionCombos` and their possibble combinations, and the `expected structure` of the `payload`, for a given `dataSet`, as shown in the example below. 
- After the template is generated for you by the `api`, your task would then be to **replace** the `values` with the ones you are uploading.
- Note also that this **generated template** enables us to **send data values** for **various periods and org units**, in a **single http POST request**:

```json
{
    "dataValues": [
        {
            "dataElement": "hfuTiKOkuKs",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "hfuTiKOkuKs",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "yqBkn9CWKih",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "yqBkn9CWKih",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "iIBbZPAqnMt",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "iIBbZPAqnMt",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        ...
        // Removed some data elements here, for brevity
        ...
        {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        }
    ]
}
```
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
