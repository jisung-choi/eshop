# Ecommerce Website
## Full stack ecommerce website using MEAN stack
### https://jisung-choi.github.io/eshop/

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Highlights](#Highlights)

## Overview

This portofolio project was developed using MEAN stack. Some of its core functionalities are listed below.  
Use the following account to fully test out functionalities: (ID: user0@email.com, PW: 123456)

- Search products on search bar
- Auto-complete recommendations on search bar
- Search products by category
- Add/Edit products for purchase
- Sign Up || Log In when purchasing
- Check order history by clicking on user icon

### Built With

- MongoDB, Express.js, Angular, Node.js
- NX Monorepo
- JWT (JSON Web Tokens)
- PrimeNG(front-end library)

### Highlights

**Auto-complete recommendations using suffix-tree.**

image

Code: [Suffix-tree at line 128](libs/products/src/lib/components/products-search/products-search.component.ts)  

List of product names are stored in suffix-tree and shows search recommendations according to user's input.


**Search result based on price using quick-selection algorithm and median of medians**

image


Code: [Quick Selection at line 90](libs/products/src/lib/pages/products-list/products-list.component.ts)  

Top 10 search results(if there is enough products) are displayed according to the price.  
The quick-selection algorithm utilizes median of medians to avoid worst case scenario.  
This project does not have any user data so it is not desgined to display according to relevancy or ratings.
