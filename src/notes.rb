current_list.user.lists - [current_list]

new_position = 2 # equal to destination.index
siblings = current_list.user.lists - [current_list]

# // siblings.pluck(:order)

sorted = siblings.sort_by { | l | l.order }

# // current_list.order
# // sorted.pluck(:order)
sorted.select { | l | l.order <= current_list.order }
sorted.select { |l| l.order <= new_position }

less_than = sorted.select { |l| l.order <= new_position }

less_than.each_with_index { |l, i| l.update(order: i)}
current_list.save

# current_list.user.lists.pluck(:order)