---
path: '/8-11-18'
title: 'Revisiting Python Data Visualization'
---


## Background
---
### *tl/dr: The graphs I made for my undergraduate research posters stunk, so I started to program to get better at visualizing data.*

The whole reason I got started with programming is because I wanted to make nice graphs. As an undergrad I was heavily involved in research, which means I used to have to visualize data. At first, I had zero knowledge of data visualization tools outside of what came with SPSS, PowerPoint, and Excel. Consequently, the graphs on my posters were always drab and uninteresting.

As part of the psychology honors major, students were required to take a weekly, three-hour seminar. This was quite an informative class led by a gifted professor that covered a wide variety of topics -- such as a light introduction to Bayesian statistics, peer-reviewed writing sessions, public-speaking exercises, and, of course, a lot of talk about data and how to present it.

## Learning Path
---
I will not go through an in-depth rundown of my learning path here, but these were the first two resources I used to learn programming:

- Automate the Boring Stuff (ATBS)
- $10 udemy course on Python Data Visualization

I can't reccommned ATBS enough. It will teach you the fundamentals and show you some cool libraries. Though I never completed the book, the first few chapters were very informative and well-presented. This is no surprise, as ATBS is perhaps the most highly recommended resource for getting started with code.

Once I got a pretty solid understanding of the fundamentals and OOP, I began learning **numpy**, **pandas**, and **matplotlib,** in that order. 

Now I'm going to fast-forward a bit, but here are some takeaways from my experience of going from zero programming knowledge to reading, cleaning and visualizing data with Python:

- **Visualizing data requires a strong understanding of basic data manipulation.** 

  Before you can get up and running with the Seaborn and Matplotlib to make pretty graphs, you'll need to get a strong understanding of Numpy and Pandas. This, in turn, requires a strong understanding of data-objects and tools, e.g., matrices, dataframes, pivot tables, and the ability slice and manipulate said objects for analysis.

- **Use Conda and Jupyter Notebooks**. 

  If you are not familiar with Conda or Jupyter Noteboks, I suggest you look into them. Conda makes working with packages and virtual environments very easy. Jupyter Notebooks allow you run code in snippets in Google Chrome without having to boot up and IDE. I will not go into the the complete awesomeness of Jupyter Notebooks and Conda here, but you should definitely look into them.

- **Use virtual environments.** 
  
  It's better to get familiar with virtual environments sooner rather than later, especially since some really awesome data libraries, such as word-cloud, rely on earlier versions of libraries such as Numpy. 

  Virtual environments are particularly easy to set up with Conda, though there are some issues when using them on Windows, so be careful. I suggest using the Command Prompt and not PowerShell when using virtual environments on Windows.

## My First Data Project
---
![alt text](https://github.com/dacrands/ww1WikiGraphs/raw/master/mili-graph.png)
![alt text](https://github.com/dacrands/ww1WikiGraphs/raw/master/civi-graph.png)

This project will always have a special place in my heart. It was the first time in my programming learning when I envisioned something that would be really cool to make and actually made it. Of course the dataset was extremely small, but it didn't matter. I took data and visualized it using Python, I achieved one of my dreams!

Anyway, the data for this project was taken from a Wikipedia table, which provided some interesting challenges.

### The Regex
The data from the table came in a strange string (e.g, `"56,639[18] to 64,996 [9]"`, `"1,700,000[33] to 2,254,369[51]"`) when I needed integers, so I needed some regex magic. I created a function to grab the lower estimates (i.e., *56,639* instead of *64,996*). For this, I wrote a function: 

```python
def column_cleaner(arr):    
    """
    In: array of strs containing numerical characters delimited by commas and
    NaN values (i.e., a Wikipedia table column)
    Out: array of ints
    """    
    newList = list()
    for i in arr:
        if type(i) is str:
            newList.append(int(re.compile(r'\d{2,}')
              .search(i.replace(',', ''))
              .group()))
        else:
            newList.append(0)

    return newList
```
*Yes, I know this function isn't very good as there is no error handling, but I was young and it works.*

### The Data
Pandas made grabbing the data very easy.

```python
import pandas as pd

ww1_data = pd.read_html('https://en.wikipedia.org/wiki/World_War_I_casualties')
dframe = DataFrame(ww1_data[0])
```

Then we needed to cleaning up of the data-frame.

First, let's rename our columns to something a bit more code friendly

```python
dframe = dframe.rename(columns={
                              0: 'countries',
                              1: 'pop',
                              2: 'dead/MIA',
                              3: 'allDead',
                              4: 'civisDead',
                              5: 'civisIndirectDead',
                              6: 'TotDeaths',
                              7: 'DeadPop%',
                              8: 'miliWounded'
                            })
```

Second, let's use our function to get some integers.
```python
  for i in ['dead/MIA', 'allDead', 'civisDead', 'TotDeaths']:
    power_frame[i] = column_cleaner(power_frame[i])
```

The table contained data for 30 countries, when I only wanted to look at a select few. Here's how I created a new data-frame containing only the countries I was interested in: 

```python
power_frame = dframe[[21,14,8,24,12,19,26,27]]
power_frame['countries'] = [
                      'USA',
                      'Italy',
                      'UK',
                      'Aus-Hung',
                      'France',
                      'Russia',
                      'Germany',
                      'Ottoman'
                    ]
```

And that's about it


 






