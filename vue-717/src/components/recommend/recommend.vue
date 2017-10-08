<template>
    <div class="recommend">
        <h3 class="recommend-title">
            热门推荐
        </h3>
        <div class="recommend-list">
            <div class="swiper-container recommend">
                <div class="swiper-wrapper">

                    <dl class="swiper-slide product-item">
                        <dt><img src="../../imgs/product/product_05.jpg" alt=""></dt>
                        <dd>
                            <p class="product-name">升元冷面</p>
                            <p class="product-price">￥109.00</p>
                        </dd>
                    </dl>
                    <dl class="swiper-slide product-item">
                        <dt><img src="../../imgs/product/product_05.jpg" alt=""></dt>
                        <dd>
                            <p class="product-name">升元冷面</p>
                            <p class="product-price">￥109.00</p>
                        </dd>
                    </dl>
                    <dl class="swiper-slide product-item">
                        <dt><img src="../../imgs/product/product_05.jpg" alt=""></dt>
                        <dd>
                            <p class="product-name">升元冷面</p>
                            <p class="product-price">￥109.00</p>
                        </dd>
                    </dl>
                    <dl class="swiper-slide product-item">
                        <dt><img src="../../imgs/product/product_05.jpg" alt=""></dt>
                        <dd>
                            <p class="product-name">升元冷面</p>
                            <p class="product-price">￥109.00</p>
                        </dd>
                    </dl>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        new Swiper('.recommend', {
            slidesPerView: 3,
            spaceBetween: 20
        });
    }

}
</script>
<style lang="scss" scoped>
.recommend {
    background-color: #fff;
}

.recommend-title {
    text-align: center;
    line-height: .66rem;
    font-size: .28rem;
}

.recommend-list {
    width: 100%;
    padding-left: .3rem;
    padding-right: .3rem;
    box-sizing: border-box;
    .product-item {
        width: 2.04rem;
        dt {
            width: 2.04rem;
            height: 2.04rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        dd {
            .product-name {
                height: 0.7rem;
                display: -webkit-box;
                -webkit-box-pack: center;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .product-price {
                color: #ea1313;
                line-height: .52rem;
                text-align: center;
            }
        }
    }
}
</style>


