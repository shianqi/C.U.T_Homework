const weight = [10, 19, 27 ,32, 37.5]
let schemes = []

const getNextScheme = (arr)=>{

    const commodityTypeCount = arr.filter((item)=>{
        return item!==0
    }).length
    const commodityCount = arr.reduce((a, b)=>{
        return a+b
    }, 0)

    for(let i=commodityTypeCount;i>1;i--){
        //如果没有初始化，就进行初始化
        if(schemes[i-1]==null){
            let _commodityCount = commodityCount
            let scheme = {
                item: [],
                score: 0
            }
            while(_commodityCount>i){
                scheme.item.push(i)
                _commodityCount -= i
                scheme.score += weight[i-1]
            }
            if(_commodityCount!==0){
                scheme.item.push(_commodityCount)
                scheme.score += weight[_commodityCount-1]
            }
            schemes[i-1] = scheme
        }
    }
    let minIndex = 0
    let minScheme = schemes.reduce((a, b, index)=>{
        if(a.score<=b.score) {
            minIndex = index-1
            return a
        }
        minIndex = index
        return b
    })
    console.log(minScheme.item)
    {
        schemes.map((item)=>{
            console.log(item.item.join(' '), item.score)
        })
    }
    schemes[minIndex] = getNextState(schemes[minIndex])
    return minScheme.item
}

const getNextState = (_state)=>{
    let state = _state
    let index = state.item.length
    while(index>0){
        if(state.item[index-1]>1){
            state.item[index-1]--
            if(state.item[index]!=null){
                let _index = index
                while(true){
                    if(state.item[_index]!=null){
                        if(state.item[_index] <state.item[index-1]){
                            state.item[_index]++
                            break
                        }else{
                            _index++
                        }
                    }else{
                        state.item[_index] = 1
                        break
                    }
                }
            }else{
                state.item[index]=1
            }
            break
        }
        index--
    }
    state.score = 0
    state.item.map((item)=>{
        state.score += weight[item-1]
    })
    return state
}

/**
 * 获取最好的打包方案
 * @param  {Array} arr 当前的产品序列
 * @return {Array}     最好的打包方法
 */
const getMinScore = (arr)=>{
    // let nextScheme = getNextScheme(arr)
    for(let i=0;i<5;i++){
        let nextScheme = getNextScheme(arr)
    }
    return arr
}

export default getMinScore
