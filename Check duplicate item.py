def check_duplicate_item(item_list_a, item_list_b):
    new_list = []
    for item_a in item_list_a:
        for item_b in item_list_b:
            if item_a == item_b:
                new_list.append(item_a)
    return new_list
    # return list(set(item_list_a) & set(item_list_b))
        
if __name__ == "__main__":
    item_list_a = [1,2,3,5,6,8,9]
    item_list_b = [3,2,1,5,6,0]
    print(check_duplicate_item(item_list_a, item_list_b))