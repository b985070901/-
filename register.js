var express = require("express");
var router = express.Router();
const user = require("../sql/user");



router.get("/", function (req, res, next) {
    console.log('此时进入了register')
    res.render("register");
});




router.post("/in", function (req, res, next) {
    console.log("进入register 的in 处理");

    let obj = req.body;
    console.log(obj)
    console.log(obj.username);
    console.log(obj.password)

    // user.insertMany(obj, (err, data) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     console.log(data)

    //     if (data) {
    //         res.redirect('/login')
    //     } else {
    //         res.redirect('/register')
    //     }

    // })

    // 重复用户问题

    // user.insertMany(obj, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(data);
    //     if (data) {
    //         res.redirect('/login')
    //     } else {
    //         res.redirect('/register')
    //     }
    // })

    //解决用户重复的第二种写法
    // user.findOne({ username: obj.username }, (err, data) => {
    //     if (err) {
    //         //发送错误日志 可以写进数据库
    //         console.log(err)
    //     }
    //     if (data) {
    //         res.redirect('/register')
    //     } else {
    //         user.insertMany(obj, (err, data) => {
    //             if (err) {
    //                 console.log(err)
    //             }
    //             console.log(data)
    //             res.redirect('/login3')
    //         })
    //     }
    // })






    //第三种写法
    user.findOne({ username: obj.username }, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data) {
            res.redirect("/register");
        } else {
            user.insertMany(obj, (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.log(data);

                if (data) {
                    res.redirect("/login3");
                } else {
                    res.redirect("/register");
                }
            });
        }
    });



});










module.exports = router;