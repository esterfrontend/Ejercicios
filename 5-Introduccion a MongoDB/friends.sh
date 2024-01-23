# 1
db.samples_friends.find({season: 1})
# 2
db.samples_friends.find({airtime: '20:00'})
# 3
db.samples_friends.find({name: /w/})
# 4
db.samples_friends.find({season: 2}).sort({airdate: 1}).limit(1)
# 5
db.samples_friends.find().sort({airdate: 1}).limit(5)
# 6
db.samples_friends.find({name: /Chandler/})
# 7
db.samples_friends.find({name: /Chandler/})
# 8
db.samples_friends.find({$and: [{season: 3}, {summary: /Ross/}]})


