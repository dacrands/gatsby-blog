---
_id : 3
path: '/8-11-18'
title: 'Revisiting Python Data Visualization'
tags: ['Python', 'Matplotlib', 'Data Visualization', 'Jupyter Notebooks']
---


## Background
---
### *tl;dr The graphs I made for my undergraduate research posters stunk, so I started to program to get better at visualizing data.*

The whole reason I got started with programming is because I wanted to make nice graphs. As an undergrad I was heavily involved in research, which means I used to have to visualize data for poster presentations. At first, I had zero knowledge of data visualization tools outside of what came with SPSS, PowerPoint, and Excel. Consequently, the graphs on my posters were always drab and uninteresting.

![example of a bad graph](https://www.biostat.wisc.edu/~kbroman/topten_worstgraphs/epstein_fig1.jpg)

I remember being at a symposium, standing there with my terrible SPSS histograms, and overhearing a conversation between a grad student and a professor. The former said how one of her research assistants makes amazing graphs with matlab. The professor was immediately intrigued and impressed by this, and, to the best of my recollection, began inquiring as to ways to find such students. This had a lasting impact on me, though I wouldn't start to program until years later (It's a long story).

## Learning Path
---
I will not go through an in-depth rundown of my learning path here, but these were the first resources I used to learn programming:

- **Reddit** (e.g., r/learnpython, r/python)

  This remains my post important tool for learning to program. 
  I check reddit constantly to stay up to date with the industry.


- **Automate the Boring Stuff (ATBS)**

  I can't reccommned ATBS enough. It will teach you the basics and have you doing some cool things very quickly. Though I never completed the book, the first few chapters were very informative and well-presented. This is no surprise, as ATBS is perhaps the most highly recommended resource for getting started with Python.

- **$10 udemy course on Python Data Visualization**
  
  I won't mention the course here since it has not been updated in quite some time and it wasn't super great (free resources are easily as good), but it did get me started with the hallmark data-science libraries.
  I began this course once I had a pretty solid understanding of the fundamentals and OOP. It taught me the basics of **numpy**, **pandas**, and **seaborn,** but most of my learning these libraries came directly from the documentation and *stackoverflow* questions. Also, there is only so much you can do with seaborn before you need to dive directly into matplotlib.
 





Now I'm going to fast-forward a bit, but here are some takeaways from my experience of going from zero programming knowledge to reading, cleaning and visualizing data with Python:

- **Visualizing data requires a strong understanding of basic data manipulation.** 

  Before you can get up and running with the Seaborn and Matplotlib to make pretty graphs, you'll need to get a strong understanding of Numpy and Pandas. This, in turn, requires a strong understanding of data-objects and tools, e.g., matrices, dataframes, pivot tables, and the ability slice and manipulate said objects for analysis.

- **Use Conda and Jupyter Notebooks**. 

  If you are not familiar with Conda or Jupyter Noteboks, I suggest you look into them. Conda makes working with packages and virtual environments very easy. Jupyter Notebooks allow you run code in snippets in Google Chrome without having to boot up an IDE. I will not go into the the complete awesomeness of Jupyter Notebooks and Conda here, but I really enjoy working with them.

- **Use virtual environments.** 
  
  It's better to get familiar with virtual environments sooner rather than later, especially since some really awesome data libraries, such as word-cloud, rely on earlier versions of libraries such as Numpy. 

  Virtual environments are particularly easy to set up with Conda, though there are some issues when using them on Windows, so be careful. I suggest using the Command Prompt and not PowerShell when using virtual environments on Windows, since the former will indicate whether the env is active or not.

  For example:

  ```
  :: command prompt
  C:\Users\dacrands>activate wordcloudenv
  (wordcloudenv) C:\Users\dacrands>
  ```

  vs.

  ```
  :: PowerShell
  C:\Users\dacrands>activate wordcloudenv
  C:\Users\dacrands>
  ```

<br />

## My First Data Project
---
![WW1 military casualties graph](https://github.com/dacrands/ww1WikiGraphs/raw/master/mili-graph.png)
![WW1 civilian casualties graph](https://github.com/dacrands/ww1WikiGraphs/raw/master/civi-graph.png)

This project will always have a special place in my heart. It was the first time in my programming journey when I envisioned something that would be really cool to make and actually made it. Of course the dataset was extremely small, but it didn't matter. I took data and visualized it using Python, I achieved one of my dreams! I did something that potentially would have impressed that professor I never actully met from years earlier!

Anyway, the data for this project was taken from a Wikipedia table, which was incredibly easy to scrape using Pandas, although the data was in pretty rough shape.

### The Regex
The data from the table came in a strange string (e.g, *"56,639[18] to 64,996 [9]"*, *"1,700,000[33] to 2,254,369[51]"*) when I needed integers, thus I employed some regex magic. I created a function to grab the lower estimates of the data (i.e., *56,639* instead of *64,996*): 

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
*Yes, I know this function isn't very good as there is no error handling, etc., but I was young and it works.*

Now let's take a look at the data so we can see this super cool function in action.

### The Data
As I mentioned, Pandas made grabbing the data very easy.

```python
import pandas as pd

ww1_data = pd.read_html('https://en.wikipedia.org/wiki/World_War_I_casualties')
dframe = DataFrame(ww1_data[0])
```



![WW1 wikipedia table](https://i.imgur.com/cGD5VTk.jpg)

That's it! I believe pandas is grabbing the innerHTML of the table, in the process turning things like *a* tags into
plain strings.
So now that we have the data, it's just a matter of cleaning things up.

**First,** let's rename our columns to something a bit less verbose.

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
<br />

![Clean graph's columns](https://i.imgur.com/OrJ2ocb.png)
You may have noticed that the dataframe is transposed.
I did this several times throughout the project because, at least at the time,
this made indexing and renaming columns much easier.


**Second,** let's use that function I mentioned earlier to convert these messy strings into some nice integers.


```python
  for i in ['dead/MIA', 'allDead', 'civisDead', 'civisIndirectDead', 'TotDeaths', 'miliWounded']:
    power_frame[i] = column_cleaner(power_frame[i])
```
*Note: we are only doing this for select columns*


I'll show the *dramatic* results of this function below.


**Third,** the table contained data for 30 countries, when I only wanted to look at a select few. Here's how I created a new data-frame containing only the countries I was interested in: 

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

And that's about it in terms of the data.




#### Before...

![WW1 wikipedia table](https://i.imgur.com/cGD5VTk.jpg)

#### After...
![Imgur](https://i.imgur.com/hQph3cX.jpg)




 
## Going Back
___


I revisited a lot of old code in the writing of this post and it's been, for the most part, a pleasurably nostalgic journey back to the world of Python data-science. Although my intention was to just paste some snippets of code and show the graphs, when writing this I actually booted up a jupyter notebook and began running the scripts I wrote. Thankfully this project still works.



![new ww1 casualty graph](https://i.imgur.com/kNN4Z4J.jpg)

My primary reason for revisualizing the data was to see if I still could. Luckily there wasn't much of an issue putting the above barplot together, though I did *not* miss the matplotlib documentation. Documentation for web development is presented so beautifully and written with character, web devs are truly spoiled in that sense. It makes sense that *Stackoverflow* answers most of my matplotlib questions, as the library's docs leave a lot to be desired.   




