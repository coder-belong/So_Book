import request from './network'

// 获取分类列表
function getCategoryList() {
    return request({
        url: '/book/category'
    })
}

// 获取小说列表
function getBookList(categoryID, pageSize, pageNum) {
    return request({
        method:'post',
        url: `/book/category/${categoryID}`,
        data: {
            pageSize,
            pageNum
        }
    })
}

// 获取小说详情信息
function getBookDetialInfo(categoryID, bookID) {
    return request({
        url: `/book/category/${categoryID}/book/${bookID}`
    })
}

// 小说查询
function searchBookList(searchValue) {
    return request({
        url: `/book/search/${searchValue}`
    })
}



export {
    getCategoryList,
    getBookList,
    getBookDetialInfo,
    searchBookList,
}