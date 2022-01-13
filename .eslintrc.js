module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/recommended',
	],
	overrides: [
		{
			files: ['**/*.js'],
			rules: {
				'indent': ['error', 'tab', { SwitchCase: 1 }],
			},
		},
		{
			files: [
				'**/*.vue',
			],
			env: {
				browser: true,
			},
			rules: {
				'vue/no-multiple-template-root': 'off',
				'no-unused-vars': 'warn',
				'vue/html-closing-bracket-newline': 'warn',
				'vue/max-attributes-per-line': [
					'error', {
						singleline: 3,
						multiline: 1,
					},
				],
				'vue/html-quotes': ['warn', 'single', { avoidEscape: true }],
				'vue/html-indent': [
					'warn', 'tab', {
						'attribute': 1,
						'baseIndent': 1,
						'closeBracket': 0,
						'alignAttributesVertically': true,
						'ignores': [],
					},
				],
				'vue/script-indent': [
					'warn', 'tab', {
						'baseIndent': 1,
						'switchCase': 0,
						'ignores': [],
					},
				],
			},
		},
	],
	rules: {
		'no-console': 'off',
		'no-debugger': 'error',
		'max-len': ['warn', { code: 130, tabWidth: 2 }],
		'array-bracket-spacing': 'off',
		'object-curly-spacing': ['error', 'always'],
		'semi': ['warn', 'never'],
		'space-before-function-paren': ['warn', 'always'],
		'no-tabs': ['off', { allowIndentationTabs: true }],
		'quotes': ['error', 'single'],
		'comma-dangle': [
			'error', {
				arrays: 'always-multiline',
				exports: 'always-multiline',
				functions: 'never',
				objects: 'always-multiline',
			},
		],
		'quote-props': ['error', 'consistent'],
		'no-var': 'error',
	},
}
