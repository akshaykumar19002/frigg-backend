const db = require('./DishNameSuggestionDB');

var DishNameSuggestionService = {
    findSimilarDish: function (dish1, dish2) {
        len1 = dish1.length;
        len2 = dish2.length;
        dp = new Array(len1+1);

        for (let i = 0; i < dp.length; i++) {
            dp[i] = new Array(len2+1);
        }

        for (let i = 0; i<= len1; i++) {
            dp[i][0] = i;
        }
        for (let i = 0; i <= len2; i++) {
            dp[0][i] = i;
        }
        for (let i = 0; i < len1; i++) {
            let c1 = dish1.charAt(i);
            for (let j = 0; j < len2; j++) {
                let c2 = dish2.charAt(j);

                if (c1 == c2) {
                    dp[i+1][j+1] = dp[i][j]
                } else {
                    replace = dp[i][j] + 1;
                    insert = dp[i][j+1] + 1;
                    del = dp[i+1][j] + 1;

                    min = replace > insert ? insert: replace;
                    min = del > min ? min : del;
                    dp[i+1][j+1] = min;
                }
            }
        }
        return dp[len1][len2];
    },
    findSimilarDishes: function(name, allDishes) {
        dish_similarity = {}
        for (let i = 0; i < allDishes.length; i++) {
            dish_similarity[allDishes[i].recipe_name] = DishNameSuggestionService.findSimilarDish(name, allDishes[i].recipe_name);
        }
        var items = Object.keys(dish_similarity).map(
            (key) => { 
                // console.log(dish_similarity[key])
                return [key, dish_similarity[key]] });
        
        items.sort((first, second) => { return first[1] - second[1] } );
        var keys = items.map((e) => { return e[0] });
        return keys;
    },
    search: async function (name) {
        try {
            var similar = DishNameSuggestionService.findSimilarDishes(name, await db.fetchAll());
            if (similar == undefined)
                return []
            else if (similar.length < 11)
                return similar
            else
                return similar.splice(0, 10);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = DishNameSuggestionService;