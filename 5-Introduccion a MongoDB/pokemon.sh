# 1
db.samples_pokemon.find({num: '132'})
# 2
db.samples_pokemon.find({avg_spawns: 4.2})
# 3
db.samples_pokemon.find({type: 'Poison'})
# 4
db.samples_pokemon.find({$and:[{candy_count: {$lt: 40}}, {candy_count: {$gt: 20}}]})
# 5
db.samples_pokemon.find({spawn_chance: {$gt: 0.088}})
# 6
db.samples_pokemon.find().limit(10).sort({weight:-1})
# 7
db.samples_pokemon..find({next_evolution: {$eleMatch: {num: '003'}}})
# 8
db.samples_pokemon.find({$and:[{candy_count: {$gte: 25}}, {avg_spawns: {$gt: 5}}]})
# 9
db.samples_pokemon.find({$and:[{weaknesses: "Ground"}, {multipliers: null}]})
# 10
db.samples_pokemon.find().sort({avg_spawns: -1})
# 11
db.samples_pokemon.find({candy_count: {$lt: 100}}).sort({candy_count: -1})
# 12
db.samples_pokemon.find({egg: "Not in Eggs"})
# 13
db.samples_pokemon.find({$or: [{multipliers: null}, {candy_count: {$gte: 100}}]})
# 14
db.samples_pokemon.find({$and: [{candy_count: {$gt: 25}}, {spawn_time: {$lt: 15}}, {avg_spawns: {$gt: 40}}]})
# 15
db.samples_pokemon.find({candy_count: {$gt: 50}}).limit(3)
# 16
db.samples_pokemon.find({$and: [{type: "Ground"}, {weaknesses: {$not: /^Grass$/}}]})
# 17
db.samples_pokemon.find().sort({candy_count: -1})
# 18
db.samples_pokemon.find().sort({spawn_chance: 1})
# 19
db.samples_pokemon.find({name: "Chansey"})


