export default function (router, db) {
    router
    // banner list
    .get('/banner/list', function (req, res, next) {
        res.json(db.get('banners').value())
    })
    // item list
    .get('/item/list', function (req, res, next) {
        const item = db.get('items').getById(1).value()
        let items = []
        for(let i = 0; i < 20; i++) {
            items.push(Object.assign({}, item, {
                id: i + 1,
                desc: item.desc.substring(0, db._.random(10, item.desc.length))
            }))
        }
        res.json(items)
    })
    // item
    .get('/item/detail', function (req, res, next) {
        res.json(db.get('itemList').getById(1).value())
    })
}
