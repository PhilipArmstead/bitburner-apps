<template>
	<app-wrapper ref='wrapper' v-bind="{ ...$props, title: 'Process list' }">
		<div class='process-list__container'>
			<div class='process-list'>
				<div class='process-list__head'>
					<button class='process-cell process-list__cta' @click="doSort('target')">
						Target
					</button>
					<button class='process-cell process-list__cta' @click="doSort('threads')">
						Threads
					</button>
				</div>
				<div class='process-list__body'>
					<process-list-items :processes='processes.running' />
					<div v-show='processes.sleeping.length' class='process-list__category'>
						<h2 class='category__name'>
							Sleeping
						</h2>
					</div>
					<process-list-items :processes='processes.sleeping' />
				</div>
			</div>
		</div>
	</app-wrapper>
</template>

<script>
	import { onMounted, ref } from 'vue'
	import { AppWrapper } from '@bitburner-theme-browser/common-components'
	import ProcessListItems from './src/components/ProcessListItems/ProcessListItems.vue'
	import { getProcessExpiryDetails, getRunningProcesses } from './src/helpers/processes'

	export default {
		components: { AppWrapper, ProcessListItems },
		props: {
			id: {
				type: String,
				required: true,
			},
			appFilePath: {
				type: String,
				default: null,
			},
			versionFilePath: {
				type: String,
				default: null,
			},
		},
		setup ({ id }) {
			const ns = window[`${id}-ns`]
			// const ns = window[`${id}-ns`] || {
			// 	flags: () => ({"no-group": false}),
			// }

			const wrapper = ref(null)
			const processListPayloads = window[`${id}-payload-list`] || {}
			const processes = ref({ sleeping: [], running: [] })
			const disableGrouping = ns.flags([['no-group', false]])['no-group']
			const sort = {
				param: 'expiry',
				isDescending: true,
			}

			onMounted(refreshProcessList)

			function refreshProcessList () {
				if (wrapper.value) {
					processes.value = populateProcesses()
					setTimeout(refreshProcessList, 200)
				}
			}

			/**
			 * @return {{
			 *  running: ({expiry: {duration: Number, timeRunning: Number}|null})[],
			 *  sleeping: ({expiry: {duration: Number, timeRunning: Number}|null})[]
			 * }}
			 */
			const populateProcesses = () => {
				const processes = getRunningProcesses(ns).map(([host, tasks]) => [
					...tasks
						.filter(({ args }) => args.length)
						.map(({ filename, args, threads }) => ({
							hosts: [host],
							args,
							target: args[0],
							threads,
							filename,
							type: Object.keys(processListPayloads).find((key) => processListPayloads[key].includes(filename)),
						}))
						.filter(({ type }) => type),
				]).flat()
					.map((process) => ({ ...process, expiry: getProcessExpiryDetails(ns, process) }))

				if (!disableGrouping) {
					for (let i = 0; i < processes.length; ++i) {
						let j = processes.length
						while (--j > i) {
							if (
								processes[i].type === processes[j].type &&
								JSON.stringify(processes[i].args) === JSON.stringify(processes[j].args)
							) {
								processes[i].threads += processes[j].threads
								processes[i].hosts = [...processes[i].hosts, ...processes[j].hosts]
								processes.splice(j, 1)
							}
						}
					}
				}

				processes.sort((a, b) => {
					const valueA = a[sort.param]
					const valueB = b[sort.param]

					if (sort.param === 'expiry') {
						return (valueA.duration - valueA.timeRunning) - (valueB.duration - valueB.timeRunning)
					} else {
						if (typeof valueA === 'string') {
							return sort.isDescending ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB)
						} else {
							return sort.isDescending ? valueB - valueA : valueA - valueB
						}
					}
				})

				return {
					running: processes.filter(({ expiry }) => !expiry.isSleeping).map((treatProcess)),
					sleeping: processes.filter(({ expiry }) => expiry.isSleeping).map((treatProcess)),
				}
			}

			const treatProcess = (process) => ({
				...process,
				hosts: process.hosts.join(', '),
				progress: process.expiry ? Math.min(100, process.expiry.timeRunning / process.expiry.duration * 100).toFixed(2) : 0,
				threads: process.threads.toLocaleString(),
			})

			/** @ param {String} param */
			const doSort = (param) => {
				if (sort.param === param) {
					if (!sort.isDescending) {
						sort.param = 'expiry'
					} else {
						sort.isDescending = !sort.isDescending
					}
				} else {
					sort.param = param
					sort.isDescending = true
				}
			}

			return {
				processes,
				wrapper,
				doSort,
			}
		},
	}
</script>

<style scoped lang="scss">
	:deep(.app-container .app) {
		height: 400px;
		width: 300px;
	}

	.process-list {
		> * {
			display: flex;
			flex-wrap: wrap;
		}

		&__head {
			flex: 1 0 auto;
			margin-bottom: 4px;

			.process-cell {
				display: block;
			}
		}

		.process-list__cta {
			background: none;
			border: none;
			color: #FFF;
			cursor: pointer;
			font: inherit;
			pointer-events: auto;
		}

		.process-cell {
			padding: 2px 1px;
			text-align: left;

			&:last-child {
				margin-left: auto;
				text-align: right;
			}
		}

		&__category {
			position: relative;
			width: 100%;

			&::before {
				background: #FFF;
				content: '';
				height: 2px;
				left: 0;
				position: absolute;
				top: 53%;
				width: 100%;
				z-index: 0;
			}
		}

		.category__name {
			background: #000;
			color: #FFF;
			display: inline-block;
			font-size: 14px;
			margin-left: 5px;
			padding: 0 4px;
			position: relative;
		}
	}
</style>
