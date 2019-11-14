let Router = require("koa-router")
let router = new Router()
let query = require("../db/query")


router.get("/list", async (ctx) => {
    try {
        let data = await query("select * from banner")
        ctx.body = {
            code: 1,
            data: data
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: e.error
        }
    }
})

router.get("/add", async (ctx) => {
    let {
        remark,
        type,
        sort
    } = ctx.query
    try {
        await query("INSERT INTO banner (remark,type,sort) VALUES(?,?,?)", [remark, type, sort])
        ctx.body = {
            code: 1,
            msg: "添加成功"
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: e.error
        }
    }
})

router.get("/del", async (ctx) => {
    let {
        id
    } = ctx.query
    try {
        await query("delete from banner where id=?", [id])
        ctx.body = {
            code: 1,
            msg: "删除成功"
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: e.error
        }
    }
})

router.get("/update", async (ctx) => {
    let {
        sort,
        remark,
        id
    } = ctx.query
    try {
        await query("update banner set sort=?,remark=? where id=?", [sort, remark, id])
        ctx.body = {
            code: 1,
            msg: "修改成功"
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: e.error
        }
    }
})

router.get("/dim", async (ctx) => {
    let {
        remark
    } = ctx.query;
    try {
        let data = await query(`select * from banner where remark like '%${remark}%'`)
        ctx.body = {
            code: 1,
            data: data
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: e.error
        }
    }
})

router.get("/fen", async (ctx) => {
    let { pagenum, limit} = ctx.query;
    let startIndex = (pagenum - 1) * limit;


    try {

        let data = await query(
            `select * from banner limit ${startIndex},${limit}`
        );
        let count = await query("select count(*) from banner");
        let total = Math.ceil(count[0]["count(*)"]);
        console.log(total)
        ctx.body = {
            code: 1,
            data: data,
            total
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: e.error
        }
    }
})

module.exports = router