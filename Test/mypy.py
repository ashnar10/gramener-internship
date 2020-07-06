def cubed(handler): 
    num = int(handler.get_arg('v'))
    result={}
    result['value'] = num*num*num
    return result 




