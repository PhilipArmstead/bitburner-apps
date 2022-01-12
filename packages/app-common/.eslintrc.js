module.exports = {
	env: {
		es6: true,
	},
	extends: [
		'eslint:recommended'
	],
	overrides: [
		{
			files: ['**/*.js'],
			rules: {
				'indent': ['error', 'tab', { SwitchCase: 1 }],
			},
		},
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
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
