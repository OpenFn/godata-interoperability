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

- In this example,  we will use the **[Gbenikoro MCHP](https://play.dhis2.org/2.35.1/api/organisationUnits/y77LiPqLMoq.json)** organisation unit from DHIS2 play instance.
- The `Id` of this `orgUnit` is `y77LiPqLMoq`

#### Step 2. Identify the `period` for which this data will be submitted

- In this example, we will use `202011` as the month of reporting

#### Step 3. Identify the `dataSet` associated with the data you will be uploading

- In this example,  we will use the **[Morbidity data set](https://play.dhis2.org/2.35.1/api/dataSets/eZDhcZi6FLP.json)** from DHIS2 play instance.
- We would need to find and take note of the `id(eZDhcZi6FLP)` of the `Morbidity data set`.

#### Step 4. Identify the dataElement Id(s) (in this case the `Id` of [`Measles new`](https://play.dhis2.org/2.35.1/api/dataElements/GCvqIM3IzN0.json) data element)

- The `Id` of the `Measles new` dataElement is `GCvqIM3IzN0`

#### Step 5. Identify the CategoryComboOptions associated with a given data element

- In this example, the CategoryComboOptions associated with the `Measles new` data element can be found [here](https://play.dhis2.org/2.35.1/api/categoryOptionCombos.json?fields=*&filter=categoryCombo.id:eq:t3aNCvHsoSn), or as below:
```
{ "id": "S34ULMcHMca","name": "0-11m", "id": "wHBMVthqIX4","name": "12-59m",  "id": "SdOUI2yT46H","name": "5-14y", "id": "jOkIbJVhECg","name": "15y+"}
```
- Take note of the `Id`(s).

#### Step 6. Based on the information collected in steps `1-5`, design the `payload` to be uploaded to DHIS2 as shown below:

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

- There are two ways data can be uploaded to DHIS2:

##### _a.) Upload data and associate it with a `dataSet`_

  - In this case, you will need to modify the `payload` in `Step 6` to look as below:
  
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
##### _b.) Upload data without associating it with a `dataSet`_
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

#### # _1. OpenFn DHIS2 Adaptor_

- You can use the [`createDataValueSet`](https://github.com/OpenFn/language-dhis2#current-fetchdata-api-expression-optional-posturl-for-a-complete-fetch) helper function of the adaptor to upload the data, or 

##### _2.  Http Client_

- Any http client such as [`curl`](https://github.com/curl/curl), [`axios`](https://github.com/axios/axios) or [`postman`](https://www.postman.com/) to upload the data via the http`POST` request to this endpoint: https://play.dhis2.org/2.35.1/api/dataValueSets

###### Notes
- Note that you can easily get the template of the `data value sets` by querying the `dataSets` endpoint as in the example,below:
```json
GET https://play.dhis2.org/2.35.1/api/dataSets/eZDhcZi6FLP/dataValueSet.json?orgUnit=y77LiPqLMoq&period=202011
```
_where `eZDhcZi6FLP` is the `dataSet Id`_

- This would return a result that would help you easily identify the data element `Ids` available, associated `categoryOptionCombos` and their possibble combinations, and the `expected structure` of the `payload`, for a given `dataSet`, as shown in the example below. Your task would then be to **replace** the values with the ones you are uploading:

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
        {
            "dataElement": "iIBbZPAqnMt",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "iIBbZPAqnMt",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "wZwzzRnr9N4",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "wZwzzRnr9N4",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "wZwzzRnr9N4",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "wZwzzRnr9N4",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "z9dYcQ2DlBG",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "z9dYcQ2DlBG",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "z9dYcQ2DlBG",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "z9dYcQ2DlBG",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "d92E7cpMvdl",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "d92E7cpMvdl",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "d92E7cpMvdl",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "d92E7cpMvdl",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "wcwbN1jR0ar",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "wcwbN1jR0ar",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "wcwbN1jR0ar",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "wcwbN1jR0ar",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "saMXNnGMaBw",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "saMXNnGMaBw",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "E62UwxnYf26",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "E62UwxnYf26",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "E62UwxnYf26",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "E62UwxnYf26",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "M62VHgYT2n0",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "M62VHgYT2n0",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "QYBJk7sqc1I",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "QYBJk7sqc1I",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "QYBJk7sqc1I",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "QYBJk7sqc1I",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nmh0BSu3vaV",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nmh0BSu3vaV",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nmh0BSu3vaV",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nmh0BSu3vaV",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "eomLLbWJfcx",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "eomLLbWJfcx",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "ArS7VyuL95f",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "ArS7VyuL95f",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "ArS7VyuL95f",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "ArS7VyuL95f",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "BvuQnfq1C4J",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "BvuQnfq1C4J",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "BvuQnfq1C4J",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "BvuQnfq1C4J",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "LaTxwutQILW",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "LaTxwutQILW",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "h0BwBQO9XUf",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "h0BwBQO9XUf",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "h0BwBQO9XUf",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "h0BwBQO9XUf",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "sFMVaj1mHBk",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "sFMVaj1mHBk",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "sFMVaj1mHBk",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "sFMVaj1mHBk",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HJulLfnIAE3",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HJulLfnIAE3",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HJulLfnIAE3",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HJulLfnIAE3",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "P3jJH5Tu5VC",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "P3jJH5Tu5VC",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "P3jJH5Tu5VC",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "P3jJH5Tu5VC",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "q9AIeFQD7zj",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "q9AIeFQD7zj",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "TQnDEASFsVH",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "TQnDEASFsVH",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "TQnDEASFsVH",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "TQnDEASFsVH",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HFw6q0jUFKI",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HFw6q0jUFKI",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Uoj2wmnr5Dw",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Uoj2wmnr5Dw",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Uoj2wmnr5Dw",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Uoj2wmnr5Dw",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "i0vXh1P92m3",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "i0vXh1P92m3",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "i0vXh1P92m3",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "i0vXh1P92m3",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Cm4XUw6VAxv",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Cm4XUw6VAxv",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Cm4XUw6VAxv",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Cm4XUw6VAxv",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nvkbuPrYmDd",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nvkbuPrYmDd",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nvkbuPrYmDd",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nvkbuPrYmDd",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "yJwdE6XJbrF",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "yJwdE6XJbrF",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "yJwdE6XJbrF",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "yJwdE6XJbrF",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "bcxWMsa1ZwU",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "bcxWMsa1ZwU",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "hnwWyM4gDSg",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "hnwWyM4gDSg",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "TBbCcJfZ91x",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "TBbCcJfZ91x",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "TBbCcJfZ91x",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "TBbCcJfZ91x",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Cj5rTc9nEvl",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Cj5rTc9nEvl",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Cj5rTc9nEvl",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Cj5rTc9nEvl",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "XfsVSt4zciP",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "XfsVSt4zciP",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "l76gpVSWoSE",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "l76gpVSWoSE",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HpM1I5qc3Pb",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HpM1I5qc3Pb",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "XTqOHygxDj5",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "XTqOHygxDj5",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "plfo9ai1jtW",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "plfo9ai1jtW",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "plfo9ai1jtW",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "plfo9ai1jtW",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "UXW5hWW8dE1",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "UXW5hWW8dE1",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "UXW5hWW8dE1",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "UXW5hWW8dE1",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "oLfWYAJhZb2",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "oLfWYAJhZb2",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FHD3wiSM7Sn",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FHD3wiSM7Sn",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FHD3wiSM7Sn",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FHD3wiSM7Sn",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "uCVKV6PGGNB",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "uCVKV6PGGNB",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "uCVKV6PGGNB",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "uCVKV6PGGNB",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "RUv0hqER0zV",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "RUv0hqER0zV",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "RUv0hqER0zV",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "RUv0hqER0zV",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "x8gsvCKjGdZ",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "x8gsvCKjGdZ",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "x8gsvCKjGdZ",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "x8gsvCKjGdZ",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "DrEOxW8mbbh",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "DrEOxW8mbbh",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "DrEOxW8mbbh",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "DrEOxW8mbbh",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "BQI18TPLR7W",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "BQI18TPLR7W",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "BQI18TPLR7W",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "BQI18TPLR7W",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "JFFUt8yR2iW",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "JFFUt8yR2iW",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "JFFUt8yR2iW",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "JFFUt8yR2iW",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HLPuaFB7Frw",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HLPuaFB7Frw",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HLPuaFB7Frw",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HLPuaFB7Frw",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "XWU1Huh0Luy",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "XWU1Huh0Luy",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "XWU1Huh0Luy",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "XWU1Huh0Luy",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "laZLQdnucV1",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "laZLQdnucV1",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "dVdxnTNL2jZ",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "dVdxnTNL2jZ",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "dVdxnTNL2jZ",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "dVdxnTNL2jZ",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "UfZcabJUVcZ",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "UfZcabJUVcZ",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "UfZcabJUVcZ",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "UfZcabJUVcZ",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "VmoPqzwBgkx",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "VmoPqzwBgkx",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "U3jd8zVFKxY",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "U3jd8zVFKxY",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "U3jd8zVFKxY",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "U3jd8zVFKxY",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "KAXjpSLFlhB",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "KAXjpSLFlhB",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "kcbTUfABUck",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "kcbTUfABUck",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "kcbTUfABUck",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "kcbTUfABUck",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "GYm08KsVDOz",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "GYm08KsVDOz",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "GYm08KsVDOz",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "GYm08KsVDOz",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "zSJF2b48kOg",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "zSJF2b48kOg",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "iKGjnOOaPlE",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "iKGjnOOaPlE",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "iKGjnOOaPlE",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "iKGjnOOaPlE",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "kqqgh0EOlcA",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "kqqgh0EOlcA",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "kqqgh0EOlcA",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "kqqgh0EOlcA",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "jmWyJFtE7Af",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "jmWyJFtE7Af",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "jmWyJFtE7Af",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "jmWyJFtE7Af",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HQv1p570ldT",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "HQv1p570ldT",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "hdHLjKFmxB4",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "hdHLjKFmxB4",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Usk9Asj5DED",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Usk9Asj5DED",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Usk9Asj5DED",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Usk9Asj5DED",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Y4cFzB4A9ZQ",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Y4cFzB4A9ZQ",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Y4cFzB4A9ZQ",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Y4cFzB4A9ZQ",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FJs8ZjlQE6f",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FJs8ZjlQE6f",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FJs8ZjlQE6f",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FJs8ZjlQE6f",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "CN9Oxawn7bD",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "CN9Oxawn7bD",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "CN9Oxawn7bD",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "CN9Oxawn7bD",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "NCteyX2xpMf",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "NCteyX2xpMf",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "NCteyX2xpMf",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "NCteyX2xpMf",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "j73ScVBTyP0",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "j73ScVBTyP0",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Qk9nnX0i7lZ",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Qk9nnX0i7lZ",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Qk9nnX0i7lZ",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Qk9nnX0i7lZ",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "oNyB0VOXIM8",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "oNyB0VOXIM8",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "bBiAGF9UhUy",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "bBiAGF9UhUy",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "bBiAGF9UhUy",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "bBiAGF9UhUy",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "X5GbcxQCasr",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "X5GbcxQCasr",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "tl03DMc49UT",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "tl03DMc49UT",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "tl03DMc49UT",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "tl03DMc49UT",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Bc7pt6MgY0j",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Bc7pt6MgY0j",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "uz8dqEzuxyc",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "uz8dqEzuxyc",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "QV7HsRncdCz",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "QV7HsRncdCz",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "QV7HsRncdCz",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "QV7HsRncdCz",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "A2VfEfPflHV",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "A2VfEfPflHV",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "A2VfEfPflHV",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "A2VfEfPflHV",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "gQAAvbLx8MM",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "gQAAvbLx8MM",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "RZNJFsg7fQp",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "RZNJFsg7fQp",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "RZNJFsg7fQp",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "RZNJFsg7fQp",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "DWLCM68Q7Zl",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "DWLCM68Q7Zl",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "DWLCM68Q7Zl",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "DWLCM68Q7Zl",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nymNRxmnj4z",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nymNRxmnj4z",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nymNRxmnj4z",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nymNRxmnj4z",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "AFM5H0wNq3t",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "AFM5H0wNq3t",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "AFM5H0wNq3t",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "AFM5H0wNq3t",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "ndb4fIRrQbM",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "ndb4fIRrQbM",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "ndb4fIRrQbM",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "ndb4fIRrQbM",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FF3Ev33BuCh",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FF3Ev33BuCh",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FF3Ev33BuCh",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FF3Ev33BuCh",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "vLA3KVFcZIw",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "vLA3KVFcZIw",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "vLA3KVFcZIw",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "vLA3KVFcZIw",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "AoVvYq5mtLL",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "AoVvYq5mtLL",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "RF4VFVGdFRO",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "RF4VFVGdFRO",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "RF4VFVGdFRO",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "RF4VFVGdFRO",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "hvdCBRWUk80",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "hvdCBRWUk80",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "hvdCBRWUk80",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "hvdCBRWUk80",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "pgi981WXhas",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "pgi981WXhas",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "pgi981WXhas",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "pgi981WXhas",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "rNi710XHPXY",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "rNi710XHPXY",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "rNi710XHPXY",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "rNi710XHPXY",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nG0tBc37z0q",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nG0tBc37z0q",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nG0tBc37z0q",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "nG0tBc37z0q",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "vzcahelbU5s",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "vzcahelbU5s",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "vzcahelbU5s",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "vzcahelbU5s",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "CecywZWejT3",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "CecywZWejT3",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "CecywZWejT3",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "CecywZWejT3",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "JMKtVQ5HasH",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "JMKtVQ5HasH",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "madOetOj4Ye",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "madOetOj4Ye",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "madOetOj4Ye",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "madOetOj4Ye",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "bVkFujnp3F2",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "bVkFujnp3F2",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "bVkFujnp3F2",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "bVkFujnp3F2",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "zAW6b5Owalk",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "zAW6b5Owalk",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "zAW6b5Owalk",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "zAW6b5Owalk",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Y7Oq71I3ASg",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Y7Oq71I3ASg",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Y7Oq71I3ASg",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "Y7Oq71I3ASg",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "IeO1sWXVyp6",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "IeO1sWXVyp6",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "IeO1sWXVyp6",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "IeO1sWXVyp6",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FQ2o8UBlcrS",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FQ2o8UBlcrS",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FQ2o8UBlcrS",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "FQ2o8UBlcrS",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "BHvVPwWrrLC",
            "categoryOptionCombo": "o2gxEt6Ek2C",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "BHvVPwWrrLC",
            "categoryOptionCombo": "ba1FkzknqS8",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "zMGEd921xd3",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "zMGEd921xd3",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "zMGEd921xd3",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "zMGEd921xd3",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "EGUJY3jQdJ6",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "EGUJY3jQdJ6",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "EGUJY3jQdJ6",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "EGUJY3jQdJ6",
            "categoryOptionCombo": "jOkIbJVhECg",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "S34ULMcHMca",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "wHBMVthqIX4",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
        {
            "dataElement": "GCvqIM3IzN0",
            "categoryOptionCombo": "SdOUI2yT46H",
            "period": "202011",
            "orgUnit": "y77LiPqLMoq",
            "value": ""
        },
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
