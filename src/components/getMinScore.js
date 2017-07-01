const weight = [10, 19, 27 ,32, 37.5]
let schemes = []

const getNextScheme = (arr)=>{

    const commodityTypeCount = arr.filter((item)=>{
        return item!==0
    }).length
    const commodityCount = arr.reduce((a, b)=>{
        return a+b
    }, 0)
    if(commodityTypeCount<=1){
        let res = []
        for(let t=0;t<commodityCount;t++){
            res.push(1)
        }
        return res
    }
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
    let minIndex = 1
    if(schemes.length===0){
        return []
    }
    let minSchemeItem = schemes.reduce((a, b, index)=>{
        if(a.score<=b.score) {
            minIndex = index-1
            return a
        }
        minIndex = index
        return b
    }).item
    let _minSchemeItem = [...minSchemeItem]
    schemes[minIndex] = getNextState(schemes[minIndex])
    return _minSchemeItem
}

/**
 * 用当前状态推导出下次的状态
 * @param  {Object} _state 当前的状态
 * @return {Object}        下一个状态
 */
const getNextState = (_state)=>{
    let state = _state
    let index = state.item.length
    while(index>0){
        if(state.item[index-1]>1){
            state.item[index-1]--
            if(state.item[index]!=null){
                let _index = index
                //将减去的数依次向后移动
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

const checkScheme = (arr, scheme)=>{
    for(let i = 0;i<scheme.length;i++){
        arr.sort((a, b)=>{
            return b-a
        })
        for(let j=0;j<scheme[i];j++){
            arr[j]--
        }
    }
    if(arr.filter((item)=>{
        return item!==0
    }).length===0){
        return true
    }
    return false
}

/**
 * 获取最好的打包方案
 * @param  {Array} _arr 当前的产品序列
 * @return {Array}     最好的打包方法
 */
const getMinScore = (_arr)=>{
    schemes = []
    let maxTimes = 100
    while(maxTimes>0){
        maxTimes--
        const arr = _arr.map((item)=>{
            return item
        })
        let nextScheme = getNextScheme(arr)
        // console.log(nextScheme)
        if(checkScheme(arr, nextScheme)){
            return nextScheme
        }
    }
}

export default getMinScore
