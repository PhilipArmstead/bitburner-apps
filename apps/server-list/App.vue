<template>
	<app-wrapper v-bind="{ ...$props, title: 'Server list' }">
		<div class='list'>
			<table class='list-table'>
				<thead>
					<tr class='list__head'>
						<td
							v-for='(header, index) in headers'
							:key='index'
							:title='header.title'
							class='cell'
							:class='[`cell--${header.className}`, {"cell--sorting": sortKey === header.sortKey, "cell--sorting-reverse": !sortAscending }]'
							@click='applySort(header.sortKey)'
						>
							<component :is='header.component' />
							{{ header.content }}
						</td>
					</tr>
				</thead>
				<tbody>
					<server-item v-for='server in servers' :key='server.hostname' :server='server' />
				</tbody>
			</table>
		</div>
	</app-wrapper>
</template>

<script>
	import { computed, onMounted, ref } from 'vue'
	import { AppWrapper } from '@bitburner-theme-browser/common-components'

	// import IconContract from './assets/icons/contract.svg'
	import IconDoor from './assets/icons/door.svg'
	import IconSkull from './assets/icons/skull.svg'
	import ServerItem from './src/components/ServerItem/ServerItem.vue'
	import { getItems } from './src/helpers/servers'

	export default {
		components: { AppWrapper, IconDoor, IconSkull, ServerItem },
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
			const sortKey = ref(null)
			const sortAscending = ref(true)
			const serverList = ref(getServers())
			const player = ref(window[`${id}-ns`]?.getPlayer())
			const playerPortsOwned = computed(() => 3) // TODO

			// In this, get icons, titles, statuses etc pre-generated
			const servers = computed(() =>
				getItems(window[`${id}-ns`], serverList.value, player.value?.hacking, playerPortsOwned)
				.sort((a, b) => {
					const valA = a[sortKey.value]
					const valB = b[sortKey.value]
					if (typeof valA === 'undefined' && typeof valB === 'undefined') {
						return 0
					} else {
						if (typeof valA === 'string') {
							return sortAscending.value ? valA.localeCompare(valB) : valB.localeCompare(valA)
						} else {
							return sortAscending.value ? valA - valB : valB - valA
						}
					}
				})
			)

			const refreshPlayer = () => {
				player.value = window[`${id}-ns`]?.getPlayer()
				serverList.value = getServers()
				setTimeout(refreshPlayer, 2000)
			}

			onMounted(refreshPlayer)

			function getServers () {
				// return {
				// 	"n00dles": {},
				// 	"foodnstuff": {},
				// 	"sigma-cosmetics": {
				// 		"connections": {
				// 			"max-hardware": {},
				// 			"CSEC": {
				// 				"connections": {
				// 					"neo-net": {
				// 						"connections": {
				// 							"netlink": {
				// 								"connections": {
				// 									"rothman-uni": {
				// 										"connections": {
				// 											"rho-construction": {
				// 												"connections": {
				// 													"snap-fitness": {
				// 														"connections": {
				// 															"deltaone": {
				// 																"connections": {
				// 																	"univ-energy": {},
				// 																	"zeus-med": {
				// 																		"connections": {
				// 																			"taiyang-digital": {
				// 																				"connections": {
				// 																					"titan-labs": {},
				// 																					"applied-energetics": {
				// 																						"connections": {
				// 																							"fulcrumtech": {}
				// 																						}
				// 																					}
				// 																				}
				// 																			}
				// 																		}
				// 																	}
				// 																}
				// 															}
				// 														}
				// 													}
				// 												}
				// 											}
				// 										}
				// 									}
				// 								}
				// 							}
				// 						}
				// 					},
				// 					"silver-helix": {
				// 						"connections": {
				// 							"johnson-ortho": {
				// 								"connections": {
				// 									"summit-uni": {
				// 										"connections": {
				// 											"aevum-police": {
				// 												"connections": {
				// 													"aerocorp": {}
				// 												}
				// 											}
				// 										}
				// 									}
				// 								}
				// 							},
				// 							"crush-fitness": {}
				// 						}
				// 					}
				// 				}
				// 			}
				// 		}
				// 	},
				// 	"joesguns": {
				// 		"connections": {
				// 			"zer0": {}
				// 		}
				// 	},
				// 	"hong-fang-tea": {},
				// 	"harakiri-sushi": {},
				// 	"iron-gym": {
				// 		"connections": {
				// 			"nectar-net": {
				// 				"connections": {
				// 					"phantasy": {
				// 						"connections": {
				// 							"comptek": {
				// 								"connections": {
				// 									"syscore": {},
				// 									"catalyst": {}
				// 								}
				// 							}
				// 						}
				// 					},
				// 					"omega-net": {
				// 						"connections": {
				// 							"the-hub": {
				// 								"connections": {
				// 									"zb-institute": {
				// 										"connections": {
				// 											"alpha-ent": {},
				// 											"millenium-fitness": {
				// 												"connections": {
				// 													"global-pharm": {}
				// 												}
				// 											}
				// 										}
				// 									}
				// 								}
				// 							},
				// 							"avmnite-02h": {
				// 								"connections": {
				// 									"I.I.I.I": {
				// 										"connections": {
				// 											"lexo-corp": {
				// 												"connections": {
				// 													"galactic-cyber": {
				// 														"connections": {
				// 															"omnia": {
				// 																"connections": {
				// 																	"defcomm": {},
				// 																	"icarus": {
				// 																		"connections": {
				// 																			"infocomm": {
				// 																				"connections": {
				// 																					"microdyne": {
				// 																						"connections": {
				// 																							"stormtech": {
				// 																								"connections": {
				// 																									"4sigma": {}
				// 																								}
				// 																							},
				// 																							"helios": {
				// 																								"connections": {
				// 																									"omnitek": {
				// 																										"connections": {
				// 																											"clarkinc": {
				// 																												"connections": {
				// 																													"megacorp": {},
				// 																													"The-Cave": {}
				// 																												}
				// 																											}
				// 																										}
				// 																									}
				// 																								}
				// 																							},
				// 																							"vitalife": {
				// 																								"connections": {
				// 																									"kuai-gong": {
				// 																										"connections": {
				// 																											"b-and-a": {},
				// 																											"blade": {
				// 																												"connections": {
				// 																													"ecorp": {}
				// 																												}
				// 																											},
				// 																											"nwo": {},
				// 																											"powerhouse-fitness": {
				// 																												"connections": {
				// 																													"fulcrumassets": {}
				// 																												}
				// 																											}
				// 																										}
				// 																									},
				// 																									".": {}
				// 																								}
				// 																							}
				// 																						}
				// 																					}
				// 																				}
				// 																			},
				// 																			"zb-def": {}
				// 																		}
				// 																	}
				// 																}
				// 															},
				// 															"unitalife": {
				// 																"connections": {
				// 																	"solaris": {
				// 																		"connections": {
				// 																			"nova-med": {
				// 																				"connections": {
				// 																					"run4theh111z": {}
				// 																				}
				// 																			}
				// 																		}
				// 																	}
				// 																}
				// 															}
				// 														}
				// 													}
				// 												}
				// 											}
				// 										}
				// 									}
				// 								}
				// 							}
				// 						}
				// 					}
				// 				}
				// 			}
				// 		}
				// 	},
				// 	"darkweb": {},
				// 	"myserver-512": {},
				// 	"myserver-1024": {},
				// 	"myserver-1024-0": {},
				// 	"myserver-2048": {}
				// }
				return window[`${id}-get-servers`](window[`${id}-ns`]).connections
			}

			const applySort = (key) => {
				if (sortKey.value === key) {
					sortAscending.value = !sortAscending.value
				} else {
					sortKey.value = key
					sortAscending.value = false
				}
			}

			const headers = [
				{ className: 'rooted', sortKey: 'sortHasRoot', title: 'Is server rooted?', component:  IconSkull },
				{ className: 'backdoored', sortKey: 'sortHasBackdoor', title: 'Is server backdoored?', component:  IconDoor },
				{ className: 'player-owned', sortKey: 'purchasedByPlayer', title: 'Is server player-owned?', component:  IconSkull },
				{ className: 'hostname', sortKey: 'hostname', content: 'Name' },
				{ className: 'required-hacking-skill', sortKey: 'requiredHackingSkill', content: 'Req. hack', title: 'Required hacking skill' },
				{ className: 'open-ports-required', sortKey: 'numOpenPortsRequired', content: 'Ports', title: 'Open ports required' },
				{ className: 'ram', sortKey: 'maxRam', content: 'RAM', title: 'RAM in-use/total' },
				{ className: 'security', sortKey: 'hackDifficulty', content: 'Security', title: 'Server security' },
				{ className: 'money', sortKey: 'moneyMax', content: 'Money', title: 'Money available/max' },
				{ className: 'growth', sortKey: 'serverGrowth', content: 'Growth', title: 'Growth' },
				// { className: 'time-to-hack', sortKey: 'serverGrowth', content: 'Time to hack', title: 'Time to hack' },
			]

			return { headers, servers, sortAscending, sortKey, applySort }
		},
	}
</script>

<style scoped lang="scss">
	@import '@bitburner-theme-browser/common-styles';

	:deep(.app-container .app) {
		height: 40vh;
		width: 60vw;
	}

	:deep(.app-container .app__content) {
		background: var(--backgroundprimary, $background-colour);
		scrollbar-width: auto;
	}

	.list {
		align-content: flex-start;
		box-sizing: border-box;
		color: #FFF;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		min-height: 100%;
		padding: 6px;

		&-table {
			border-collapse: collapse;
			border-spacing: 0;
			width: 100%;
		}

		&__head {
			.cell {
				border-bottom: 1px solid;
				padding-bottom: 6px;

				&--sorting {
					padding-right: 20px;
					position: relative;

					&::before {
						background: no-repeat 0 50%/100% auto url('../../packages/common/common-assets/icons/arrow.svg');
						content: '';
						height: 100%;
						position: absolute;
						right: 4px;
						top: 0;
						width: 12px;
					}
				}

				&:not(&--sorting-reverse)::before {
					transform: rotate(180deg);
				}
			}
		}

		.icon {
			width: 20px;
		}
	}

	:deep(.cell), .cell {
		padding-left: 6px;
		padding-right: 6px;
		white-space: nowrap;
	}
</style>
