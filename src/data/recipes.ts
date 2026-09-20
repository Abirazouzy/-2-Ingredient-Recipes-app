import { Recipe, PantryIngredient } from '../types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'banana-pancakes',
    title: 'Fluffy Golden Banana Pancakes',
    subtitle: 'Naturally sweet, flourless breakfast pancakes ready in 6 minutes',
    category: 'breakfast',
    totalTimeMinutes: 6,
    prepTimeMinutes: 2,
    cookTimeMinutes: 4,
    method: 'Skillet',
    ingredient1: {
      name: 'Ripe Bananas',
      amount: 1,
      unit: 'large ripe banana',
      notes: 'the riper and specklier, the sweeter your pancakes!'
    },
    ingredient2: {
      name: 'Eggs',
      amount: 2,
      unit: 'large eggs',
      notes: 'beaten well until completely blended'
    },
    optionalPantryBonus: 'Pinch of ground cinnamon or drop of vanilla',
    servings: 1,
    steps: [
      'In a medium bowl, mash the peeled banana with a fork until almost smooth with minimal lumps.',
      'Crack in both eggs and whisk vigorously for 45 seconds until light, frothy, and homogeneous.',
      'Heat a lightly oiled or buttered non-stick skillet over medium-low heat.',
      'Pour batter in small 3-inch silver dollars (small makes them easy to flip!). Cook for 2 minutes until bubbly.',
      'Gently flip with a thin spatula and cook 1 more minute until golden brown. Serve hot!'
    ],
    bunnyChefTip: "Keep your skillet on gentle medium-low heat! Because bananas have natural sugars, they caramelize fast. Small 3-inch circles flip like a dream!",
    tags: ['Gluten-Free', 'High-Protein', 'No Sugar Added', 'Kid Friendly'],
    nutrition: {
      calories: 240,
      protein: '13g',
      carbs: '28g',
      fat: '9g',
      highlight: 'Naturally gluten-free & packed with potassium'
    }
  },
  {
    id: 'nutella-mug-cake',
    title: 'Molten Nutella Lava Mug Cake',
    subtitle: 'Rich, gooey chocolate hazelnut cake in a coffee mug',
    category: 'sweet',
    totalTimeMinutes: 3,
    prepTimeMinutes: 2,
    cookTimeMinutes: 1,
    method: 'Microwave',
    ingredient1: {
      name: 'Nutella (Hazelnut Spread)',
      amount: 4,
      unit: 'tablespoons',
      notes: 'at room temperature so it whisks smoothly'
    },
    ingredient2: {
      name: 'Large Egg',
      amount: 1,
      unit: 'large egg',
      notes: 'whisked until completely blended'
    },
    optionalPantryBonus: 'Flaky sea salt or a dusting of powdered sugar',
    servings: 1,
    steps: [
      'Scoop 4 generous tablespoons of Nutella into your favorite microwave-safe ceramic mug.',
      'Crack in 1 large egg and whisk with a small fork for 60 seconds until a glossy, smooth batter forms.',
      'Microwave on HIGH for 60 to 75 seconds. The edges will rise like a soufflé while the center stays gooey.',
      'Let rest for 1 minute before digging in with a warm spoon!'
    ],
    bunnyChefTip: "Do not overcook! Pull it out right as the top puffs up — the residual heat cooks it into molten lava perfection.",
    tags: ['Decadent', 'No Mess', 'Chocolate', '3-Minute Flash'],
    nutrition: {
      calories: 290,
      protein: '8g',
      carbs: '24g',
      fat: '18g',
      highlight: 'Warm chocolate comfort with zero baking flour'
    }
  },
  {
    id: 'crispy-parmesan-crisps',
    title: 'Crispy Golden Parmesan Fricos',
    subtitle: 'Crunchy, lacy cheese wafers that melt in your mouth',
    category: 'savory',
    totalTimeMinutes: 5,
    prepTimeMinutes: 1,
    cookTimeMinutes: 4,
    method: 'Skillet',
    ingredient1: {
      name: 'Finely Grated Parmesan Cheese',
      amount: 1,
      unit: 'cup',
      notes: 'use fresh Parmigiano-Reggiano or Pecorino'
    },
    ingredient2: {
      name: 'Cracked Black Pepper',
      amount: 0.5,
      unit: 'teaspoon',
      notes: 'coarsely cracked for Italian cacio e pepe style'
    },
    optionalPantryBonus: 'Pinch of dried rosemary or red pepper flakes',
    servings: 2,
    steps: [
      'Heat a dry non-stick skillet over medium heat.',
      'Spoon parmesan into 2-tablespoon mounds spaced 2 inches apart, gently flattening into thin 3-inch discs.',
      'Sprinkle cracked black pepper evenly over each cheese disc.',
      'Let sizzle for 2.5 to 3 minutes until bubbles subside and the edges turn deep lacey golden.',
      'Use a spatula to transfer onto parchment paper. They will crisp up into brittle, crunchy chips in 60 seconds!'
    ],
    bunnyChefTip: "Let them cool for just 1 full minute on paper towels — as the oils set, they transform into the crunchiest savory crisps!",
    tags: ['Keto', 'Low-Carb', 'High-Calcium', 'Crunchy'],
    nutrition: {
      calories: 110,
      protein: '10g',
      carbs: '1g',
      fat: '7g',
      highlight: 'Zero carbs, pure crunchy Italian flavor'
    }
  },
  {
    id: 'greek-yogurt-bagels',
    title: 'Speedy 8-Minute Air Fryer Bagels',
    subtitle: 'Golden, chewy protein bagels with zero yeast or proofing',
    category: 'breakfast',
    totalTimeMinutes: 8,
    prepTimeMinutes: 2,
    cookTimeMinutes: 6,
    method: 'Air Fryer',
    ingredient1: {
      name: 'Self-Rising Flour',
      amount: 1,
      unit: 'cup',
      notes: 'or all-purpose flour + 1.5 tsp baking powder + salt'
    },
    ingredient2: {
      name: 'Plain Greek Yogurt',
      amount: 1,
      unit: 'cup',
      notes: 'whole milk or 2% thick strained Greek yogurt'
    },
    optionalPantryBonus: 'Everything bagel seasoning or sesame seeds on top',
    servings: 2,
    steps: [
      'In a bowl, combine equal parts self-rising flour and thick Greek yogurt.',
      'Knead with your hands for 60 seconds until a soft, pliable dough ball forms.',
      'Divide into 2 balls, roll each into a 6-inch rope, and pinch the ends together to form a bagel circle.',
      'Place in air fryer basket lined with parchment and cook at 375°F (190°C) for 6 to 7 minutes until puffed and golden brown.',
      'Slice in half and enjoy warm and pillowy!'
    ],
    bunnyChefTip: "If your yogurt has excess whey water, drain it first! A thick Greek yogurt makes dough that won't stick to your paws.",
    tags: ['High-Protein', 'No Yeast', 'Chewy', 'Air Fryer'],
    nutrition: {
      calories: 220,
      protein: '12g',
      carbs: '38g',
      fat: '2g',
      highlight: '12g muscle-building protein per bagel'
    }
  },
  {
    id: 'affogato-al-caffe',
    title: 'Classic Italian Espresso Affogato',
    subtitle: 'Silky cold vanilla gelato drowned in steaming rich espresso',
    category: 'sweet',
    totalTimeMinutes: 2,
    prepTimeMinutes: 1,
    cookTimeMinutes: 1,
    method: 'No-Cook',
    ingredient1: {
      name: 'Vanilla Bean Ice Cream',
      amount: 2,
      unit: 'generous scoops',
      notes: 'deep frozen so it stays chilled when coffee hits'
    },
    ingredient2: {
      name: 'Hot Fresh Espresso',
      amount: 1,
      unit: 'double shot (2 oz)',
      notes: 'or very strong moka pot / dark roast coffee'
    },
    optionalPantryBonus: 'Grated dark chocolate curls or cocoa dust',
    servings: 1,
    steps: [
      'Place 2 cold, firm scoops of vanilla ice cream in a chilled glass tumbler or dessert cup.',
      'Brew or pull a piping hot double shot of espresso.',
      'Slowly pour the steaming espresso right over the center of the cold gelato.',
      'Eat immediately with a spoon as the creamy melting edges swirl into bittersweet heaven!'
    ],
    bunnyChefTip: "Chill your dessert glasses in the freezer for 5 minutes before assembling to keep that magical temperature contrast alive!",
    tags: ['Italian Classic', '2-Minute Flash', 'Coffee Lovers', 'Sophisticated'],
    nutrition: {
      calories: 160,
      protein: '3g',
      carbs: '18g',
      fat: '9g',
      highlight: 'Bittersweet hot-and-cold sensation'
    }
  },
  {
    id: 'cheesy-salsa-dip',
    title: 'Velvety Warm Queso Dip',
    subtitle: 'Creamy, tangy party dip that melts together in 2 minutes',
    category: 'savory',
    totalTimeMinutes: 3,
    prepTimeMinutes: 1,
    cookTimeMinutes: 2,
    method: 'Microwave',
    ingredient1: {
      name: 'Cream Cheese',
      amount: 4,
      unit: 'ounces',
      notes: 'softened block or whipped cream cheese'
    },
    ingredient2: {
      name: 'Chunky Salsa',
      amount: 0.5,
      unit: 'cup',
      notes: 'mild, medium, or fire-roasted tomato salsa'
    },
    optionalPantryBonus: 'Fresh chopped cilantro or diced pickled jalapeño',
    servings: 2,
    steps: [
      'Cube cream cheese into a microwave-safe bowl.',
      'Pour chunky salsa over the cream cheese cubes.',
      'Microwave on high for 60 seconds. Remove and stir with a whisk or silicone spatula.',
      'Microwave for an additional 45 seconds until steaming and velvety smooth.',
      'Stir once more and serve warm with tortilla chips or vegetable sticks!'
    ],
    bunnyChefTip: "Using fire-roasted salsa adds smoky notes that taste like you spent 30 minutes roasting peppers on the grill!",
    tags: ['Game Day', 'Savory', 'Crowd Favorite', 'Ultra-Creamy'],
    nutrition: {
      calories: 190,
      protein: '4g',
      carbs: '6g',
      fat: '17g',
      highlight: 'Irresistibly smooth & comforting dip'
    }
  },
  {
    id: 'strawberry-nice-cream',
    title: 'Frozen Strawberry Silk "Nice Cream"',
    subtitle: 'Wholesome dairy-free fruit soft serve whipped in 3 minutes',
    category: 'sweet',
    totalTimeMinutes: 3,
    prepTimeMinutes: 1,
    cookTimeMinutes: 2,
    method: 'Blender',
    ingredient1: {
      name: 'Frozen Strawberries',
      amount: 2,
      unit: 'cups',
      notes: 'partially thawed for 2 mins for smoother blending'
    },
    ingredient2: {
      name: 'Full-Fat Coconut Milk (or Greek Yogurt)',
      amount: 0.33,
      unit: 'cup',
      notes: 'rich and creamy for authentic gelato texture'
    },
    optionalPantryBonus: 'A drizzle of pure maple syrup or splash of lime juice',
    servings: 2,
    steps: [
      'Toss frozen whole strawberries directly into your high-speed blender or food processor.',
      'Pour the creamy coconut milk (or Greek yogurt) over the berries.',
      'Pulse 5-6 times to break down frozen chunks, then blend on high for 45 seconds using the tamper tool.',
      'Stop when you achieve a thick, swirling soft-serve consistency.',
      'Scoop into chilled bowls and enjoy immediate refreshing sweetness!'
    ],
    bunnyChefTip: "If your blender stalls, wait 60 seconds for the berries to soften slightly. No ice cubes needed — frozen fruit is the ice!",
    tags: ['Vegan', 'Dairy-Free Option', 'Refined Sugar Free', 'Antioxidant Rich'],
    nutrition: {
      calories: 135,
      protein: '2g',
      carbs: '16g',
      fat: '8g',
      highlight: '100% real fruit, zero artificial sweeteners'
    }
  },
  {
    id: 'crispy-tortilla-quesadilla',
    title: 'Golden Crisp Cheddar Quesadilla',
    subtitle: 'Buttery, blistered tortilla with a molten melted cheese pull',
    category: 'savory',
    totalTimeMinutes: 5,
    prepTimeMinutes: 1,
    cookTimeMinutes: 4,
    method: 'Skillet',
    ingredient1: {
      name: 'Flour Tortilla',
      amount: 1,
      unit: 'large 10-inch tortilla',
      notes: 'soft taco or burrito size'
    },
    ingredient2: {
      name: 'Sharp Cheddar or Monterey Jack',
      amount: 0.75,
      unit: 'cup',
      notes: 'freshly shredded melts twice as fast'
    },
    optionalPantryBonus: 'Dash of garlic powder or a spoon of hot sauce',
    servings: 1,
    steps: [
      'Heat a dry skillet over medium heat for 1 minute.',
      'Lay the tortilla flat in the skillet and distribute shredded cheese evenly across one half.',
      'Fold the empty half over to create a half-moon.',
      'Press down lightly with a spatula. Cook for 2 minutes until underside is toasted golden and crispy.',
      'Carefully flip and toast the other side for 90 seconds until the cheese is bubbling and molten. Slice into triangles!'
    ],
    bunnyChefTip: "Sprinkle a tiny pinch of cheese directly onto the hot skillet outside the tortilla — it creates a crispy cheese crust that tastes like heaven!",
    tags: ['Cheesy', 'Comfort Food', '5-Minute Flash', 'Lunch Quickie'],
    nutrition: {
      calories: 340,
      protein: '16g',
      carbs: '26g',
      fat: '19g',
      highlight: 'Satisfying 16g protein quick lunch'
    }
  },
  {
    id: 'avocado-egg-scramble',
    title: 'Velvet Avocado Soft Scramble',
    subtitle: 'Creamy whipped eggs folded with buttery avocado cubes',
    category: 'breakfast',
    totalTimeMinutes: 5,
    prepTimeMinutes: 2,
    cookTimeMinutes: 3,
    method: 'Skillet',
    ingredient1: {
      name: 'Eggs',
      amount: 2,
      unit: 'large pasture-raised eggs',
      notes: 'whisked with a pinch of water for extra fluffiness'
    },
    ingredient2: {
      name: 'Ripe Hass Avocado',
      amount: 0.5,
      unit: 'medium avocado',
      notes: 'peeled and cut into 1/2-inch tender cubes'
    },
    optionalPantryBonus: 'Sea salt flakes and freshly ground black pepper',
    servings: 1,
    steps: [
      'Whisk eggs in a bowl until frothy and pale yellow.',
      'Warm a non-stick pan over medium-low heat with a gentle spray or pat of butter.',
      'Pour in eggs and let set for 20 seconds. Use a rubber spatula to push soft curds across the pan.',
      'When eggs are 80% cooked, gently fold in the diced avocado cubes so they warm through without turning mushy.',
      'Slide off the heat while eggs are still soft and glossy. Plate immediately!'
    ],
    bunnyChefTip: "Never cook avocado on high heat or it becomes bitter! Fold it in during the final 30 seconds so it gets warm, silky, and rich.",
    tags: ['Keto', 'Heart Healthy Fats', 'Clean Eating', 'Quick Breakfast'],
    nutrition: {
      calories: 270,
      protein: '14g',
      carbs: '6g',
      fat: '21g',
      highlight: 'Packed with Omega-3s and healthy fats'
    }
  },
  {
    id: 'peanut-butter-fudge-drops',
    title: '2-Minute Microwave PB Fudge Drops',
    subtitle: 'Warm, melt-in-your-mouth creamy peanut butter bites',
    category: 'sweet',
    totalTimeMinutes: 3,
    prepTimeMinutes: 1,
    cookTimeMinutes: 2,
    method: 'Microwave',
    ingredient1: {
      name: 'Creamy Peanut Butter',
      amount: 0.5,
      unit: 'cup',
      notes: 'natural or traditional creamy peanut butter'
    },
    ingredient2: {
      name: 'Pure Maple Syrup or Honey',
      amount: 0.25,
      unit: 'cup',
      notes: 'warm liquid sweetener binds into fudge'
    },
    optionalPantryBonus: 'Pinch of sea salt or mini dark chocolate chips',
    servings: 2,
    steps: [
      'Combine peanut butter and maple syrup in a microwave-safe glass bowl.',
      'Microwave on high for 35 seconds until warmed and glossy.',
      'Vigorously stir with a spoon for 45 seconds — like magic, the mixture will thicken into glossy cookie-dough fudge!',
      'Scoop rounded tablespoon drops onto parchment paper.',
      'Enjoy warm, or chill in the freezer for 3 minutes for chewy fudge discs.'
    ],
    bunnyChefTip: "When you stir warm peanut butter with maple syrup, the emulsification thickens naturally without any flour or butter!",
    tags: ['Plant-Based', 'Dairy-Free', 'No Flour', 'Sweet Tooth'],
    nutrition: {
      calories: 210,
      protein: '7g',
      carbs: '17g',
      fat: '14g',
      highlight: 'Natural plant protein with zero refined sugars'
    }
  },
  {
    id: 'air-fryer-honey-bananas',
    title: 'Caramelized Honey Glazed Bananas',
    subtitle: 'Golden caramelized bananas with a crisp exterior and custard center',
    category: 'sweet',
    totalTimeMinutes: 7,
    prepTimeMinutes: 2,
    cookTimeMinutes: 5,
    method: 'Air Fryer',
    ingredient1: {
      name: 'Firm Yellow Bananas',
      amount: 2,
      unit: 'medium bananas',
      notes: 'sliced lengthwise or into thick 1-inch coins'
    },
    ingredient2: {
      name: 'Raw Honey',
      amount: 2,
      unit: 'tablespoons',
      notes: 'drizzled generously over the slices'
    },
    optionalPantryBonus: 'Dusting of cinnamon or crushed toasted nuts',
    servings: 2,
    steps: [
      'Peel bananas and slice each one down the middle lengthwise.',
      'Brush or drizzle honey generously over both sides of the banana halves.',
      'Place cut-side up in an air fryer basket lined with perforated parchment or foil.',
      'Air fry at 380°F (195°C) for 5 minutes until the honey bubbles and deep amber edges appear.',
      'Gently lift out and serve immediately with a spoon!'
    ],
    bunnyChefTip: "Use firm bananas that are just yellow without brown spots — firm bananas hold their shape while honey forms a crunchy candy glaze.",
    tags: ['Naturally Sweet', 'Comfort Dessert', 'Under 10 Mins', 'Air Fryer'],
    nutrition: {
      calories: 165,
      protein: '1.5g',
      carbs: '42g',
      fat: '0.5g',
      highlight: 'Warm comforting dessert with zero butter or oil'
    }
  },
  {
    id: 'whipped-dalgona-latte',
    title: 'Frothy Whipped Dalgona Cloud Latte',
    subtitle: 'Velvety whipped coffee foam floating atop ice-cold milk',
    category: 'drink',
    totalTimeMinutes: 4,
    prepTimeMinutes: 3,
    cookTimeMinutes: 1,
    method: 'No-Cook',
    ingredient1: {
      name: 'Instant Coffee Granules',
      amount: 2,
      unit: 'tablespoons',
      notes: 'whipped with 2 tbsp sugar and 2 tbsp hot water'
    },
    ingredient2: {
      name: 'Cold Milk (Dairy or Oat)',
      amount: 1,
      unit: 'cup',
      notes: 'served over ice in a tall clear glass'
    },
    optionalPantryBonus: 'Sprinkle of cocoa powder on the whipped foam',
    servings: 1,
    steps: [
      'In a small bowl, combine 2 tbsp instant coffee, 2 tbsp sugar, and 2 tbsp hot water.',
      'Use a handheld milk frother or small whisk and beat vigorously for 90 seconds until a thick, golden, marshmallow-like foam forms.',
      'Fill a tall glass with ice cubes and pour in 1 cup of cold whole milk or creamy oat milk.',
      'Spoon the velvety whipped coffee cloud on top of the milk.',
      'Snap a photo, then swirl together and sip through a straw!'
    ],
    bunnyChefTip: "Hot water is the secret! It instantly dissolves coffee oils so you can whip stiff peaks in under 90 seconds.",
    tags: ['Barista Style', 'Refreshing', 'Viral Trend', 'Energizing'],
    nutrition: {
      calories: 170,
      protein: '8g',
      carbs: '22g',
      fat: '5g',
      highlight: 'Cafe quality luxury in your own home'
    }
  },
  {
    id: 'puff-pastry-nutella-twists',
    title: 'Air Fryer Nutella French Twists',
    subtitle: 'Flaky, buttery pastry ribbons filled with warm hazelnut spread',
    category: 'sweet',
    totalTimeMinutes: 8,
    prepTimeMinutes: 3,
    cookTimeMinutes: 5,
    method: 'Air Fryer',
    ingredient1: {
      name: 'Puff Pastry Sheet',
      amount: 1,
      unit: 'sheet (thawed)',
      notes: 'all-butter puff pastry cut into strips'
    },
    ingredient2: {
      name: 'Nutella',
      amount: 3,
      unit: 'tablespoons',
      notes: 'spread in a thin, even layer'
    },
    optionalPantryBonus: 'Egg wash for golden shine or powdered sugar dusting',
    servings: 2,
    steps: [
      'Unroll thawed puff pastry sheet onto parchment paper.',
      'Spread Nutella thinly over one half of the dough, then fold the other half over like a book.',
      'Cut into 1-inch strips and gently twist each strip 3 times like a spiral ribbon.',
      'Arrange twists in the air fryer basket with space between them.',
      'Air fry at 375°F (190°C) for 5 to 6 minutes until puffed, flaky, and golden brown. Serve warm!'
    ],
    bunnyChefTip: "Keep the pastry cool! If it gets too soft while twisting, pop it in the freezer for 60 seconds before putting it in the air fryer.",
    tags: ['Bakery Style', 'Flaky', 'Impressive', '8-Minute Wonder'],
    nutrition: {
      calories: 260,
      protein: '4g',
      carbs: '28g',
      fat: '15g',
      highlight: 'Crisp Parisian bakery layers in 8 minutes'
    }
  },
  {
    id: 'peanut-butter-banana-shake',
    title: 'Frosty PB-Banana Energy Shake',
    subtitle: 'Thick, creamy milkshake consistency with zero added sugar',
    category: 'drink',
    totalTimeMinutes: 2,
    prepTimeMinutes: 1,
    cookTimeMinutes: 1,
    method: 'Blender',
    ingredient1: {
      name: 'Frozen Bananas',
      amount: 2,
      unit: 'medium bananas (frozen slices)',
      notes: 'frozen ripe creates an ultra-thick ice cream texture'
    },
    ingredient2: {
      name: 'Creamy Peanut Butter',
      amount: 2,
      unit: 'tablespoons',
      notes: 'adds rich nutty flavor and healthy fats'
    },
    optionalPantryBonus: 'Splash of almond milk or pinch of cinnamon if needed for blending',
    servings: 1,
    steps: [
      'Place frozen banana slices and creamy peanut butter directly into the blender cup.',
      'Add 2-3 tablespoons of water or milk just to help the blades catch.',
      'Blend on high for 45 seconds until thick, frosty, and swirling smoothly.',
      'Pour into a chilled glass and enjoy with a spoon or wide straw!'
    ],
    bunnyChefTip: "Always keep peeled banana coins in a freezer ziplock bag — whenever craving strikes, you have an instant thick shake in 2 minutes flat!",
    tags: ['High Energy', 'Post-Workout', 'No Sugar Added', '2-Minute Flash'],
    nutrition: {
      calories: 295,
      protein: '9g',
      carbs: '46g',
      fat: '11g',
      highlight: 'Clean sustained energy with 9g protein'
    }
  },
  {
    id: 'salsa-poached-egg-skillet',
    title: 'Huevos Rancheros Quick Skillet',
    subtitle: 'Tender poached egg simmered in bubbling spiced salsa',
    category: 'breakfast',
    totalTimeMinutes: 6,
    prepTimeMinutes: 1,
    cookTimeMinutes: 5,
    method: 'Skillet',
    ingredient1: {
      name: 'Zesty Chunky Salsa',
      amount: 0.75,
      unit: 'cup',
      notes: 'your favorite roasted tomato salsa'
    },
    ingredient2: {
      name: 'Fresh Eggs',
      amount: 2,
      unit: 'large eggs',
      notes: 'cracked gently into simmering salsa wells'
    },
    optionalPantryBonus: 'Chopped fresh cilantro or warm tortilla for dipping',
    servings: 1,
    steps: [
      'Pour salsa into a small 8-inch non-stick skillet over medium heat and bring to a lively simmer.',
      'Use a spoon to create two small divots/wells in the salsa.',
      'Gently crack an egg directly into each well.',
      'Cover skillet with a lid or plate and simmer on medium-low for 3 to 4 minutes until egg whites are set and yolks remain runny.',
      'Remove from heat and spoon warm spicy salsa over the top. Scoop up with bread or chips!'
    ],
    bunnyChefTip: "Putting a tight lid on the pan traps steam, cooking the egg tops quickly without scorching the salsa base.",
    tags: ['Savory Breakfast', 'Low Carb', 'Spicy', 'One Pan'],
    nutrition: {
      calories: 185,
      protein: '13g',
      carbs: '9g',
      fat: '10g',
      highlight: 'Restaurant-style poached eggs in 6 minutes'
    }
  },
  {
    id: 'sweet-condensed-fudge',
    title: 'Velvety Dark Chocolate Fudge',
    subtitle: 'Rich, glossy European-style chocolate fudge created in a mug',
    category: 'sweet',
    totalTimeMinutes: 4,
    prepTimeMinutes: 1,
    cookTimeMinutes: 3,
    method: 'Microwave',
    ingredient1: {
      name: 'Sweetened Condensed Milk',
      amount: 0.5,
      unit: 'cup',
      notes: 'rich, syrupy and sweet'
    },
    ingredient2: {
      name: 'Dark Chocolate Chips (60%+)',
      amount: 1,
      unit: 'cup',
      notes: 'semi-sweet or bittersweet dark chocolate'
    },
    optionalPantryBonus: 'Flaky Maldon sea salt crystals on top',
    servings: 4,
    steps: [
      'In a microwave-safe glass bowl, combine chocolate chips and sweetened condensed milk.',
      'Microwave on 50% power for 60 seconds. Remove and stir with a rubber spatula.',
      'Microwave for another 30 seconds until chips are melted and glossy.',
      'Stir vigorously until a thick, shiny fudge forms.',
      'Spoon into small silicone candy molds or parchment-lined mini loaf pan. Cool for 2 minutes and devour!'
    ],
    bunnyChefTip: "Use 50% power in your microwave to keep the chocolate velvety smooth without seizing or scorching.",
    tags: ['Gourmet Sweet', 'No Bake', 'Chocolate Lovers', 'Decadent'],
    nutrition: {
      calories: 210,
      protein: '3g',
      carbs: '28g',
      fat: '10g',
      highlight: 'Ultra-rich and glossy French confectionery texture'
    }
  },
  {
    id: 'prosciutto-cantaloupe-bites',
    title: 'Sweet Melon & Crispy Prosciutto Wraps',
    subtitle: 'Sweet aromatic melon wrapped in salty Italian cured ham',
    category: 'savory',
    totalTimeMinutes: 3,
    prepTimeMinutes: 3,
    cookTimeMinutes: 0,
    method: 'No-Cook',
    ingredient1: {
      name: 'Sweet Cantaloupe or Honeydew',
      amount: 1,
      unit: 'cup (sliced into spears)',
      notes: 'chilled, ripe and juicy'
    },
    ingredient2: {
      name: 'Prosciutto di Parma',
      amount: 4,
      unit: 'thin slices',
      notes: 'delicate Italian dry-cured ham'
    },
    optionalPantryBonus: 'Balsamic glaze drizzle or cracked black pepper',
    servings: 2,
    steps: [
      'Slice cold, fragrant melon into 4 finger-friendly spears.',
      'Carefully peel each slice of prosciutto.',
      'Wrap one prosciutto slice spiraling snugly around the center of each melon spear.',
      'Arrange on a serving board and eat immediately for the timeless sweet-and-salty Italian magic!'
    ],
    bunnyChefTip: "For an extra gourmet twist, sear the wrapped spears in a smoking hot pan for 30 seconds per side so the prosciutto gets paper-crisp!",
    tags: ['Italian Antipasto', 'No-Cook', 'Low Calorie', 'Sophisticated'],
    nutrition: {
      calories: 95,
      protein: '7g',
      carbs: '10g',
      fat: '3g',
      highlight: 'Under 100 calories of pure Italian luxury'
    }
  },
  {
    id: 'frozen-mango-sorbet',
    title: 'Zesty Golden Mango Blitz Sorbet',
    subtitle: 'Vibrant tropical fruit sorbet with real lime zing',
    category: 'sweet',
    totalTimeMinutes: 3,
    prepTimeMinutes: 1,
    cookTimeMinutes: 2,
    method: 'Blender',
    ingredient1: {
      name: 'Frozen Mango Chunks',
      amount: 2,
      unit: 'cups',
      notes: 'sweet tropical Alphonso or Honey mangoes'
    },
    ingredient2: {
      name: 'Fresh Lime Juice',
      amount: 2,
      unit: 'tablespoons',
      notes: 'squeezed fresh from 1 juicy lime'
    },
    optionalPantryBonus: 'Pinch of chili-lime Tajin seasoning or mint leaf',
    servings: 2,
    steps: [
      'Add frozen mango chunks directly into a food processor or high-speed blender container.',
      'Squeeze in the fresh lime juice along with 2 tablespoons of cold water.',
      'Blend on high, pulsing initially, then tamping down until the fruit turns into a sunny, creamy yellow sorbet.',
      'Scoop with an ice cream scoop into chilled glasses.',
      'Top with a lime wheel and savor the tropical blast!'
    ],
    bunnyChefTip: "Lime juice not only balances the deep sweetness of mango, it prevents oxidation keeping that gorgeous sunny buttermilk color bright!",
    tags: ['100% Fruit', 'Fat Free', 'Vegan', 'Refreshing'],
    nutrition: {
      calories: 90,
      protein: '1g',
      carbs: '24g',
      fat: '0g',
      highlight: 'Zero fat, 100% vitamin C boost'
    }
  }
];

export const PANTRY_QUICK_PICKS: PantryIngredient[] = [
  { id: 'banana', name: 'Banana', icon: '🍌', category: 'fruit' },
  { id: 'egg', name: 'Eggs', icon: '🥚', category: 'fridge' },
  { id: 'cheddar', name: 'Cheddar Cheese', icon: '🧀', category: 'fridge' },
  { id: 'nutella', name: 'Nutella', icon: '🍫', category: 'pantry' },
  { id: 'peanut-butter', name: 'Peanut Butter', icon: '🥜', category: 'pantry' },
  { id: 'tortilla', name: 'Tortilla', icon: '🫓', category: 'bakery' },
  { id: 'greek-yogurt', name: 'Greek Yogurt', icon: '🥛', category: 'fridge' },
  { id: 'flour', name: 'Self-Rising Flour', icon: '🌾', category: 'pantry' },
  { id: 'condensed-milk', name: 'Condensed Milk', icon: '🥫', category: 'pantry' },
  { id: 'chocolate-chips', name: 'Chocolate Chips', icon: '🍪', category: 'pantry' },
  { id: 'avocado', name: 'Avocado', icon: '🥑', category: 'fruit' },
  { id: 'salsa', name: 'Salsa', icon: '🍅', category: 'pantry' },
  { id: 'puff-pastry', name: 'Puff Pastry', icon: '🥐', category: 'bakery' },
  { id: 'ice-cream', name: 'Vanilla Ice Cream', icon: '🍨', category: 'fridge' },
  { id: 'coffee', name: 'Espresso / Coffee', icon: '☕', category: 'pantry' },
  { id: 'strawberries', name: 'Strawberries', icon: '🍓', category: 'fruit' },
];
