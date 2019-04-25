/*header*/
let headerRender = (function () {
    let $headerBox=$('.headerBox');
    let $navMenu=$headerBox.find('.navMenu');
    let $navBox=$('.navBox');

    let handleTap=function handleTap() {
        let block=$navBox.css('display');
        if (block==='none'){
            $navBox.css('display','block');
            return;
        }
        $navBox.css('display','none');
    };

    return {
        init: function init() {
            $navMenu.tap(handleTap);
        }
    }
})();
headerRender.init();

/*banner*/
let bannerRender = (function () {
    let $bannerBox=$('.bannerBox');
    let $wrapper=$bannerBox.find('.swiper-wrapper');

    let queryData=function queryData() {
        return new Promise(resolve => {
            $.ajax({
                url:'json/bannerxinlang.json',
                dataType:'json',
                success:resolve
            })
        })
    };

    let bindHTML=function bindHTML(result) {
        let str=``;
        result.forEach((item,index)=>{
            let {img,desc}=item;
            str+=`<div class="swiper-slide">
                <img src="${img}" alt="">
                <p>${desc}</p>
            </div>`;
        });
        $wrapper.html(str);
        $bannerBox.css('display','block');
    };

    let swiperInit=function swiperInit() {
        let swiper=new Swiper('.bannerBox',{
            loop:true,
            autoplay:{
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction'
            }
        })
    };

    return {
        init: function init() {
            let promise=queryData();
            promise.then(bindHTML)
                .then(swiperInit);
        }
    }
})();
bannerRender.init();

/*message*/
let messageRender = (function () {
    let $messageBox=$('.messageBox');
    let $wrapper=$messageBox.find('.swiper-wrapper');

    let queryData=function queryData() {
        return new Promise(resolve => {
            $.ajax({
                url:'json/aside.json',
                dataType:'json',
                success:resolve
            })
        })
    };

    let bindHTML=function bindHTML(result) {
        let str=``;
        result.forEach((item)=>{
            let {link,title}=item;
            str+=`<div class="swiper-slide"><a href="${link}">${title}</a></div>`;
        });
        $wrapper.html(str);
        $messageBox.css('display','block');
    };

    let swiperInit=function swiperInit() {
        let swiper=new Swiper('.messageCon',{
            loop:true,
            autoplay: true,
            direction : 'vertical'
        })
    };

    return {
        init: function init() {
            let promise=queryData();
            promise.then(bindHTML)
                .then(swiperInit);
        }
    }
})();
messageRender.init();

/*news*/
let newsRender = (function () {
    let $newsBox=$('.newsBox');
    let $container=$newsBox.find('.container');/*
    let $imgList=$container.find('li.imgBox img');
    console.log($imgList);*/

    let queryData=function queryData() {
        return new Promise(resolve => {
            $.ajax({
                url:'json/news.json',
                dataType:'json',
                success:resolve
            })
        })
    };

    let bindHTML=function bindHTML(result) {
        let newsResult=result[0];
        let newsAry=newsResult.news;
        let str=``;
        newsAry.forEach((item)=>{
            let {title,src,comment,imgList=null}=item;
            if (imgList ===null) {
                str+=`<li class="newsItem clearfix">
                <img src="${src}" alt="">
                <h3>${title}</h3>
                <span>${comment}<i class="icon-comment"></i></span>
            </li>`;
            }else {
                let [imgOne,imgTwo,imgThree]=imgList;
                str+=`<li class="newsItem imgBox">
                <h3>${title}</h3>
                <div class="clearfix">
                    <img src="${imgOne}" alt="">
                    <img src="${imgTwo}" alt="">
                    <img src="${imgThree}" alt="">
                </div>
                <span>${comment} <i class="icon-comment"></i></span>
            </li>`;
            }
        });
        $container.html(str);
        $newsBox.css('display','block');
    };


    return {
        init: function init() {
            let promise=queryData();
            promise.then(bindHTML);
        }
    }
})();
newsRender.init();