<template>
	<div class="w-1/4 px-4 py-5">
		<div class="comics-item relative rounded">
			<div class="object-cover object-center">
				<img class="img mx-auto cursor-pointer w-full" :src="path" alt="comics-image" />
			</div>
			<h2 class="title overflow-hidden rounded py-5 font-bold text-md text-center cursor-pointer absolute w-full left-0 bottom-0 bg-gray-600">
                <span class="hover-bg absolute"></span>
                <span class="relative">{{ item.title }}</span>
            </h2>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		item: Object
	},
	computed: {
		path() {
			return `${this.item.thumbnail.path}/portrait_uncanny.${this.item.thumbnail.extension}`;
		}
	}
};
</script>

<style lang="scss" scoped>
.title {
	background: linear-gradient(to right bottom, #85c4e3 0%, #9792e4 100%);
	color: #fff;
    .hover-bg {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right bottom, #ffd1d1, #ff6f6f);
        top: 0;
        left: 0;
        opacity: 0;
    }
}
.title,
.hover-bg,
img {
	transition: 0.2s ease-in-out;
}
.comics-item {
	overflow: hidden;
	&:hover {
		.title {
			color: #012e94;
            .hover-bg {
                opacity: .8;
            }
		}
		img {
			transform: scale(1.1);
		}
	}
}
</style>
