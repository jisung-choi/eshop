# Ecommerce Website
## Full stack ecommerce website using MEAN stack
### DEMO: https://jisung-choi.github.io/eshop/

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Algorithm Overview](#Algorithm-Overview)

## Overview

The portfolio project was built using the MEAN stack, incorporating various core functionalities that are outlined below. To fully explore and test these features, please utilize the provided test account below.  
ID: user0@email.com, PW: 123456

**Search Products:**  
The search bar enables users to search for products based on specific keywords or names.

**Auto-Complete Recommendations:**  
The search bar also provides auto-complete recommendations, suggesting relevant product options as users type their queries.

**Search Categories:**  
Users can search for products based on different categories, allowing for a more targeted browsing experience.

**Product Purchase:**  
Users can add or edit products for purchase.

**User Authentication:**  
To facilitate purchases and provide a personalized experience, users can sign up or log in using their credentials.

**Order History:**  
By clicking on the user icon on top-right corner of the website, users can access their order history, allowing them to track their past purchases and review details.

### Built With

- MongoDB, Express.js, Angular, Node.js
- NX Monorepo
- JWT (JSON Web Tokens)
- PrimeNG(front-end library)

### Algorithm Overview


### Auto-complete recommendations utilizes suffix tree for efficient search functionality

![Search](Search.png)

Code: [Suffix-tree](https://github.com/jisung-choi/eshop/blob/0f9347a3cc3376fdf0c873c07f126f8cfc689f0c/libs/products/src/lib/components/products-search/products-search.component.ts#L128C1-L173C2)  

**Functionality**

Upon initializing the search bar, the algorithm constructs a suffix tree based on the product names stored in the database.

**Rationale**

Various search algorithms were evaluated for this task, with the primary consideration being the responsiveness or speed of the auto-complete recommendations. Although the initial construction of the suffix tree structure incurs a high time complexity, the search time complexity is typically linear to the length of the searched word on average. Furthermore, if the searched word fails to match any entries while traversing the suffix tree, the search time complexity often falls below linear.

**Potential Enhancements**  

Currently, the recommendations provided are static and do not take into account user preferences or behavior. To enhance the algorithm, incorporating user search history and dynamically adjusting the auto-complete recommendations based on this information would be beneficial.

### The search result algorithm utilizes the quick-selection algorithm

![Search Result](https://github.com/jisung-choi/eshop/blob/main/Search%20Result.png)

Code: [Quick Selection](https://github.com/jisung-choi/eshop/blob/0f9347a3cc3376fdf0c873c07f126f8cfc689f0c/libs/products/src/lib/pages/products-list/products-list.component.ts#L97C1-L151C2)

**Functionality**

The algorithm retrieves and displays the top k search results based on a specific parameter, such as price. Instead of using a simple median, it employs the "median of medians" method to obtain a proxy median and prevent worst-case scenarios.

**Rationale**

The most straightforward approach for displaying search results would have been to use a library-provided sort() method. However, the sort() method in JavaScript performs quicksort on the entire result set, resulting in a time complexity of O(n log n). Since only the top k results, currently set to 10, need to be presented to the user, sorting the entire list is unnecessary. The quick-selection algorithm optimizes the sorting process by only performing merge sorts on the top k results, significantly reducing the average time complexity to O(N).

However, it is essential to address the worst-case scenario where selecting an arbitrary pivot point consistently results in O(N^2) time complexity. To overcome this, the median of medians method is introduced. This method calculates a proxy median that is not the largest or smallest element in the list. It divides the list into five subarrays and identifies the medians within each. The median of these medians is then selected as the pivot point. This deterministic pivot selection ensures that both the average and worst-case time complexity of the quick-selection algorithm are O(N).

**Potential Enhancements**

Currently, the quick-selection algorithm is set to order the search results based on price in descending order. To further improve the algorithm, additional parameters such as user ratings, product relevancy, or a combination of these factors can be considered for ordering the results.
