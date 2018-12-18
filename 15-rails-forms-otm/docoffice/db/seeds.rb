Chicken.destroy_all

chickens = [['Pingu', 4], ['Chinckoo', 5], ['Sally', 3], ['Chicken Little', 1]]

chickens.each do |c|
  Chicken.create(name: c[0], age: c[1], feathers_num: 5)
end
