# 1
db.samples_friends.find({season: 1})
# 2
db.samples_friends.find({airtime: '20:00'})
# 3
db.samples_friends.find({name: /w/i})
# 4
db.samples_friends.find({$and: [{season: 2}, {number: 1}]})
# 5
db.samples_friends.find({$and: [{season: 1}, {number: { $lte: 5}}]})
# 6
db.samples_friends.find({name: /^The One/i})
# 7
db.samples_friends.find({name: /Chandler/})
# 8
db.samples_friends.find({$and: [{season: 3}, {summary: /Ross/}]})


