---
_id : 5
path: '/8-18-18'
title: 'Revisiting Python Data Analysis: Part 2'
tags: ['Python', 'Matplotlib', 'Data Visualization']
---


![Drug Line Chart](https://github.com/dacrands/ny_chemical_dependence/raw/master/agegraph.png)

You may find the dataset for this project [here](https://catalog.data.gov/dataset/chemical-dependence-treatment-program-admissions-beginning-2007). The data is titled *Chemical Dependence Treatment Program Admissions: Beginning 2007.* It was last updated 	March 4, 2015.

From the source:

> NYS Office of Alcoholism and Substance Abuse Services (OASAS) certified chemical dependence treatment programs report admissions of people served in programs throughout NYS. This dataset includes the number of admissions to NYS OASAS certified treatment programs aggregated by the program category, county of the program location, age group of client at admission, and the primary substance of abuse group. 

## Background
---

I was having a lot of fun visualizing data scraped from HTML tables, but had yet to really dive into a serious dataset. I was looking for a lot of data, and thought data.gov would have a lot of cool datasets to analyze. After doing some searching around, I came across the dataset used in this project. Given my background in psychology, particularly my work as a research assistant for a clinical psychology lab, this dataset was both familiar and interesting to me. Also, around the time of this project I was volunteering for one of the country's largest detox centers, so it was a rewarding experience to be doing both amateur research and clinical work related to substance abuse &mdash; I was essentially a full-stack psychologist.

![Imgur](https://i.imgur.com/CpX0EId.png)

## Python and Excel
---
Though the data came in a variety of forms, at that time I was only comfortable working with *.csv* files, namely because that meant I could use Excel. 

I find Python and Excel to be a particularly powerful combination; however, there are some caveats to be mindful of when using the two together. For instance, performing the majority &mdash; if not all &mdash; of your data-massaging in Excel, though perhaps much quicker than using numpy and pandas in the short term, prevents the reusablity and shareability of your code, and ultimately makes your projects no longer open source.

To that last point, we should be doing this on our own, we're developers! Do we really want to be supporting the machine that is *Microsoft* after what it did to *Netscape* in the 90s? I didn't think so...
![browser wars graph](https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Browser_Wars_%28en%29.svg/640px-Browser_Wars_%28en%29.svg.png)

That said, I did use Excel a little bit for this project.
```python
xlsfile = pd.ExcelFile(r'../substance_copy.xlsx')
dframe = xlsfile.parse('main')
```