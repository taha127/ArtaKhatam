<template>
    <main class="home">
        <AnnouncementBar :messages="announcements_messages" :interval="4000" />
        <Header
          :is-menu-open="isMenuOpen"
          @toggle-menu="menuStore.toggleMenu" 
        />
        <MobileMenu v-model="isMenuOpen">
        </MobileMenu>
        <HeroBanner :slides="slides" :autoplay-interval="8000" />
        <ServiceSection :items="services" />
        <CommonSection gap="var(--space-4)">
            <SectionHeader title="دسته‌بندی‌ها" :show-view-all="false" />
                <ItemsSection gap="var(--space-4)">
                    <CategoryItem
                      v-for="cat in categories"
                      :key="cat.id"
                      :image="cat.image"
                      :title="cat.title"
                    />
                </ItemsSection>
        </CommonSection>
        <CommonSection paddingY="var(--space-4)">
            <SectionHeader title="محصولات ویژه" />
                <ItemsSection>
                    <ProductCard
                        v-for="product in products"
                        :key="product.id"
                        :image="product.image"
                        :title="product.title"
                        :price="product.price"
                        :old-price="product.old_price"
                        :discount="product.discount"
                    />
                </ItemsSection>
        </CommonSection>
        <CommonSection paddingY="var(--space-4)">
            <SectionHeader title="تازه‌ها" />
                <ItemsSection>
                    <ProductCard
                        v-for="product in products"
                        :key="product.id"
                        :image="product.image"
                        :title="product.title"
                        :price="product.price"
                        :old-price="product.old_price"
                        :discount="product.discount"
                    />
                </ItemsSection>
        </CommonSection>
        <ProductPromoCard
            title="صنایع دستی مس و خاتم آرتا"
            subtitle="بهترین کیفیت و مناسب‌ترین قیمت را به طور مستقیم از تولید کننده خریداری کنید"
            button-text="تماس جهت راهنمایی"
            :button-icon="ArrowLeft"   
            image="src/assets/images/image-banner.png"
            image-alt="مجموعه ظروف مسی و خاتم"
        />
        <CommonSection paddingY="var(--space-10)">
            <SectionHeader title="مقاله‌ها" />
                <ItemsSection>
                    <ArticleCard
                        v-for="article in articles"
                        :key="article.id"
                        :image="article.image"
                        :title="article.title"
                        :summary="article.summary"
                        :date="article.date"
                    />
                </ItemsSection>
        </CommonSection>
        <Footer
            brand-summary-text="مرجع تخصصی تهیه و ارائه مرغوب‌ترین صنایع دستی اصیل ایرانی نظیر خاتم‌کاری، فیروزه‌کوبی و قلمزنی."
            phone="۰۹۹۹۹۹۹۹۹۹۹"
            address="اصفهان، خیابان استانداری، میدان نقش جهان، انتهای بازار، پلاک۹، صنایع دستی آرتا"
            map-image="src\assets\images\map.png"
            :quick-links="links"
            :socials="socials"
        />
        <BottomNav :tabs="tabs" />
    </main>
</template>

<script setup>
import AnnouncementBar from '@/components/navigation/AnnouncementBar.vue'
import Header from '@/components/navigation/Header.vue';
import HeroBanner from '@/components/home/HeroBanner.vue';
import ServiceSection from '@/sections/ServiceSection.vue';
import CommonSection from '@/sections/CommonSection.vue';
import SectionHeader from '@/components/common/SectionHeader.vue';
import ItemsSection from '@/sections/ItemsSection.vue';
import CategoryItem from '@/components/common/CategoryItem.vue';
import ProductCard from '@/components/product/ProductCard.vue';
import ProductPromoCard from '@/components/home/ProductPromoCard.vue';
import ArticleCard from '@/components/common/ArticleCard.vue';
import Footer from '@/components/footer/Footer.vue';
import BottomNav from '@/components/navigation/BottomNav.vue';
import MobileMenu from '@/components/navigation/MobileMenu.vue';

import { ShieldCheck, Truck, CircleDollarSign, ArrowLeft, Home, Store, ShoppingBag, Heart, User } from "lucide-vue-next";
import { faWhatsapp, faTelegram, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { useMenuStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const announcements_messages = [
    "ارسال رایگان برای سفارش‌های بالای ۵۰ میلیون تومان",
    "تخفیف ۲۰٪ برای اولین خرید شما",
    "پشتیبانی ۲۴ ساعته در تمام روزهای هفته",
];

const slides = [
    {
        image: "src/assets/images/hero-image.png",
        title: "هنر اصیل ایرانی",
        subtitle: "صنایع دستی مس خاتم و مس فیروزه",
    },
    {
        image: "src/assets/images/set-khatam.jpeg"
    }
];

const services = [
    { icon: ShieldCheck, text: "ضمانت اصالت" },
    { icon: Truck, text: "ارسال سریع" },
    { icon: CircleDollarSign, text: "مناسب‌ترین قیمت" },
];

const categories = [
    { id: 1, image: "src/assets/images/category1.png", title: "خاتم و قلم‌زنی" },
    { id: 2, image: "src/assets/images/category2.jpg", title: "خاتم و مس" },
    { id: 3, image: "src/assets/images/category3.png", title: "خاتم و میناکاری" },
    { id: 3, image: "src/assets/images/category4.png", title: "خاتم و فیروزه" },
];

const products = [
    { id: 1, image: "src/assets/images/product1.png", title: "تنگ مس و مینیاتور", 
    price: 8000000, old_price: 9000000},
    { id: 2, image: "src/assets/images/product2.png", title: "قندخوری فیروزه",
        price: 5000000, old_price: 6500000},
    { id: 3, image: "src/assets/images/product3.png", title: "آجیل‌خوری خاتم",
        price: 6500000, old_price: 7000000},
    { id: 4, image: "src/assets/images/product4.png", title: "جعبه خاتم",
        price: 4000000},
];

const articles = [
    { id: 1, image: "src/assets/images/article1.png", 
        title: "مقایسه مس مدرن و مس فیروزه کوب، تفاوت‌ها، کاربرد و راهنمای خرید",
        summary: "هر محصول در هنر ایرانی حاصل کار بی‌وقفه استادکارانی است که هنر موروثی نسل‌های خود را به نسل آینده انتقال...",
        date: "۸ دی ۱۴۰۵"
    },
    { id: 2, image: "src/assets/images/article2.png", 
        title: "تشخیص کیفیت آثار فیروزه‌کوبی شده و آشنایی با روش ساخت این آثار",
        summary: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
        date: "۸ دی ۱۴۰۵"
    },
    { id: 3, image: "src/assets/images/hero-image.png", 
        title: "انواع محصولات صنایع هنری مس در اصفهان و مقایسه زیبایی و قیمت آنها",
        summary: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",
        date: "۸ دی ۱۴۰۵"
    },
];

const links = [
  { text: "محصولات جدید", href: "/products/new" },
  { text: "درباره ما", href: "/about" },
  { text: "راه ارتباطی", href: "/contact" },
  { text: "قوانین و مقررات", href: "/terms" },
];

const socials = [
  { name: "اینستاگرام", icon: faInstagram, href: "https://instagram.com/..." },
  { name: "تلگرام", icon: faTelegram, href: "https://t.me/..." },
  { name: "واتساپ", icon: faWhatsapp, href: "https://wa.me/..." },
];

const tabs = [
  { id: "home", icon: Home, label: "خانه" },
  { id: "shop", icon: Store, label: "فروشگاه" },
  { id: "cart", icon: ShoppingBag, label: "سبد خرید" },
  { id: "favorites", icon: Heart, label: "علاقه‌مندی" },
  { id: "account", icon: User, label: "حساب من" },
];

const menuStore = useMenuStore()
const { isMenuOpen } = storeToRefs(menuStore);

</script>

<style lang="scss" scoped>
</style>