1. Download data from Climatescope and World Bank: % of population with access to electricity
2. Combine data in Excel
3. Get data for total population of each country. To do this, I manually copied and pasted from the World Bank website into my spreadsheet. (pop)
4. Calculate number of people with access to electricity for each country (numaccess)
5. Calculate number of people without access to electricity for each country (numnoaccess)
6. Calculate percentage of people without access for each country (percentpopnoaccess)
7. Get data for world total number of people without access to electricity (from World Bank) (worldnoaccess)
8. For each country, calculate number of people without access as percentage of world total (percenttotalnoaccess)
9. Create tsv file
10. Paste data into tsv file

I performed steps 3-8 in order to add an additional parameter to the chart, which would scale the dot size of each country based on its proportion of the world's total number of people without energy access. For example, about 80% of India's population has access to electricity, which is relatively high compared to other countries. However, the 20% of India's population without access accounts for 25% of the world total, so I want the chart to communicate this information.  