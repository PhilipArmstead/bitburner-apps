<template>
    <header class='theme-browser__header'>
        <h1 class='title'>
            {{ title }}
        </h1>
        <button 
			v-if='!user || !user.id' 
			@click="$emit('login:click')"
		>
			<span>Login</span> / <span>Register</span>
		</button>
        <span v-if='user && user.id'>Hello {{ user.name || '' }}</span>
    </header>
</template>

<script>
	export default {
		name: 'TbHeader',
		props: {
			title: {
				type: String,
				required: true,
			},
			user: {
				type: Object,
				required: true,
			},
		},
	}
</script>

<style scoped lang='scss'>
	.theme-browser__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-basis: 100%;
		margin-bottom: 20px;

		h1, button, span {
			flex: 0 0 auto;
		}

		button {
			background: transparent;
			color: white;
			appearance: none;
			border: none;

			span {
				display: inline-block;
				padding-bottom: 3px;
				border-bottom: 1px white dotted;
			}
		}
	}
</style>
