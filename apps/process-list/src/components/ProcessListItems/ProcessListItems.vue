<template>
	<div
		v-for='({ hosts, progress, target, threads, type }, index) in processes'
		:key='index'
		class='process'
		:class='[`process--type-${type}`]'
	>
		<div class='process-cell process__item' :title='`Running on ${hosts}`'>
			{{ target }}
			<span v-show='progress' class='process__progress-bar' :style='{ width: `${progress}%` }' />
		</div>
		<div class='process-cell process__threads'>
			{{ threads }}
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			processes: {
				type: Array,
				required: true,
			},
		},
	}
</script>

<style lang="scss">
	.process {
		color: #00A5F3;
		display: flex;
		flex: 1 0 100%;
		position: relative;

		&.process--type-weaken {
			color: #F3F330;
		}

		&.process--type-hack {
			color: #33D833;
		}

		&__progress-bar {
			background: currentColor;
			bottom: 0;
			left: 0;
			opacity: 0.3;
			position: absolute;
			top: 0;
		}
	}
</style>
